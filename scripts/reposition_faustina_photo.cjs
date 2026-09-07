const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function cropFaustina() {
  const imgPath = 'C:\\Users\\GHALAXY\\.gemini\\antigravity\\brain\\f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad\\.user_uploaded\\media_1788798292692.jpg';
  const publicImagesDir = path.resolve('public/images');

  const meta = await sharp(imgPath).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // Focus directly on her face and upper body
  // Face starts around y: 340, chin around 480, shoulders around 520, waist around 750
  // Left: centered around x: 288 (width 576)
  const extractRegion = {
    left: Math.round(meta.width * 0.12), // ~69px
    top: Math.round(meta.height * 0.32), // ~327px (just above her hair)
    width: Math.round(meta.width * 0.78), // ~449px (full shoulders width)
    height: Math.round(meta.height * 0.46) // ~471px (head down to upper torso)
  };

  console.log('Extract region:', extractRegion);

  const buffer = fs.readFileSync(imgPath);

  await sharp(buffer)
    .extract(extractRegion)
    .resize(800, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(publicImagesDir, 'faculty_faustina.jpg'));

  await sharp(buffer)
    .extract(extractRegion)
    .resize(800, 900, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(path.join(publicImagesDir, 'faculty_faustina.webp'));

  console.log('Madam Faustina portrait successfully recropped and saved!');
}

cropFaustina().catch(console.error);
