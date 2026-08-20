const sharp = require('sharp');
const fs = require('fs');

async function processAboutImage() {
  const input = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787249757566.jpg';
  
  // 1. WebP format (< 100 KB)
  await sharp(input)
    .resize(1300, 860, { fit: 'cover', position: 'center' })
    .webp({ quality: 84 })
    .toFile('public/images/aboutIntroImage.webp');
  
  // 2. Progressive JPEG format (< 160 KB)
  await sharp(input)
    .resize(1300, 860, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 84, progressive: true })
    .toFile('public/images/aboutIntroImage.jpg');

  // 3. PNG format
  await sharp(input)
    .resize(1300, 860, { fit: 'cover', position: 'center' })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile('public/images/aboutIntroImage.png');

  console.log('Saved public/images/aboutIntroImage.webp:', (fs.statSync('public/images/aboutIntroImage.webp').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/aboutIntroImage.jpg:', (fs.statSync('public/images/aboutIntroImage.jpg').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/aboutIntroImage.png:', (fs.statSync('public/images/aboutIntroImage.png').size / 1024).toFixed(1), 'KB');
}

processAboutImage().catch(console.error);
