const sharp = require('sharp');
const fs = require('fs');

async function analyzeLogoColors() {
  const { data, info } = await sharp('public/images/logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colorCounts = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    const a = info.channels === 4 ? data[i+3] : 255;
    
    // ignore transparent or near-white / near-black
    if (a < 50) continue;
    if (r > 240 && g > 240 && b > 240) continue;

    // Bucket colors
    const key = `${Math.round(r/15)*15},${Math.round(g/15)*15},${Math.round(b/15)*15}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }

  const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  console.log('Dominant logo colors (RGB):', sorted.map(([k, v]) => `rgb(${k}) count: ${v}`));
}

analyzeLogoColors().catch(console.error);
