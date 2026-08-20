const sharp = require('sharp');
const fs = require('fs');

async function processCommunityImage() {
  const input = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787247576535.jpg';
  
  // 1. WebP format (< 100 KB)
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .webp({ quality: 84 })
    .toFile('public/images/communityImage.webp');
  
  // 2. Progressive JPEG format (< 160 KB)
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 84, progressive: true })
    .toFile('public/images/communityImage.jpg');

  // 3. PNG format
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile('public/images/communityImage.png');

  console.log('Saved public/images/communityImage.webp:', (fs.statSync('public/images/communityImage.webp').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/communityImage.jpg:', (fs.statSync('public/images/communityImage.jpg').size / 1024).toFixed(1), 'KB');
  console.log('Saved public/images/communityImage.png:', (fs.statSync('public/images/communityImage.png').size / 1024).toFixed(1), 'KB');
}

processCommunityImage().catch(console.error);
