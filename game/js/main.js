// Dual Lens — The Inspector's Folio
// Core game loop, level progression, hit detection, combo streaks, hints, and timer pressure.

import { SCENES } from './scenes/registry.js';
import { DualRenderer } from './renderer.js';
import { SoundEngine } from './audio.js';
import { HudController } from './hud.js';
import { InputController } from './input.js';

class DualLensGame {
  constructor() {
    this.leftCanvas = document.getElementById('canvas-left');
    this.rightCanvas = document.getElementById('canvas-right');
    this.renderer = new DualRenderer(this.leftCanvas, this.rightCanvas);
    this.sound = new SoundEngine();
    this.hud = new HudController();

    this.sceneIndex = 0;
    this.completedScenes = new Set();
    this.foundByScene = new Map();
    this.score = 0;
    this.streak = 0;
    this.lastTickSec = -1;
    this.lastFrameTime = performance.now();

    this.state = {
      mode: 'playing',
      scene: SCENES[0],
      foundIds: new Set(),
      foundRecords: [],
      timeLeft: SCENES[0].timeLimit,
      hintsLeft: 3,
      activeHint: null,
      loupeActive: false,
      score: 0,
      streak: 0,
      totalFoundAcrossFolio: 0,
      cursor: { x: 290, y: 230, visible: false },
    };

    this.input = new InputController(this.leftCanvas, this.rightCanvas, {
      onCursorMove: (x, y) => {
        this.state.cursor.x = x;
        this.state.cursor.y = y;
        this.state.cursor.visible = true;
      },
      onCursorLeave: () => {
        if (!this.state.loupeActive) this.state.cursor.visible = false;
      },
      onInspect: (x, y) => this.inspectAt(x, y),
      onKeyboardInspect: () => {
        if (this.state.mode === 'playing') {
          this.state.cursor.visible = true;
          this.inspectAt(this.state.cursor.x, this.state.cursor.y);
        }
      },
      onHint: () => this.triggerHint(),
      onToggleLoupe: () => {
        this.state.loupeActive = !this.state.loupeActive;
        if (this.state.loupeActive) this.state.cursor.visible = true;
        this.hud.sync(this.state);
      },
      onSetLoupe: (active) => {
        this.state.loupeActive = active;
        if (active) this.state.cursor.visible = true;
        this.hud.sync(this.state);
      },
      onTogglePause: () => this.togglePause(),
      onToggleMute: () => this.hud.setMuted(this.sound.toggleMute()),
    });

    this.bindHudButtons();
    this.loadScene(0);
    // Support quick numeric plate switching (1-5) for keyboard play
    window.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= String(SCENES.length)) {
        this.loadScene(Number(e.key) - 1);
      }
    });
    // Expose clean inspection API for automated testing & keyboard play
    window.__DUAL_LENS__ = this;
    requestAnimationFrame((t) => this.loop(t));
  }

  bindHudButtons() {
    document.getElementById('btn-hint')?.addEventListener('click', () => this.triggerHint());
    document.getElementById('btn-loupe')?.addEventListener('click', () => {
      this.state.loupeActive = !this.state.loupeActive;
      if (this.state.loupeActive) this.state.cursor.visible = true;
      this.hud.sync(this.state);
    });
    document.getElementById('btn-levels')?.addEventListener('click', () => this.openPlateSelector());
    document.getElementById('btn-sound')?.addEventListener('click', () => {
      this.hud.setMuted(this.sound.toggleMute());
    });
  }

  recomputeTotalFound() {
    let total = 0;
    for (const set of this.foundByScene.values()) total += set.size;
    this.state.totalFoundAcrossFolio = total;
  }

  loadScene(idx) {
    this.sceneIndex = idx;
    const scene = SCENES[idx];
    this.state.scene = scene;
    this.state.mode = 'playing';
    this.state.foundIds = new Set();
    this.state.foundRecords = [];
    this.state.timeLeft = scene.timeLimit;
    this.state.hintsLeft = 3;
    this.state.activeHint = null;
    this.state.streak = 0;
    this.lastTickSec = -1;

    this.renderer.bakeScene(scene);
    this.hud.hideOverlay();
    this.hud.setToast(`Find ${scene.differences.length} differences in ${scene.title}`, '');
    this.hud.sync(this.state);
  }

  inspectAt(x, y) {
    if (this.state.mode !== 'playing') return;
    const nowSec = performance.now() / 1000;
    const scene = this.state.scene;

    // Check unfound differences within generous fair hit radius
    let hit = null;
    let bestDist = Infinity;
    for (const diff of scene.differences) {
      if (this.state.foundIds.has(diff.id)) continue;
      const d = Math.hypot(x - diff.x, y - diff.y);
      if (d <= diff.r + 6 && d < bestDist) {
        bestDist = d;
        hit = diff;
      }
    }

    if (hit) {
      this.state.foundIds.add(hit.id);
      if (!this.foundByScene.has(scene.id)) this.foundByScene.set(scene.id, new Set());
      this.foundByScene.get(scene.id).add(hit.id);
      this.recomputeTotalFound();

      this.streak += 1;
      this.state.streak = this.streak;
      const points = 100 * Math.min(4, this.streak);
      this.score += points;
      this.state.score = this.score;

      // Clear hint if the hinted difference was found
      if (this.state.activeHint && this.state.activeHint.diff.id === hit.id) {
        this.state.activeHint = null;
      }
      // Bonus hint recharge on a 3-find streak
      if (this.streak % 3 === 0 && this.state.hintsLeft < 3) {
        this.state.hintsLeft += 1;
      }

      this.state.foundRecords.push({
        diff: hit,
        order: this.state.foundIds.size,
        foundAt: nowSec,
      });

      this.renderer.spawnFindEffect(hit.x, hit.y, points, this.streak, hit.label);
      this.sound.playFound(this.streak);
      const rem = scene.differences.length - this.state.foundIds.size;
      this.hud.setToast(`Found: ${hit.label}! (${rem} left)`, 'good');
      this.hud.sync(this.state);

      if (rem === 0) {
        this.onPlateCleared();
      }
    } else {
      // Ignore accidental clicks inside an already-found marker
      for (const diff of scene.differences) {
        if (this.state.foundIds.has(diff.id) && Math.hypot(x - diff.x, y - diff.y) <= diff.r) {
          return;
        }
      }
      this.streak = 0;
      this.state.streak = 0;
      this.state.timeLeft = Math.max(0, this.state.timeLeft - 5);
      this.renderer.spawnMissEffect(x, y);
      this.sound.playMiss();
      this.hud.setToast('No difference there (−5s)', 'miss');
      this.hud.sync(this.state);
    }
  }

  triggerHint() {
    if (this.state.mode !== 'playing' || this.state.hintsLeft <= 0) return;
    const unfound = this.state.scene.differences.filter((d) => !this.state.foundIds.has(d.id));
    if (unfound.length === 0) return;
    const target = unfound[0];
    this.state.hintsLeft -= 1;
    this.state.activeHint = { diff: target, until: performance.now() / 1000 + 6.0 };
    this.sound.playHint();
    this.hud.setToast(`Hint spotlight: inspect near ${target.label}`, '');
    this.hud.sync(this.state);
  }

  onPlateCleared() {
    this.state.mode = 'cleared';
    const scene = this.state.scene;
    this.completedScenes.add(scene.id);
    const timeBonus = Math.round(this.state.timeLeft * 10);
    this.score += timeBonus;
    this.state.score = this.score;
    this.sound.playPlateComplete();
    this.hud.sync(this.state);

    const hasNext = this.sceneIndex + 1 < SCENES.length;
    setTimeout(() => {
      if (this.state.mode !== 'cleared') return;
      this.hud.showPlateCleared(
        scene,
        timeBonus,
        this.score,
        hasNext,
        () => this.loadScene(hasNext ? this.sceneIndex + 1 : 0),
        () => this.loadScene(this.sceneIndex),
      );
    }, 650);
  }

  openPlateSelector() {
    if (this.state.mode === 'playing') this.state.mode = 'paused';
    this.hud.showPlateSelector(
      this.sceneIndex,
      this.completedScenes,
      (idx) => this.loadScene(idx),
      () => {
        this.state.mode = 'playing';
        this.hud.hideOverlay();
      },
    );
  }

  togglePause() {
    if (this.state.mode === 'playing') {
      this.state.mode = 'paused';
      this.hud.showPaused(() => this.togglePause());
    } else if (this.state.mode === 'paused') {
      this.state.mode = 'playing';
      this.hud.hideOverlay();
    }
  }

  loop(nowMs) {
    const dt = Math.min(0.1, (nowMs - this.lastFrameTime) / 1000);
    this.lastFrameTime = nowMs;
    const nowSec = nowMs / 1000;

    if (this.state.mode === 'playing') {
      this.input.updateKeyboardCursor(dt, this.state.cursor, this.leftCanvas.width, this.leftCanvas.height);
      this.state.timeLeft = Math.max(0, this.state.timeLeft - dt);

      const wholeSec = Math.ceil(this.state.timeLeft);
      if (wholeSec <= 15 && wholeSec > 0 && wholeSec !== this.lastTickSec) {
        this.lastTickSec = wholeSec;
        this.sound.playTick();
      }
      if (this.state.timeLeft <= 0) {
        this.state.mode = 'timeUp';
        this.hud.showTimeUp(
          this.state.scene,
          this.state.foundIds.size,
          this.state.scene.differences.length,
          () => this.loadScene(this.sceneIndex),
        );
      }
      this.hud.sync(this.state);
    }

    this.renderer.update(dt);
    this.renderer.renderFrame(this.state, nowSec);
    requestAnimationFrame((t) => this.loop(t));
  }
}

new DualLensGame();
