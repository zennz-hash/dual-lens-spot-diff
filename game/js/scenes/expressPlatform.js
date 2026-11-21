// Plate V: The Midnight Express Platform (9 handcrafted fair differences).

export const expressPlatformScene = {
  id: 'expressPlatform',
  plateNum: 'Plate V',
  title: 'The Midnight Express Platform',
  difficulty: 'MASTER INSPECTOR',
  timeLimit: 90,
  differences: [
    { id: 1, x: 290, y: 74, r: 36, label: 'Departure Board Time' },
    { id: 2, x: 96, y: 120, r: 34, label: 'Platform Lamp Glass' },
    { id: 3, x: 482, y: 122, r: 34, label: 'Station Clock Finial' },
    { id: 4, x: 138, y: 244, r: 36, label: 'Locomotive Number Plate' },
    { id: 5, x: 300, y: 224, r: 34, label: 'Coach Window Silhouette' },
    { id: 6, x: 424, y: 228, r: 34, label: 'Carriage Crest Emblem' },
    { id: 7, x: 118, y: 374, r: 34, label: 'Luggage Travel Sticker' },
    { id: 8, x: 334, y: 374, r: 34, label: 'Bench Item (Paper/Umbrella)' },
    { id: 9, x: 492, y: 364, r: 34, label: 'Signal Lantern Color' },
  ],

  render(ctx, altered) {
    const W = 580;
    const H = 460;

    // Vaulted iron station night hall
    const bg = ctx.createLinearGradient(0, 0, 0, 320);
    bg.addColorStop(0, '#101521');
    bg.addColorStop(0.65, '#1d2738');
    bg.addColorStop(1, '#2b3340');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, 320);

    // Arched steel canopy ribs
    ctx.strokeStyle = 'rgba(130, 150, 175, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(290, 260, 290, Math.PI, 0);
    ctx.stroke();

    // Suspended Departure Board (Center Top)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(222, 0);
    ctx.lineTo(222, 48);
    ctx.moveTo(358, 0);
    ctx.lineTo(358, 48);
    ctx.stroke();
    ctx.fillStyle = '#181c24';
    ctx.strokeStyle = '#c9973e';
    ctx.lineWidth = 3;
    ctx.fillRect(198, 48, 184, 52);
    ctx.strokeRect(198, 48, 184, 52);
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'center';
    // DIFF 1: Departure time 23:45 vs 23:55
    ctx.fillText(altered ? '23:55 · VIENNA' : '23:45 · VIENNA', 290, 72);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('PLATFORM 4 · EXPRESS', 290, 91);

    // Left Cast-Iron Platform Lamp (DIFF 2: amber vs emerald glass)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(96, 0);
    ctx.lineTo(96, 98);
    ctx.stroke();
    const lGlow = ctx.createRadialGradient(96, 120, 4, 96, 120, 54);
    lGlow.addColorStop(0, altered ? 'rgba(64, 230, 160, 0.5)' : 'rgba(255, 200, 96, 0.5)');
    lGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lGlow;
    ctx.beginPath();
    ctx.arc(96, 120, 54, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = altered ? '#52e6a8' : '#ffd166';
    ctx.beginPath();
    ctx.arc(96, 120, 16, 0, Math.PI * 2);
    ctx.fill();

    // Right Hanging Station Clock
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(482, 0);
    ctx.lineTo(482, 86);
    ctx.stroke();
    ctx.fillStyle = '#f8f2e2';
    ctx.strokeStyle = '#d4a246';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(482, 114, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(482, 114);
    ctx.lineTo(482, 97);
    ctx.moveTo(482, 114);
    ctx.lineTo(494, 119);
    ctx.stroke();
    // DIFF 3: Ornate gold drop finial beneath clock vs absent
    if (!altered) {
      ctx.fillStyle = '#eab95b';
      ctx.beginPath();
      ctx.moveTo(476, 141);
      ctx.lineTo(488, 141);
      ctx.lineTo(482, 158);
      ctx.closePath();
      ctx.fill();
    }

    // Steam Plume
    ctx.fillStyle = 'rgba(220, 232, 245, 0.22)';
    for (const [cx, cy, cr] of [[92, 178, 22], [116, 162, 26], [148, 152, 24], [182, 146, 20]]) {
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Express Train Body
    // Locomotive front (left)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(62, 184, 134, 112);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(86, 164, 22, 22);
    // Gold boiler trim
    ctx.fillStyle = '#d4a246';
    ctx.fillRect(62, 212, 134, 5);
    // Headlamp
    ctx.fillStyle = '#fff3b0';
    ctx.beginPath();
    ctx.arc(82, 244, 11, 0, Math.PI * 2);
    ctx.fill();
    // DIFF 4: Locomotive brass number plate 402 vs 408
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#eab95b';
    ctx.lineWidth = 2;
    ctx.fillRect(114, 232, 50, 24);
    ctx.strokeRect(114, 232, 50, 24);
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(altered ? '408' : '402', 139, 249);

    // Luxury Midnight-Blue Passenger Coach (Right)
    ctx.fillStyle = '#1d3557';
    ctx.fillRect(202, 178, 336, 118);
    ctx.fillStyle = '#d4a246';
    ctx.fillRect(202, 186, 336, 4);
    ctx.fillRect(202, 266, 336, 4);

    // Lit Carriage Windows
    for (const wx of [222, 276, 330, 456]) {
      ctx.fillStyle = '#ffe599';
      ctx.strokeStyle = '#c9973e';
      ctx.lineWidth = 2;
      ctx.fillRect(wx, 200, 42, 46);
      ctx.strokeRect(wx, 200, 42, 46);
    }

    // DIFF 5: Silhouette in window #2 (hatted traveler vs warm table lamp)
    if (!altered) {
      ctx.fillStyle = '#2b241d';
      ctx.beginPath();
      ctx.arc(297, 222, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(284, 214, 26, 4);
      ctx.fillRect(289, 206, 16, 9);
      ctx.beginPath();
      ctx.ellipse(297, 244, 15, 12, 0, Math.PI, 0);
      ctx.fill();
    } else {
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(294, 232, 6, 14);
      ctx.fillStyle = '#e65245';
      ctx.beginPath();
      ctx.moveTo(284, 232);
      ctx.lineTo(310, 232);
      ctx.lineTo(304, 218);
      ctx.lineTo(290, 218);
      ctx.closePath();
      ctx.fill();
    }

    // Coach Door & Emblem (DIFF 6: golden star crest vs ruby diamond crest)
    ctx.fillStyle = '#152740';
    ctx.strokeStyle = '#c9973e';
    ctx.lineWidth = 2;
    ctx.fillRect(398, 194, 48, 96);
    ctx.strokeRect(398, 194, 48, 96);
    if (altered) {
      ctx.fillStyle = '#e63946';
      ctx.beginPath();
      ctx.moveTo(422, 216);
      ctx.lineTo(434, 230);
      ctx.lineTo(422, 244);
      ctx.lineTo(410, 230);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#f2be42';
      ctx.beginPath();
      ctx.arc(422, 230, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(405, 228, 34, 4);
    }

    // Platform Stone Deck
    ctx.fillStyle = '#3c3a39';
    ctx.fillRect(0, 296, W, H - 296);
    ctx.fillStyle = '#e5b94c';
    ctx.fillRect(0, 296, W, 6);

    // Stacked Vintage Suitcases (Bottom Left)
    ctx.fillStyle = '#7c4a2a';
    ctx.fillRect(78, 366, 86, 46);
    ctx.strokeStyle = '#472714';
    ctx.lineWidth = 3;
    ctx.strokeRect(78, 366, 86, 46);
    ctx.fillStyle = '#5c341d';
    ctx.fillRect(92, 336, 58, 30);
    ctx.strokeRect(92, 336, 58, 30);
    // Straps
    ctx.fillStyle = '#c9973e';
    ctx.fillRect(94, 366, 6, 46);
    ctx.fillRect(142, 366, 6, 46);
    // DIFF 7: Bright yellow travel sticker on suitcase vs absent
    if (!altered) {
      ctx.save();
      ctx.translate(120, 388);
      ctx.rotate(-0.18);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-13, -9, 26, 18);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-9, -2, 18, 4);
      ctx.restore();
    }

    // Wooden Platform Bench (Bottom Center)
    ctx.fillStyle = '#5e3c24';
    ctx.fillRect(268, 358, 134, 16);
    ctx.fillRect(268, 378, 134, 14);
    ctx.fillStyle = '#1e242b';
    ctx.fillRect(278, 392, 8, 28);
    ctx.fillRect(384, 392, 8, 28);

    // DIFF 8: Folded newspaper on bench vs burgundy folded umbrella
    if (!altered) {
      ctx.fillStyle = '#f1ead8';
      ctx.fillRect(310, 364, 44, 20);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(316, 370);
      ctx.lineTo(348, 370);
      ctx.moveTo(316, 376);
      ctx.lineTo(342, 376);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(304, 378);
      ctx.lineTo(362, 372);
      ctx.stroke();
      ctx.strokeStyle = '#d4a246';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(366, 376, 6, -Math.PI / 2, Math.PI);
      ctx.stroke();
    }

    // Stationmaster's Signal Lantern on Post (Bottom Right)
    ctx.fillStyle = '#29303b';
    ctx.fillRect(486, 362, 12, 62);
    ctx.fillStyle = '#1e242b';
    ctx.fillRect(476, 344, 32, 36);
    // DIFF 9: Signal lens emerald green vs crimson red
    ctx.fillStyle = altered ? '#ef4444' : '#22c55e';
    ctx.beginPath();
    ctx.arc(492, 362, 11, 0, Math.PI * 2);
    ctx.fill();
    const sigGlow = ctx.createRadialGradient(492, 362, 2, 492, 362, 36);
    sigGlow.addColorStop(0, altered ? 'rgba(239, 68, 68, 0.55)' : 'rgba(34, 197, 94, 0.55)');
    sigGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sigGlow;
    ctx.beginPath();
    ctx.arc(492, 362, 36, 0, Math.PI * 2);
    ctx.fill();
  },
};
