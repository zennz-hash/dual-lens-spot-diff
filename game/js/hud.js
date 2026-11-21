// HUD and modal overlay controller for Dual Lens.

import { SCENES, TOTAL_FOLIO_DIFFERENCES } from './scenes/registry.js';

export class HudController {
  constructor() {
    this.elSubtitle = document.getElementById('scene-subtitle');
    this.elRemaining = document.getElementById('remaining-count');
    this.elFraction = document.getElementById('found-fraction');
    this.elPips = document.getElementById('diff-pips');
    this.elScore = document.getElementById('score-value');
    this.elStreak = document.getElementById('streak-badge');
    this.elTimer = document.getElementById('timer-value');
    this.elTimerPill = document.getElementById('timer-pill');
    this.elTimerFill = document.getElementById('timer-fill');
    this.elDifficulty = document.getElementById('difficulty-badge');
    this.elHintBtn = document.getElementById('btn-hint');
    this.elHintCharges = document.getElementById('hint-charges');
    this.elLoupeBtn = document.getElementById('btn-loupe');
    this.elSoundBtn = document.getElementById('btn-sound');
    this.elStage = document.getElementById('stage-frame');
    this.elToast = document.getElementById('status-toast');
    this.elTotalProgress = document.getElementById('total-progress');
    this.elOverlay = document.getElementById('overlay');
    this.elOverlayCard = document.getElementById('overlay-card');
  }

  formatTime(sec) {
    const s = Math.max(0, Math.ceil(sec));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  }

  renderPips(total, foundCount) {
    this.elPips.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = i < foundCount ? 'diff-pip found' : 'diff-pip';
      this.elPips.appendChild(dot);
    }
  }

  sync(state) {
    const scene = state.scene;
    const total = scene.differences.length;
    const found = state.foundIds.size;
    const remaining = total - found;

    this.elSubtitle.textContent = `${scene.plateNum} · ${scene.title}`;
    this.elRemaining.textContent = String(remaining);
    this.elFraction.textContent = `${found} / ${total} FOUND`;
    this.elScore.textContent = String(state.score);
    this.elStreak.textContent = `×${Math.max(1, state.streak)} STREAK`;
    this.elDifficulty.textContent = scene.difficulty;
    this.elTimer.textContent = this.formatTime(state.timeLeft);
    this.elHintCharges.textContent = String(state.hintsLeft);
    this.elHintBtn.disabled = state.hintsLeft <= 0 || remaining === 0 || state.mode !== 'playing';
    this.elLoupeBtn.classList.toggle('active', state.loupeActive);

    const ratio = Math.max(0, Math.min(1, state.timeLeft / scene.timeLimit));
    this.elTimerFill.style.width = `${(ratio * 100).toFixed(1)}%`;

    const urgent = state.mode === 'playing' && state.timeLeft <= 15;
    this.elTimerPill.classList.toggle('urgent', urgent);
    this.elStage.classList.toggle('urgent-frame', urgent);

    if (this.elPips.childElementCount !== total) {
      this.renderPips(total, found);
    } else {
      Array.from(this.elPips.children).forEach((dot, idx) => {
        dot.classList.toggle('found', idx < found);
      });
    }

    this.elTotalProgress.textContent = `Folio: ${state.totalFoundAcrossFolio} / ${TOTAL_FOLIO_DIFFERENCES} Found`;
  }

  setToast(msg, tone = '') {
    this.elToast.textContent = msg;
    this.elToast.className = `status-toast ${tone}`.trim();
  }

  setMuted(muted) {
    this.elSoundBtn.textContent = muted ? '✕' : '♪';
  }

  hideOverlay() {
    this.elOverlay.classList.add('hidden');
  }

  showPlateSelector(currentIdx, completedSet, onSelect, onClose) {
    const rows = SCENES.map((s, idx) => {
      const done = completedSet.has(s.id) ? '✓ CLEARED' : `${s.differences.length} Diffs`;
      const cls = idx === currentIdx ? 'plate-option current' : 'plate-option';
      return `<button class="${cls}" data-idx="${idx}">
        <span><strong>${s.plateNum}:</strong> ${s.title}</span>
        <span>${s.difficulty} · ${done}</span>
      </button>`;
    }).join('');

    this.elOverlayCard.innerHTML = `
      <h2>INSPECTOR'S FOLIO</h2>
      <p>Select any illustrated plate. Each plate raises the difficulty and number of hidden differences.</p>
      <div class="plate-grid">${rows}</div>
      <div class="overlay-actions">
        <button id="ov-close" class="action-btn">Resume Hunt</button>
      </div>
    `;
    this.elOverlay.classList.remove('hidden');
    this.elOverlayCard.querySelectorAll('[data-idx]').forEach((btn) => {
      btn.addEventListener('click', () => onSelect(Number(btn.dataset.idx)));
    });
    document.getElementById('ov-close')?.addEventListener('click', onClose);
  }

  showPlateCleared(scene, timeBonus, totalScore, hasNext, onNext, onReplay) {
    this.elOverlayCard.innerHTML = `
      <h2>${scene.plateNum} VERIFIED</h2>
      <p>Every difference in <strong>${scene.title}</strong> has been catalogued.<br />
      Time Bonus: <strong>+${timeBonus}</strong> · Folio Score: <strong>${totalScore}</strong></p>
      <div class="overlay-actions">
        ${hasNext ? '<button id="ov-next" class="primary-btn">Next Plate →</button>' : '<button id="ov-next" class="primary-btn">Play Again</button>'}
        <button id="ov-replay" class="action-btn">Replay Plate</button>
      </div>
    `;
    this.elOverlay.classList.remove('hidden');
    document.getElementById('ov-next')?.addEventListener('click', onNext);
    document.getElementById('ov-replay')?.addEventListener('click', onReplay);
  }

  showTimeUp(scene, found, total, onRetry) {
    this.elOverlayCard.innerHTML = `
      <h2>TIME EXPIRED</h2>
      <p>You catalogued <strong>${found} of ${total}</strong> differences in <strong>${scene.title}</strong> before the lantern went out.</p>
      <div class="overlay-actions">
        <button id="ov-retry" class="primary-btn">Retry Plate</button>
      </div>
    `;
    this.elOverlay.classList.remove('hidden');
    document.getElementById('ov-retry')?.addEventListener('click', onRetry);
  }

  showPaused(onResume) {
    this.elOverlayCard.innerHTML = `
      <h2>INSPECTION PAUSED</h2>
      <p>Take a breath. Press <strong>P</strong> or click below to resume your timed hunt.</p>
      <div class="overlay-actions">
        <button id="ov-resume" class="primary-btn">Resume</button>
      </div>
    `;
    this.elOverlay.classList.remove('hidden');
    document.getElementById('ov-resume')?.addEventListener('click', onResume);
  }
}
