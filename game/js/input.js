// Unified Mouse + Keyboard controller for synchronized dual-panel inspection.

export class InputController {
  constructor(leftCanvas, rightCanvas, callbacks) {
    this.leftCanvas = leftCanvas;
    this.rightCanvas = rightCanvas;
    this.cb = callbacks;
    this.keys = new Set();
    this.shiftLoupe = false;

    this.bindCanvas(leftCanvas);
    this.bindCanvas(rightCanvas);
    this.bindKeyboard();
  }

  canvasCoords(canvas, clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return {
      x: Math.max(0, Math.min(canvas.width, x)),
      y: Math.max(0, Math.min(canvas.height, y)),
    };
  }

  bindCanvas(canvas) {
    canvas.addEventListener('mousemove', (e) => {
      const pt = this.canvasCoords(canvas, e.clientX, e.clientY);
      this.cb.onCursorMove(pt.x, pt.y);
    });
    canvas.addEventListener('mouseleave', () => {
      this.cb.onCursorLeave();
    });
    canvas.addEventListener('click', (e) => {
      const pt = this.canvasCoords(canvas, e.clientX, e.clientY);
      this.cb.onInspect(pt.x, pt.y);
    });
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) {
        e.preventDefault();
      }
      this.keys.add(k);

      if (k === 'shift' && !this.shiftLoupe) {
        this.shiftLoupe = true;
        this.cb.onSetLoupe(true);
      } else if (k === 'l') {
        this.cb.onToggleLoupe();
      } else if (k === 'h') {
        this.cb.onHint();
      } else if (k === 'p' || k === 'escape') {
        this.cb.onTogglePause();
      } else if (k === 'm') {
        this.cb.onToggleMute();
      } else if (k === ' ' || k === 'enter') {
        this.cb.onKeyboardInspect();
      }
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      this.keys.delete(k);
      if (k === 'shift' && this.shiftLoupe) {
        this.shiftLoupe = false;
        this.cb.onSetLoupe(false);
      }
    });
  }

  updateKeyboardCursor(dt, cursor, width, height) {
    let dx = 0;
    let dy = 0;
    if (this.keys.has('arrowleft') || this.keys.has('a')) dx -= 1;
    if (this.keys.has('arrowright') || this.keys.has('d')) dx += 1;
    if (this.keys.has('arrowup') || this.keys.has('w')) dy -= 1;
    if (this.keys.has('arrowdown') || this.keys.has('s')) dy += 1;
    if (dx === 0 && dy === 0) return;

    const len = Math.hypot(dx, dy);
    const speed = 280;
    cursor.x = Math.max(8, Math.min(width - 8, cursor.x + (dx / len) * speed * dt));
    cursor.y = Math.max(8, Math.min(height - 8, cursor.y + (dy / len) * speed * dt));
    cursor.visible = true;
  }
}
