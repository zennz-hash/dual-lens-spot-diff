// Plate I: The Clockmaker's Workshop (5 handcrafted fair differences).

export const clockmakerScene = {
  id: 'clockmaker',
  plateNum: 'Plate I',
  title: "The Clockmaker's Workshop",
  difficulty: 'APPRENTICE',
  timeLimit: 95,
  differences: [
    { id: 1, x: 118, y: 132, r: 34, label: 'Wall Clock Hands' },
    { id: 2, x: 292, y: 108, r: 34, label: 'Stained-Glass Medallion' },
    { id: 3, x: 474, y: 148, r: 34, label: 'Brass Cage Songbird' },
    { id: 4, x: 204, y: 318, r: 34, label: 'Teacup Steam & Spoon' },
    { id: 5, x: 422, y: 356, r: 38, label: 'Workshop Cat Collar' },
  ],

  render(ctx, altered) {
    const W = 580;
    const H = 460;

    // Warm paneled wall gradient
    const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
    wallGrad.addColorStop(0, '#3a291c');
    wallGrad.addColorStop(0.58, '#4e3724');
    wallGrad.addColorStop(1, '#261a12');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle vertical wainscoting planks
    ctx.strokeStyle = 'rgba(20, 12, 6, 0.28)';
    ctx.lineWidth = 1.5;
    for (let x = 28; x < W; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 310);
      ctx.stroke();
    }

    // Center arched twilight window
    ctx.save();
    ctx.beginPath();
    ctx.arc(292, 138, 76, Math.PI, 0);
    ctx.lineTo(368, 255);
    ctx.lineTo(216, 255);
    ctx.closePath();
    const skyGrad = ctx.createLinearGradient(292, 62, 292, 255);
    skyGrad.addColorStop(0, '#182b47');
    skyGrad.addColorStop(0.6, '#395a7e');
    skyGrad.addColorStop(1, '#d9985a');
    ctx.fillStyle = skyGrad;
    ctx.fill();
    ctx.clip();

    // Distant rooftops outside window
    ctx.fillStyle = '#1b2436';
    ctx.beginPath();
    ctx.moveTo(210, 255);
    ctx.lineTo(210, 212);
    ctx.lineTo(242, 194);
    ctx.lineTo(268, 212);
    ctx.lineTo(290, 200);
    ctx.lineTo(322, 185);
    ctx.lineTo(346, 208);
    ctx.lineTo(375, 202);
    ctx.lineTo(375, 255);
    ctx.closePath();
    ctx.fill();

    // Stars in window sky
    ctx.fillStyle = '#fff3cf';
    for (const [sx, sy] of [[248, 132], [332, 126], [268, 152], [318, 148]]) {
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // DIFF 2: Stained-glass arch medallion color (amber gold vs cobalt teal)
    ctx.beginPath();
    ctx.arc(292, 108, 24, 0, Math.PI * 2);
    ctx.fillStyle = altered ? '#2ca6b8' : '#e6a532';
    ctx.fill();
    ctx.strokeStyle = '#24180f';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(292, 108, 12, 0, Math.PI * 2);
    ctx.fillStyle = altered ? '#9bf0f5' : '#ffe394';
    ctx.fill();

    // Window mullions
    ctx.strokeStyle = '#2a1c12';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(292, 132);
    ctx.lineTo(292, 255);
    ctx.moveTo(216, 178);
    ctx.lineTo(368, 178);
    ctx.stroke();
    ctx.restore();

    // Window arch trim
    ctx.strokeStyle = '#8b6539';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(292, 138, 76, Math.PI, 0);
    ctx.lineTo(368, 255);
    ctx.lineTo(216, 255);
    ctx.closePath();
    ctx.stroke();

    // Sunlight beam cast across workshop
    const beam = ctx.createLinearGradient(292, 140, 292, 380);
    beam.addColorStop(0, 'rgba(255, 212, 135, 0.14)');
    beam.addColorStop(1, 'rgba(255, 212, 135, 0.0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(222, 255);
    ctx.lineTo(362, 255);
    ctx.lineTo(430, 390);
    ctx.lineTo(150, 390);
    ctx.closePath();
    ctx.fill();

    // Left Grand Regulator Wall Clock
    ctx.fillStyle = '#2a1a10';
    ctx.strokeStyle = '#a57c42';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(78, 86, 80, 178, 10);
    ctx.fill();
    ctx.stroke();

    // Pendulum window inside clock body
    ctx.fillStyle = '#170f09';
    ctx.fillRect(94, 176, 48, 74);
    ctx.strokeStyle = '#d4a650';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(118, 176);
    ctx.lineTo(114, 232);
    ctx.stroke();
    ctx.fillStyle = '#eab95b';
    ctx.beginPath();
    ctx.arc(114, 234, 11, 0, Math.PI * 2);
    ctx.fill();

    // Clock dial
    ctx.fillStyle = '#f6ecd6';
    ctx.beginPath();
    ctx.arc(118, 132, 31, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a246';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#2a1c12';
    for (let h = 0; h < 12; h++) {
      const a = (h * Math.PI) / 6;
      ctx.beginPath();
      ctx.arc(118 + Math.cos(a) * 24, 132 + Math.sin(a) * 24, h % 3 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // DIFF 1: Clock hand angles (10:10 vs 04:40)
    ctx.strokeStyle = '#1b120b';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(118, 132);
    if (altered) {
      ctx.lineTo(132, 142);
    } else {
      ctx.lineTo(104, 122);
    }
    ctx.stroke();
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(118, 132);
    if (altered) {
      ctx.lineTo(100, 144);
    } else {
      ctx.lineTo(136, 120);
    }
    ctx.stroke();
    ctx.fillStyle = '#b9382c';
    ctx.beginPath();
    ctx.arc(118, 132, 3, 0, Math.PI * 2);
    ctx.fill();

    // Hanging Brass Birdcage on Right
    ctx.strokeStyle = '#cfa04e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(474, 0);
    ctx.lineTo(474, 94);
    ctx.stroke();

    // Cage dome & base
    ctx.fillStyle = 'rgba(20, 16, 12, 0.35)';
    ctx.beginPath();
    ctx.arc(474, 134, 34, Math.PI, 0);
    ctx.lineTo(508, 186);
    ctx.lineTo(440, 186);
    ctx.closePath();
    ctx.fill();

    // Cage perch
    ctx.strokeStyle = '#8b5e34';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(448, 164);
    ctx.lineTo(500, 164);
    ctx.stroke();

    // DIFF 3: Golden songbird perched inside cage vs empty perch
    if (!altered) {
      ctx.fillStyle = '#f2b830';
      ctx.beginPath();
      ctx.ellipse(474, 152, 12, 8, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(484, 145, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d95b2b';
      ctx.beginPath();
      ctx.moveTo(489, 144);
      ctx.lineTo(496, 147);
      ctx.lineTo(489, 149);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#14100c';
      ctx.beginPath();
      ctx.arc(485, 144, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cage vertical bars
    ctx.strokeStyle = '#d9ac56';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(474, 134, 34, Math.PI, 0);
    ctx.lineTo(508, 186);
    ctx.lineTo(440, 186);
    ctx.closePath();
    ctx.stroke();
    for (const bx of [452, 463, 474, 485, 496]) {
      ctx.beginPath();
      ctx.moveTo(bx, 108);
      ctx.lineTo(bx, 186);
      ctx.stroke();
    }
    ctx.fillStyle = '#9c7131';
    ctx.fillRect(436, 184, 76, 10);

    // Wall shelves with brass gears & tools
    ctx.fillStyle = '#634328';
    ctx.fillRect(388, 226, 158, 9);
    const drawGear = (gx, gy, gr, teeth, color) => {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.fillStyle = color;
      for (let i = 0; i < teeth; i++) {
        ctx.rotate((Math.PI * 2) / teeth);
        ctx.fillRect(-2.5, -gr - 4, 5, 6);
      }
      ctx.beginPath();
      ctx.arc(0, 0, gr, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a291c';
      ctx.beginPath();
      ctx.arc(0, 0, gr * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawGear(422, 208, 13, 8, '#c99744');
    drawGear(448, 214, 9, 7, '#a87b33');
    drawGear(512, 210, 11, 8, '#d4aa59');

    // Heavy Oak Workbench
    const deskGrad = ctx.createLinearGradient(0, 294, 0, H);
    deskGrad.addColorStop(0, '#7b5332');
    deskGrad.addColorStop(0.18, '#5a3b22');
    deskGrad.addColorStop(1, '#2a1b10');
    ctx.fillStyle = deskGrad;
    ctx.fillRect(0, 296, W, H - 296);
    ctx.fillStyle = '#91643c';
    ctx.fillRect(0, 292, W, 12);

    // Banker's Brass Desk Lamp (Left)
    ctx.fillStyle = '#b98b3e';
    ctx.beginPath();
    ctx.ellipse(84, 344, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a64f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(84, 340);
    ctx.quadraticCurveTo(64, 286, 108, 266);
    ctx.stroke();
    // Green glass shade
    ctx.fillStyle = '#2d8a64';
    ctx.beginPath();
    ctx.moveTo(88, 268);
    ctx.quadraticCurveTo(116, 248, 138, 276);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#e6bd6c';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Warm lamp pool
    const lampGlow = ctx.createRadialGradient(118, 326, 6, 118, 326, 90);
    lampGlow.addColorStop(0, 'rgba(255, 220, 130, 0.32)');
    lampGlow.addColorStop(1, 'rgba(255, 220, 130, 0)');
    ctx.fillStyle = lampGlow;
    ctx.beginPath();
    ctx.arc(118, 326, 90, 0, Math.PI * 2);
    ctx.fill();

    // Open blueprint & pocket watch in center of bench
    ctx.fillStyle = '#f2e5c9';
    ctx.save();
    ctx.translate(296, 366);
    ctx.rotate(-0.04);
    ctx.fillRect(-58, -32, 116, 68);
    ctx.strokeStyle = '#527394';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(-18, 0, 18, 0, Math.PI * 2);
    ctx.arc(22, -4, 12, 0, Math.PI * 2);
    ctx.moveTo(-48, 24);
    ctx.lineTo(44, 24);
    ctx.stroke();
    ctx.restore();

    // Open gold pocket watch
    ctx.fillStyle = '#e5b24c';
    ctx.beginPath();
    ctx.arc(276, 392, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbf6e8';
    ctx.beginPath();
    ctx.arc(276, 392, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#221810';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(276, 392);
    ctx.lineTo(276, 384);
    ctx.moveTo(276, 392);
    ctx.lineTo(283, 394);
    ctx.stroke();

    // Porcelain Teacup on Workbench
    ctx.fillStyle = '#e8dfd0';
    ctx.beginPath();
    ctx.ellipse(204, 340, 26, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f6efe2';
    ctx.beginPath();
    ctx.roundRect(188, 314, 32, 24, [2, 2, 12, 12]);
    ctx.fill();
    ctx.strokeStyle = '#3c6e8f';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(190, 323);
    ctx.lineTo(218, 323);
    ctx.stroke();
    // Handle
    ctx.strokeStyle = '#e8dfd0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(221, 325, 6, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    // DIFF 4: Curling tea steam + brass spoon vs no steam & no spoon
    if (!altered) {
      ctx.strokeStyle = 'rgba(255, 248, 232, 0.72)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(199, 308);
      ctx.bezierCurveTo(193, 296, 207, 290, 200, 276);
      ctx.moveTo(209, 308);
      ctx.bezierCurveTo(215, 296, 203, 288, 211, 275);
      ctx.stroke();
      // Silver spoon handle sticking out
      ctx.strokeStyle = '#d7dee6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(207, 314);
      ctx.lineTo(222, 300);
      ctx.stroke();
    }

    // Velvet Cushion & Sleeping Ginger Workshop Cat (Bottom Right)
    ctx.fillStyle = '#75232b';
    ctx.beginPath();
    ctx.ellipse(438, 396, 66, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a246';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cat body
    ctx.fillStyle = '#d9833b';
    ctx.beginPath();
    ctx.ellipse(446, 376, 36, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cat stripes
    ctx.strokeStyle = '#a8591f';
    ctx.lineWidth = 3;
    for (const sx of [438, 450, 462]) {
      ctx.beginPath();
      ctx.moveTo(sx, 356);
      ctx.lineTo(sx - 3, 372);
      ctx.stroke();
    }
    // Cat head
    ctx.fillStyle = '#e08e45';
    ctx.beginPath();
    ctx.arc(414, 358, 17, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.moveTo(401, 348);
    ctx.lineTo(404, 332);
    ctx.lineTo(414, 343);
    ctx.moveTo(416, 343);
    ctx.lineTo(426, 332);
    ctx.lineTo(429, 348);
    ctx.fill();
    // Closed peaceful eyes
    ctx.strokeStyle = '#2c180a';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(408, 358, 3.5, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(420, 358, 3.5, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // Cat tail
    ctx.strokeStyle = '#d9833b';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(478, 382);
    ctx.quadraticCurveTo(506, 384, 496, 362);
    ctx.stroke();

    // DIFF 5: Crimson ribbon collar + gold bell on cat vs no collar
    if (!altered) {
      ctx.strokeStyle = '#d62839';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.arc(416, 366, 13, 0.35, Math.PI - 0.35);
      ctx.stroke();
      ctx.fillStyle = '#ffd15c';
      ctx.beginPath();
      ctx.arc(416, 379, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8c6114';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Subtle warm frame vignette
    const vig = ctx.createRadialGradient(W / 2, H / 2, 160, W / 2, H / 2, 360);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(12, 8, 5, 0.32)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
  },
};
