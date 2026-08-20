const sharp = require('sharp');
const fs = require('fs');

async function finalizeCeoPortrait() {
  const input = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787246415517.jpg';
  
  // Extract Mr. Solomon with comfortable headroom and chest framing
  // Head is at x: 420-560, y: 190-360.
  // We want bounding box: left: 340, top: 180, width: 280, height: 330.
  await sharp(input)
    .extract({ left: 340, top: 185, width: 275, height: 320 })
    .resize(600, 700, { fit: 'cover', position: 'top' })
    .webp({ quality: 90 })
    .toFile('public/images/ceo_solomon.webp');

  await sharp(input)
    .extract({ left: 340, top: 185, width: 275, height: 320 })
    .resize(600, 700, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/ceo_solomon.jpg');

  console.log('Saved finalized public/images/ceo_solomon.webp & jpg');
}

finalizeCeoPortrait().catch(console.error);
