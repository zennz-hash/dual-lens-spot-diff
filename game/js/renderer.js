// Dual-canvas synchronized renderer with offscreen plate caches, brass found markers,
// particle bursts, synced magnifying loupe, pulsing hint spotlight, and keyboard reticle.

export class DualRenderer {
  constructor(leftCanvas, rightCanvas) {
    this.leftCanvas = leftCanvas;
    this.rightCanvas = rightCanvas;
    this.leftCtx = leftCanvas.getContext('2d');
    this.rightCtx = rightCanvas.getContext('2d');
    this.width = leftCanvas.width;
    this.height = leftCanvas.height;

    // Offscreen plate buffers so complex painterly scenes render once per level
    this.origBuf = document.createElement('canvas');
    this.origBuf.width = this.width;
    this.origBuf.height = this.height;
    this.altBuf = document.createElement('canvas');
    this.altBuf.width = this.width;
    this.altBuf.height = this.height;

    this.particles = [];
    this.popups = [];
    this.missMarks = [];
  }

  bakeScene(scene) {
    const octx = this.origBuf.getContext('2d');
    const actx = this.altBuf.getContext('2d');
    octx.clearRect(0, 0, this.width, this.height);
    actx.clearRect(0, 0, this.width, this.height);
    scene.render(octx, false);
    scene.render(actx, true);
    this.particles.length = 0;
    this.popups.length = 0;
    this.missMarks.length = 0;
  }

  spawnFindEffect(x, y, points, streak, label) {
    for (let i = 0; i < 20; i++) {
      const a = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.25;
      const spd = 48 + Math.random() * 88;
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        life: 0.72 + Math.random() * 0.25,
        maxLife: 0.95,
        color: i % 3 === 0 ? '#9bf2c7' : '#ffd56b',
        size: 2.5 + Math.random() * 2.5,
      });
    }
    const streakTag = streak > 1 ? ` ×${streak}` : '';
    this.popups.push({
      x,
      y: y - 22,
      text: `+${points}${streakTag}`,
      sub: label,
      life: 1.35,
      maxLife: 1.35,
      color: '#ffe285',
    });
  }

  spawnMissEffect(x, y) {
    this.missMarks.push({ x, y, life: 0.65, maxLife: 0.65 });
    this.popups.push({
      x,
      y: y - 16,
      text: '−5s',
      sub: '',
      life: 0.8,
      maxLife: 0.8,
      color: '#ff8a80',
    });
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.94;
      p.vy *= 0.94;
    }
    for (let i = this.popups.length - 1; i >= 0; i--) {
      const pop = this.popups[i];
      pop.life -= dt;
      pop.y -= 24 * dt;
      if (pop.life <= 0) this.popups.splice(i, 1);
    }
    for (let i = this.missMarks.length - 1; i >= 0; i--) {
      this.missMarks[i].life -= dt;
      if (this.missMarks[i].life <= 0) this.missMarks.splice(i, 1);
    }
  }

  renderFrame(state, nowSec) {
    this.drawPanel(this.leftCtx, this.origBuf, state, nowSec);
    this.drawPanel(this.rightCtx, this.altBuf, state, nowSec);
  }

  drawPanel(ctx, sourceBuf, state, nowSec) {
    ctx.drawImage(sourceBuf, 0, 0);

    // 1. Draw subtle glowing brass compass rings on all found differences
    for (const found of state.foundRecords) {
      const age = Math.min(1, (nowSec - found.foundAt) / 0.35);
      const ease = 1 - Math.pow(1 - age, 3);
      const r = found.diff.r * (0.85 + 0.15 * ease);

      ctx.save();
      ctx.translate(found.diff.x, found.diff.y);

      // Outer warm glow
      ctx.strokeStyle = 'rgba(234, 185, 91, 0.38)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2 * ease);
      ctx.stroke();

      // Crisp emerald/brass double ring
      ctx.strokeStyle = '#ffe082';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ease);
      ctx.stroke();

      ctx.strokeStyle = '#44c78a';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, r - 5, 0, Math.PI * 2 * ease);
      ctx.stroke();

      // Numbered verification badge on top-right of ring
      if (ease > 0.5) {
        const bx = r * 0.72;
        const by = -r * 0.72;
        ctx.fillStyle = '#173829';
        ctx.strokeStyle = '#6ee7b7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bx, by, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ecfdf5';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(found.order), bx, by + 0.5);
      }
      ctx.restore();
    }

    // 2. Active Hint Radar Spotlight
    if (state.activeHint && nowSec < state.activeHint.until) {
      const d = state.activeHint.diff;
      const pulse = 0.5 + 0.5 * Math.sin(nowSec * 7.5);
      const r = d.r + 10 + pulse * 10;
      ctx.save();
      ctx.translate(d.x, d.y);

      const glow = ctx.createRadialGradient(0, 0, d.r * 0.4, 0, 0, r + 18);
      glow.addColorStop(0, 'rgba(89, 183, 230, 0.06)');
      glow.addColorStop(0.7, 'rgba(89, 183, 230, 0.34)');
      glow.addColorStop(1, 'rgba(89, 183, 230, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, r + 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 2.6;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // 3. Wrong-click X marks
    for (const m of this.missMarks) {
      const alpha = Math.max(0, m.life / m.maxLife);
      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-11, -11);
      ctx.lineTo(11, 11);
      ctx.moveTo(11, -11);
      ctx.lineTo(-11, 11);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Particles
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 5. Floating popups
    for (const pop of this.popups) {
      const alpha = Math.min(1, pop.life / 0.45);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(12, 10, 8, 0.85)';
      ctx.fillText(pop.text, pop.x + 1, pop.y + 1);
      ctx.fillStyle = pop.color;
      ctx.fillText(pop.text, pop.x, pop.y);
      if (pop.sub) {
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillStyle = '#f5eedf';
        ctx.fillText(pop.sub, pop.x, pop.y + 14);
      }
      ctx.restore();
    }

    // 6. Synchronized Brass Magnifying Loupe (2x zoom on BOTH panels simultaneously!)
    if (state.loupeActive && state.cursor.visible) {
      const lx = state.cursor.x;
      const ly = state.cursor.y;
      const radius = 56;
      const zoom = 2.0;

      ctx.save();
      ctx.beginPath();
      ctx.arc(lx, ly, radius, 0, Math.PI * 2);
      ctx.clip();
      const srcW = (radius * 2) / zoom;
      const srcH = (radius * 2) / zoom;
      ctx.drawImage(
        sourceBuf,
        lx - srcW / 2,
        ly - srcH / 2,
        srcW,
        srcH,
        lx - radius,
        ly - radius,
        radius * 2,
        radius * 2,
      );
      // Lens subtle glass sheen
      const sheen = ctx.createLinearGradient(lx - radius, ly - radius, lx + radius, ly + radius);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheen;
      ctx.fillRect(lx - radius, ly - radius, radius * 2, radius * 2);
      ctx.restore();

      // Brass rim + precision crosshair
      ctx.save();
      ctx.strokeStyle = '#eab95b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(lx, ly, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(234, 185, 91, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(lx - 10, ly);
      ctx.lineTo(lx + 10, ly);
      ctx.moveTo(lx, ly - 10);
      ctx.lineTo(lx, ly + 10);
      ctx.stroke();
      ctx.restore();
    } else if (state.cursor.visible) {
      // Subtle mirrored inspection reticle so both panels stay visually linked
      const cx = state.cursor.x;
      const cy = state.cursor.y;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 232, 168, 0.72)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx - 6, cy);
      ctx.moveTo(cx + 6, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.moveTo(cx, cy - 16);
      ctx.lineTo(cx, cy - 6);
      ctx.moveTo(cx, cy + 6);
      ctx.lineTo(cx, cy + 16);
      ctx.stroke();
      ctx.restore();
    }
  }
}
