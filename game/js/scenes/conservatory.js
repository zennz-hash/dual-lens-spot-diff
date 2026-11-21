// Plate III: Grand Botanical Conservatory (7 handcrafted fair differences).

export const conservatoryScene = {
  id: 'conservatory',
  plateNum: 'Plate III',
  title: 'Grand Botanical Conservatory',
  difficulty: 'CURATOR',
  timeLimit: 90,
  differences: [
    { id: 1, x: 290, y: 76, r: 34, label: 'Glass Dome Emblem' },
    { id: 2, x: 108, y: 172, r: 34, label: 'Hanging Basket Blooms' },
    { id: 3, x: 468, y: 168, r: 34, label: 'Blue Morpho Butterfly' },
    { id: 4, x: 290, y: 248, r: 36, label: 'Fountain Lotus Blossom' },
    { id: 5, x: 118, y: 332, r: 34, label: 'Cactus Flower Crown' },
    { id: 6, x: 466, y: 326, r: 34, label: 'Copper Watering Can Spout' },
    { id: 7, x: 232, y: 396, r: 34, label: 'Floor Compass Tile' },
  ],

  render(ctx, altered) {
    const W = 580;
    const H = 460;

    // Bright glasshouse daylight sky
    const bg = ctx.createLinearGradient(0, 0, 0, 310);
    bg.addColorStop(0, '#a9d6e5');
    bg.addColorStop(0.55, '#d7ece8');
    bg.addColorStop(1, '#b8d8be');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, 310);

    // Victorian wrought-iron glass dome arches
    ctx.strokeStyle = '#2d4739';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(290, 290, 265, Math.PI, 0);
    ctx.stroke();
    ctx.lineWidth = 2;
    for (let deg = 20; deg <= 160; deg += 20) {
      const rad = (deg * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(290, 76);
      ctx.lineTo(290 - Math.cos(rad) * 265, 290 - Math.sin(rad) * 140);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(290, 290, 195, Math.PI, 0);
    ctx.stroke();

    // DIFF 1: Dome keystone emblem (gilded sun vs silver moon)
    ctx.fillStyle = '#243a2e';
    ctx.beginPath();
    ctx.arc(290, 76, 22, 0, Math.PI * 2);
    ctx.fill();
    if (altered) {
      ctx.fillStyle = '#dce8f2';
      ctx.beginPath();
      ctx.arc(290, 76, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#243a2e';
      ctx.beginPath();
      ctx.arc(296, 73, 10, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#f2be42';
      ctx.beginPath();
      ctx.arc(290, 76, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f2be42';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(290 + Math.cos(a) * 12, 76 + Math.sin(a) * 12);
        ctx.lineTo(290 + Math.cos(a) * 18, 76 + Math.sin(a) * 18);
        ctx.stroke();
      }
    }

    // Lush background tropical palm fronds
    const drawFrond = (fx, fy, angle, scale, color) => {
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(42, 0, 44, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.restore();
    };
    drawFrond(20, 280, -0.9, 1.3, '#2d6a4f');
    drawFrond(30, 285, -0.4, 1.2, '#40916c');
    drawFrond(560, 280, -2.2, 1.3, '#2d6a4f');
    drawFrond(550, 285, -2.7, 1.2, '#40916c');
    drawFrond(175, 290, -1.2, 1.1, '#52b788');
    drawFrond(405, 290, -1.9, 1.1, '#52b788');

    // Hanging Botanical Basket (Left)
    ctx.strokeStyle = '#3b4f42';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(108, 60);
    ctx.lineTo(108, 128);
    ctx.lineTo(84, 162);
    ctx.moveTo(108, 128);
    ctx.lineTo(132, 162);
    ctx.stroke();
    ctx.fillStyle = '#9c5a34';
    ctx.beginPath();
    ctx.arc(108, 162, 26, 0, Math.PI);
    ctx.fill();
    // Trailing leaves
    ctx.fillStyle = '#337a55';
    for (const [lx, ly] of [[86, 164], [100, 158], [116, 158], [130, 164], [94, 182], [122, 184]]) {
      ctx.beginPath();
      ctx.ellipse(lx, ly, 11, 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    // DIFF 2: Hanging basket flowers (coral pink vs sunflower yellow)
    ctx.fillStyle = altered ? '#f7c931' : '#e85d75';
    for (const [bx, by] of [[92, 174], [108, 168], [124, 175]]) {
      ctx.beginPath();
      ctx.arc(bx, by, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff3b0';
      ctx.beginPath();
      ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = altered ? '#f7c931' : '#e85d75';
    }

    // DIFF 3: Blue Morpho Butterfly hovering near right arch vs absent
    if (!altered) {
      ctx.save();
      ctx.translate(468, 168);
      ctx.rotate(-0.2);
      ctx.fillStyle = '#2596e8';
      ctx.beginPath();
      ctx.ellipse(-10, -5, 13, 9, -0.4, 0, Math.PI * 2);
      ctx.ellipse(10, -5, 13, 9, 0.4, 0, Math.PI * 2);
      ctx.ellipse(-8, 8, 9, 7, 0.3, 0, Math.PI * 2);
      ctx.ellipse(8, 8, 9, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#102840';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 12);
      ctx.stroke();
      ctx.restore();
    }

    // Conservatory tiled stone floor
    ctx.fillStyle = '#d9d2c3';
    ctx.fillRect(0, 300, W, H - 300);
    ctx.strokeStyle = 'rgba(72, 66, 54, 0.25)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < W; x += 58) {
      ctx.beginPath();
      ctx.moveTo(x, 300);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 300; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // DIFF 7: Gold inlaid floor compass tile vs plain stone
    if (!altered) {
      ctx.save();
      ctx.translate(232, 396);
      ctx.fillStyle = '#c99738';
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? 18 : 7;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r * 0.65;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Central Marble Koi Fountain
    ctx.fillStyle = '#ece6da';
    ctx.strokeStyle = '#9e9585';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(290, 286, 88, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#5fa8b8';
    ctx.beginPath();
    ctx.ellipse(290, 284, 74, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    // Fountain tier
    ctx.fillStyle = '#e5ded0';
    ctx.fillRect(280, 232, 20, 52);
    ctx.beginPath();
    ctx.ellipse(290, 232, 32, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Water arcs
    ctx.strokeStyle = 'rgba(235, 250, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(290, 226);
    ctx.quadraticCurveTo(260, 212, 252, 276);
    ctx.moveTo(290, 226);
    ctx.quadraticCurveTo(320, 212, 328, 276);
    ctx.stroke();

    // DIFF 4: Pink floating lotus blossom on fountain water vs plain lily pad
    ctx.fillStyle = '#3b8c5a';
    ctx.beginPath();
    ctx.ellipse(290, 258, 16, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    if (!altered) {
      ctx.fillStyle = '#f472b6';
      for (const dx of [-7, 0, 7]) {
        ctx.beginPath();
        ctx.ellipse(290 + dx, 252, 5, 9, dx * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#ffe588';
      ctx.beginPath();
      ctx.arc(290, 253, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Left Terracotta Cactus Bench
    ctx.fillStyle = '#7d5636';
    ctx.fillRect(46, 356, 144, 12);
    ctx.fillRect(58, 368, 12, 48);
    ctx.fillRect(166, 368, 12, 48);

    const drawCactusPot = (px, py, h, hasFlower) => {
      ctx.fillStyle = '#c4633b';
      ctx.beginPath();
      ctx.moveTo(px - 14, py);
      ctx.lineTo(px + 14, py);
      ctx.lineTo(px + 10, py + 24);
      ctx.lineTo(px - 10, py + 24);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#3a8756';
      ctx.beginPath();
      ctx.roundRect(px - 9, py - h, 18, h + 2, 9);
      ctx.fill();
      if (hasFlower) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(px, py - h - 2, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(px, py - h - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    drawCactusPot(78, 332, 26, false);
    // DIFF 5: Red flower crown on middle cactus vs moved to right cactus
    drawCactusPot(118, 332, 34, !altered);
    drawCactusPot(158, 332, 24, altered);

    // Right Wooden Bench + Copper Watering Can
    ctx.fillStyle = '#7d5636';
    ctx.fillRect(392, 356, 144, 12);
    ctx.fillRect(404, 368, 12, 48);
    ctx.fillRect(512, 368, 12, 48);

    // DIFF 6: Copper watering can facing left vs facing right
    ctx.save();
    ctx.translate(466, 334);
    if (altered) ctx.scale(-1, 1);
    ctx.fillStyle = '#c87544';
    ctx.beginPath();
    ctx.roundRect(-18, -12, 36, 34, 4);
    ctx.fill();
    ctx.strokeStyle = '#8f4d26';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(20, 4, 11, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    // Long spout pointing left
    ctx.strokeStyle = '#c87544';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-16, 12);
    ctx.lineTo(-42, -8);
    ctx.stroke();
    ctx.fillStyle = '#e39864';
    ctx.beginPath();
    ctx.ellipse(-44, -10, 5, 8, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};
