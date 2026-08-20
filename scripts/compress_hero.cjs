const sharp = require('sharp');
const fs = require('fs');

async function optimizeHero() {
  const input = 'public/images/heroImage.png';
  
  // 1. Optimize as lightweight WebP (< 80 KB)
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toFile('public/images/heroImage.webp');
  
  // 2. Optimize as lightweight JPEG (< 110 KB)
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, progressive: true })
    .toFile('public/images/heroImage.jpg');

  // 3. Overwrite heroImage.png with optimized compressed PNG
  await sharp(input)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile('public/images/heroImage_compressed.png');

  fs.copyFileSync('public/images/heroImage_compressed.png', 'public/images/heroImage.png');
  fs.unlinkSync('public/images/heroImage_compressed.png');

  console.log('Optimized heroImage.webp size:', (fs.statSync('public/images/heroImage.webp').size / 1024).toFixed(1), 'KB');
  console.log('Optimized heroImage.jpg size:', (fs.statSync('public/images/heroImage.jpg').size / 1024).toFixed(1), 'KB');
  console.log('Optimized heroImage.png size:', (fs.statSync('public/images/heroImage.png').size / 1024).toFixed(1), 'KB');
}

optimizeHero().catch(console.error);
