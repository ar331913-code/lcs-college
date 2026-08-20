const sharp = require('sharp');
const fs = require('fs');

async function processHomePageCropForCeo() {
  const input = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787246415517.jpg';
  
  // Crop 1: Natural, high-quality portrait of Mr. Solomon from the home page hero image
  // Left: 260, Top: 140, Width: 380, Height: 440 (Shows his full head, smiling face, peach shirt, and classroom)
  await sharp(input)
    .extract({ left: 260, top: 140, width: 380, height: 440 })
    .resize(600, 700, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95, progressive: true })
    .toFile('public/images/ceo_solomon.jpg');

  await sharp(input)
    .extract({ left: 260, top: 140, width: 380, height: 440 })
    .resize(600, 700, { fit: 'cover', position: 'center' })
    .webp({ quality: 95 })
    .toFile('public/images/ceo_solomon.webp');

  console.log('Successfully cropped CEO from homepage image with full natural framing!');
}

processHomePageCropForCeo().catch(console.error);
