const sharp = require('sharp');
const fs = require('fs');

async function processUploadedHero() {
  const input = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787246415517.jpg';
  
  // 1. WebP format (< 90 KB)
  await sharp(input)
    .resize(1400, 930, { fit: 'cover', position: 'center' })
    .webp({ quality: 84 })
    .toFile('public/images/heroImage.webp');
  
  // 2. Progressive JPEG format (< 140 KB)
  await sharp(input)
    .resize(1400, 930, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 84, progressive: true })
    .toFile('public/images/heroImage.jpg');

  // 3. PNG format
  await sharp(input)
    .resize(1400, 930, { fit: 'cover', position: 'center' })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile('public/images/heroImage.png');

  console.log('Saved public/images/heroImage.webp:', (fs.statSync('public/images/heroImage.webp').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/heroImage.jpg:', (fs.statSync('public/images/heroImage.jpg').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/heroImage.png:', (fs.statSync('public/images/heroImage.png').size / 1024).toFixed(1), 'KB');
}

processUploadedHero().catch(console.error);
