const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.resolve('public/images');
const files = fs.readdirSync(imgDir);

async function optimizeAll() {
  console.log('Optimizing all images in public/images for maximum speed and crisp mobile clarity...');

  for (const f of files) {
    if (f.endsWith('.jpg')) {
      const srcFile = path.join(imgDir, f);
      const baseName = f.replace('.jpg', '');
      const webpFile = path.join(imgDir, `${baseName}.webp`);
      const fileBuffer = fs.readFileSync(srcFile);

      try {
        // Crisp WebP version
        await sharp(fileBuffer)
          .sharpen({ sigma: 1.0, m1: 0.5, m2: 0.5 })
          .webp({ quality: 84, effort: 6 })
          .toFile(webpFile);

        // Progressive JPEG
        const optimizedJpg = await sharp(fileBuffer)
          .sharpen({ sigma: 1.0, m1: 0.5, m2: 0.5 })
          .jpeg({ quality: 84, progressive: true, mozjpeg: true })
          .toBuffer();

        fs.writeFileSync(srcFile, optimizedJpg);
        console.log(`Optimized ${f} and created ${baseName}.webp`);
      } catch (err) {
        console.error(`Error optimizing ${f}:`, err);
      }
    }
  }

  console.log('All images optimized successfully!');
}

optimizeAll().catch(console.error);
