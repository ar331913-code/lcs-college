const sharp = require('sharp');
const fs = require('fs');

async function cropCeoPortrait() {
  // media_1787246415517.jpg has Mr. Solomon in the center in peach shirt
  const input1 = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787246415517.jpg';
  const meta1 = await sharp(input1).metadata();
  console.log('Image 1 dims:', meta1.width, meta1.height);

  // Extract Mr. Solomon's upper body / head from Image 1
  // He is in the top-center (x ~ 300 to 650, y ~ 200 to 650 on 1024x683 or whatever the dims are)
  const left = Math.round(meta1.width * 0.32);
  const top = Math.round(meta1.height * 0.25);
  const width = Math.round(meta1.width * 0.30);
  const height = Math.round(meta1.height * 0.50);

  console.log('Extracting bbox:', { left, top, width, height });

  await sharp(input1)
    .extract({ left, top, width, height })
    .resize(600, 750, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ceo_solomon.jpg');

  await sharp(input1)
    .extract({ left, top, width, height })
    .resize(600, 750, { fit: 'cover', position: 'top' })
    .webp({ quality: 90 })
    .toFile('public/images/ceo_solomon.webp');

  console.log('Created public/images/ceo_solomon.jpg & webp');
}

cropCeoPortrait().catch(console.error);
