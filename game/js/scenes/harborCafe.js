// Plate II: Midnight Harbor Café (6 handcrafted fair differences).

export const harborCafeScene = {
  id: 'harborCafe',
  plateNum: 'Plate II',
  title: 'Midnight Harbor Café',
  difficulty: 'DETECTIVE',
  timeLimit: 90,
  differences: [
    { id: 1, x: 102, y: 78, r: 34, label: 'Harbor Crescent Moon' },
    { id: 2, x: 332, y: 112, r: 34, label: 'Lighthouse Lantern Dome' },
    { id: 3, x: 214, y: 184, r: 34, label: 'Sailboat Mast Pennant' },
    { id: 4, x: 472, y: 162, r: 34, label: 'Terrace Hanging Lantern' },
    { id: 5, x: 152, y: 342, r: 34, label: 'Espresso Sugar Cubes' },
    { id: 6, x: 454, y: 346, r: 36, label: 'Chalkboard Menu Price' },
  ],

  render(ctx, altered) {
    const W = 580;
    const H = 460;

    // Night sky over harbor
    const sky = ctx.createLinearGradient(0, 0, 0, 240);
    sky.addColorStop(0, '#0c172b');
    sky.addColorStop(0.6, '#1c3557');
    sky.addColorStop(1, '#395c7a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, 240);

    // Stars
    ctx.fillStyle = '#fff5d4';
    for (const [sx, sy, sr] of [
      [48, 42, 1.5], [164, 54, 1.8], [238, 38, 1.4], [292, 62, 1.6],
      [412, 44, 1.5], [520, 56, 1.7], [186, 94, 1.2], [386, 84, 1.4],
    ]) {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // DIFF 1: Crescent moon orientation + companion bright star
    ctx.save();
    ctx.translate(102, 78);
    ctx.fillStyle = '#ffe599';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#12223d';
    ctx.beginPath();
    ctx.arc(altered ? -9 : 9, -3, 18, 0, Math.PI * 2);
    ctx.fill();
    if (!altered) {
      ctx.fillStyle = '#fff9de';
      ctx.beginPath();
      ctx.arc(22, -10, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Distant headland & lighthouse
    ctx.fillStyle = '#142236';
    ctx.beginPath();
    ctx.moveTo(260, 232);
    ctx.quadraticCurveTo(335, 198, 420, 232);
    ctx.closePath();
    ctx.fill();

    // Lighthouse beam
    const beamGrad = ctx.createLinearGradient(332, 118, 140, 150);
    beamGrad.addColorStop(0, 'rgba(255, 238, 165, 0.42)');
    beamGrad.addColorStop(1, 'rgba(255, 238, 165, 0)');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(332, 114);
    ctx.lineTo(130, 128);
    ctx.lineTo(145, 168);
    ctx.closePath();
    ctx.fill();

    // Lighthouse tower
    ctx.fillStyle = '#e8dfd1';
    ctx.beginPath();
    ctx.moveTo(322, 212);
    ctx.lineTo(326, 126);
    ctx.lineTo(338, 126);
    ctx.lineTo(342, 212);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#c9433a';
    ctx.fillRect(325, 150, 14, 16);
    ctx.fillRect(323, 182, 18, 16);

    // Lantern glass room
    ctx.fillStyle = '#ffec99';
    ctx.fillRect(326, 112, 12, 14);
    // DIFF 2: Lighthouse dome cap crimson vs emerald teal
    ctx.fillStyle = altered ? '#2da88e' : '#c9433a';
    ctx.beginPath();
    ctx.moveTo(323, 112);
    ctx.lineTo(332, 97);
    ctx.lineTo(341, 112);
    ctx.closePath();
    ctx.fill();

    // Calm midnight harbor water
    const water = ctx.createLinearGradient(0, 224, 0, 315);
    water.addColorStop(0, '#162d47');
    water.addColorStop(1, '#0e1d30');
    ctx.fillStyle = water;
    ctx.fillRect(0, 224, W, 92);

    // Shimmering water reflections
    ctx.strokeStyle = 'rgba(255, 224, 150, 0.28)';
    ctx.lineWidth = 2;
    for (let y = 236; y < 292; y += 11) {
      ctx.beginPath();
      ctx.moveTo(76 + (y % 14), y);
      ctx.lineTo(126 - (y % 9), y);
      ctx.moveTo(314, y + 3);
      ctx.lineTo(352, y + 3);
      ctx.stroke();
    }

    // Moored Sailboat
    ctx.fillStyle = '#5c3621';
    ctx.beginPath();
    ctx.moveTo(176, 240);
    ctx.lineTo(256, 240);
    ctx.lineTo(244, 256);
    ctx.lineTo(188, 256);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e5dcc8';
    ctx.fillRect(190, 232, 46, 8);
    // Mast & sail
    ctx.strokeStyle = '#c9a675';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(214, 236);
    ctx.lineTo(214, 174);
    ctx.stroke();
    ctx.fillStyle = '#f2eadb';
    ctx.beginPath();
    ctx.moveTo(216, 180);
    ctx.lineTo(246, 228);
    ctx.lineTo(216, 228);
    ctx.closePath();
    ctx.fill();

    // DIFF 3: Sailboat masthead pennant (crimson vs emerald green)
    ctx.fillStyle = altered ? '#36c486' : '#e0483e';
    ctx.beginPath();
    ctx.moveTo(214, 174);
    ctx.lineTo(234, 180);
    ctx.lineTo(214, 186);
    ctx.closePath();
    ctx.fill();

    // Stone quay railing & café terrace foreground
    ctx.fillStyle = '#332b26';
    ctx.fillRect(0, 294, W, H - 294);
    ctx.fillStyle = '#4a3e36';
    ctx.fillRect(0, 286, W, 12);
    // Cobblestone terrace lines
    ctx.strokeStyle = 'rgba(15, 11, 8, 0.35)';
    ctx.lineWidth = 1.5;
    for (let y = 315; y < H; y += 26) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Café Awning on Right
    const awningLeft = 374;
    const stripeW = 34;
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#b83c34' : '#f0e4cc';
      ctx.beginPath();
      ctx.moveTo(awningLeft + i * stripeW, 74);
      ctx.lineTo(awningLeft + (i + 1) * stripeW, 74);
      ctx.lineTo(awningLeft + (i + 1) * stripeW - 6, 124);
      ctx.lineTo(awningLeft + i * stripeW - 6, 124);
      ctx.closePath();
      ctx.fill();
    }
    // Awning scallops
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#9c2f28' : '#dfd2b8';
      ctx.beginPath();
      ctx.arc(awningLeft + i * stripeW + 11, 124, 17, 0, Math.PI);
      ctx.fill();
    }

    // DIFF 4: Hanging brass lantern under awning (warm amber glow vs cool cyan glow)
    ctx.strokeStyle = '#2b221a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(472, 124);
    ctx.lineTo(472, 146);
    ctx.stroke();
    const lanternGlow = ctx.createRadialGradient(472, 164, 4, 472, 164, 52);
    lanternGlow.addColorStop(0, altered ? 'rgba(92, 224, 240, 0.55)' : 'rgba(255, 200, 96, 0.55)');
    lanternGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lanternGlow;
    ctx.beginPath();
    ctx.arc(472, 164, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = altered ? '#7df2ff' : '#ffd166';
    ctx.beginPath();
    ctx.roundRect(461, 148, 22, 28, 5);
    ctx.fill();
    ctx.strokeStyle = '#291e14';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Bistro Table (Bottom Left)
    ctx.fillStyle = '#1f1916';
    ctx.fillRect(140, 370, 12, 86);
    ctx.fillStyle = '#efe5d2';
    ctx.beginPath();
    ctx.ellipse(146, 366, 86, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b98b44';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Croissant on plate
    ctx.fillStyle = '#e0d6c3';
    ctx.beginPath();
    ctx.ellipse(106, 364, 26, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#d48735';
    ctx.beginPath();
    ctx.arc(106, 362, 13, Math.PI, 0);
    ctx.quadraticCurveTo(106, 368, 93, 362);
    ctx.fill();

    // Espresso cup
    ctx.fillStyle = '#f8f3ea';
    ctx.beginPath();
    ctx.roundRect(156, 342, 24, 20, [2, 2, 10, 10]);
    ctx.fill();
    ctx.fillStyle = '#3b2112';
    ctx.beginPath();
    ctx.ellipse(168, 344, 10, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // DIFF 5: Two white sugar cubes next to espresso vs missing sugar cubes
    if (!altered) {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#c4baa8';
      ctx.lineWidth = 1;
      ctx.fillRect(136, 353, 10, 10);
      ctx.strokeRect(136, 353, 10, 10);
      ctx.fillRect(144, 358, 10, 10);
      ctx.strokeRect(144, 358, 10, 10);
    }

    // Chalkboard Menu Easel (Bottom Right)
    ctx.strokeStyle = '#6e492a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(414, 434);
    ctx.lineTo(432, 294);
    ctx.moveTo(494, 434);
    ctx.lineTo(476, 294);
    ctx.stroke();

    ctx.fillStyle = '#202624';
    ctx.strokeStyle = '#8b5e34';
    ctx.lineWidth = 5;
    ctx.fillRect(408, 298, 92, 98);
    ctx.strokeRect(408, 298, 92, 98);

    // Chalk text on easel (DIFF 6: price 4€ vs 7€)
    ctx.fillStyle = '#f2ead8';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('LE QUAI', 454, 322);
    ctx.strokeStyle = '#eab95b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(422, 329);
    ctx.lineTo(486, 329);
    ctx.stroke();
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillStyle = '#ffe599';
    ctx.fillText(altered ? 'CAFÉ · 7€' : 'CAFÉ · 4€', 454, 356);
    ctx.font = '12px Georgia, serif';
    ctx.fillStyle = '#c7d3cc';
    ctx.fillText('Tarte · 6€', 454, 380);
  },
};
