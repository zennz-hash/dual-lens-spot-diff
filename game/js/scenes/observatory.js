// Plate IV: Observatory of Brass & Stars (8 handcrafted fair differences).

export const observatoryScene = {
  id: 'observatory',
  plateNum: 'Plate IV',
  title: 'Observatory of Brass & Stars',
  difficulty: 'ASTRONOMER',
  timeLimit: 90,
  differences: [
    { id: 1, x: 146, y: 84, r: 34, label: 'Skylight Comet Trail' },
    { id: 2, x: 342, y: 92, r: 34, label: 'Ringed Planet Tilt' },
    { id: 3, x: 266, y: 214, r: 36, label: 'Telescope Finder Scope' },
    { id: 4, x: 78, y: 248, r: 32, label: 'Shelf Folio Color' },
    { id: 5, x: 472, y: 204, r: 34, label: 'Armillary Sphere Core' },
    { id: 6, x: 142, y: 372, r: 34, label: 'Celestial Globe Ring' },
    { id: 7, x: 332, y: 382, r: 34, label: 'Star Chart Feather Quill' },
    { id: 8, x: 486, y: 366, r: 34, label: 'Brass Hourglass Sand' },
  ],

  render(ctx, altered) {
    const W = 580;
    const H = 460;

    // Deep nocturnal observatory dome wall
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#131826');
    bg.addColorStop(0.65, '#242938');
    bg.addColorStop(1, '#181410');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Open Observatory Dome Slit revealing cosmos
    ctx.save();
    ctx.beginPath();
    ctx.arc(285, 210, 178, Math.PI * 1.08, Math.PI * 1.92);
    ctx.lineTo(440, 260);
    ctx.lineTo(130, 260);
    ctx.closePath();
    const cosmo = ctx.createLinearGradient(285, 30, 285, 250);
    cosmo.addColorStop(0, '#070b1a');
    cosmo.addColorStop(0.6, '#14224a');
    cosmo.addColorStop(1, '#263a68');
    ctx.fillStyle = cosmo;
    ctx.fill();
    ctx.clip();

    // Starfield
    ctx.fillStyle = '#fff5d6';
    for (const [sx, sy, sr] of [
      [152, 118, 1.5], [198, 76, 1.8], [244, 108, 1.3], [292, 64, 2.0],
      [388, 128, 1.6], [412, 86, 1.4], [218, 142, 1.5], [312, 134, 1.2],
    ]) {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // DIFF 1: Glowing comet streaking across upper-left skylight vs absent
    if (!altered) {
      const cometGrad = ctx.createLinearGradient(168, 72, 116, 102);
      cometGrad.addColorStop(0, 'rgba(180, 240, 255, 0.95)');
      cometGrad.addColorStop(1, 'rgba(180, 240, 255, 0)');
      ctx.strokeStyle = cometGrad;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(168, 72);
      ctx.lineTo(118, 98);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(168, 72, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // DIFF 2: Ringed planet tilt (+0.45 rad vs -0.45 rad)
    ctx.save();
    ctx.translate(342, 92);
    ctx.fillStyle = '#e0a96d';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate(altered ? -0.48 : 0.48);
    ctx.strokeStyle = '#f5dfb8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // Brass dome arch ribs
    ctx.strokeStyle = '#9c7840';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(285, 210, 178, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();

    // Left Bookcase
    ctx.fillStyle = '#3d281a';
    ctx.fillRect(24, 152, 86, 176);
    ctx.fillStyle = '#5c3c26';
    for (const sy of [198, 246, 294]) ctx.fillRect(28, sy, 78, 6);
    // Books on middle shelf (DIFF 4: crimson volume vs bright cyan volume)
    const bookColors = ['#8c3b32', '#2d5a4c', '#b38435', altered ? '#38bdf8' : '#d62839', '#5a436e'];
    for (let i = 0; i < bookColors.length; i++) {
      ctx.fillStyle = bookColors[i];
      ctx.fillRect(34 + i * 13, 212 + (i % 2) * 4, 11, 34 - (i % 2) * 4);
    }

    // Hanging Brass Armillary Sphere (Right)
    ctx.strokeStyle = '#c99a49';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(472, 120);
    ctx.lineTo(472, 168);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(472, 204, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(472, 204, 34, 12, 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(472, 204, 14, 34, -0.3, 0, Math.PI * 2);
    ctx.stroke();
    // DIFF 5: Center orb of armillary sphere (bright crimson sun vs ice-blue orb)
    ctx.fillStyle = altered ? '#67e8f9' : '#e64938';
    ctx.beginPath();
    ctx.arc(472, 204, 9, 0, Math.PI * 2);
    ctx.fill();

    // Great Brass Refractor Telescope (Center)
    ctx.strokeStyle = '#6e4e2a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(278, 266);
    ctx.lineTo(234, 340);
    ctx.moveTo(278, 266);
    ctx.lineTo(324, 340);
    ctx.stroke();

    ctx.save();
    ctx.translate(278, 240);
    ctx.rotate(-0.48);
    const brass = ctx.createLinearGradient(0, -16, 0, 16);
    brass.addColorStop(0, '#f5d27a');
    brass.addColorStop(0.5, '#c28f37');
    brass.addColorStop(1, '#7a541a');
    ctx.fillStyle = brass;
    ctx.fillRect(-84, -14, 168, 28);
    // Objective lens collar
    ctx.fillStyle = '#e5bc62';
    ctx.fillRect(74, -18, 18, 36);
    ctx.fillStyle = '#6ec6f0';
    ctx.fillRect(92, -13, 5, 26);

    // DIFF 3: Small brass finder scope mounted on top of main tube vs absent
    if (!altered) {
      ctx.fillStyle = '#f2cb72';
      ctx.fillRect(-24, -29, 58, 9);
      ctx.fillStyle = '#8c6122';
      ctx.fillRect(-10, -21, 5, 8);
      ctx.fillRect(16, -21, 5, 8);
    }
    ctx.restore();

    // Astronomer's Work Table Foreground
    ctx.fillStyle = '#332318';
    ctx.fillRect(0, 342, W, H - 342);
    ctx.fillStyle = '#523826';
    ctx.fillRect(0, 336, W, 10);

    // Desk Celestial Globe (Bottom Left)
    ctx.fillStyle = '#9c7338';
    ctx.fillRect(128, 412, 28, 8);
    ctx.fillRect(139, 396, 6, 18);
    ctx.fillStyle = '#2c4c70';
    ctx.beginPath();
    ctx.arc(142, 372, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#eab95b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(142, 372, 29, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    // DIFF 6: Equatorial brass band around globe vs absent
    if (!altered) {
      ctx.strokeStyle = '#f5d07a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(142, 372, 25, 7, -0.25, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Parchment Star Chart (Bottom Center)
    ctx.fillStyle = '#efe1c2';
    ctx.fillRect(236, 358, 146, 72);
    ctx.strokeStyle = '#3d5270';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(286, 394, 24, 0, Math.PI * 2);
    ctx.moveTo(262, 394);
    ctx.lineTo(310, 394);
    ctx.moveTo(286, 370);
    ctx.lineTo(286, 418);
    ctx.stroke();
    // Inkwell
    ctx.fillStyle = '#1d222b';
    ctx.fillRect(344, 392, 16, 18);
    // DIFF 7: White feather quill in inkwell vs missing quill
    if (!altered) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(352, 394);
      ctx.quadraticCurveTo(334, 368, 322, 354);
      ctx.stroke();
      ctx.fillStyle = '#f8f2e4';
      ctx.beginPath();
      ctx.ellipse(330, 365, 13, 5, 0.75, 0, Math.PI * 2);
      ctx.fill();
    }

    // Brass Hourglass (Bottom Right)
    ctx.fillStyle = '#c9973e';
    ctx.fillRect(466, 336, 40, 7);
    ctx.fillRect(466, 404, 40, 7);
    ctx.strokeStyle = '#c9973e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(471, 343);
    ctx.lineTo(471, 404);
    ctx.moveTo(501, 343);
    ctx.lineTo(501, 404);
    ctx.stroke();
    // Glass bulbs
    ctx.fillStyle = 'rgba(200, 232, 255, 0.25)';
    ctx.beginPath();
    ctx.moveTo(474, 343);
    ctx.lineTo(498, 343);
    ctx.lineTo(486, 373);
    ctx.closePath();
    ctx.moveTo(486, 373);
    ctx.lineTo(498, 404);
    ctx.lineTo(474, 404);
    ctx.closePath();
    ctx.fill();
    // DIFF 8: Golden sand mostly in bottom bulb vs mostly in top bulb
    ctx.fillStyle = '#f4c453';
    ctx.beginPath();
    if (altered) {
      ctx.moveTo(476, 347);
      ctx.lineTo(496, 347);
      ctx.lineTo(486, 372);
    } else {
      ctx.moveTo(486, 382);
      ctx.lineTo(496, 403);
      ctx.lineTo(476, 403);
    }
    ctx.closePath();
    ctx.fill();
  },
};
