const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

async function processAbdulRahmanPhoto() {
  const uploadedPath = 'C:\\Users\\GHALAXY\\.gemini\\antigravity\\brain\\f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad\\.user_uploaded\\media_1790214437314.jpg';
  const publicImagesDir = path.resolve('public/images');

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  console.log('1. Processing Abdul Rahman Adjovu photo...');
  const buffer = fs.readFileSync(uploadedPath);
  const metadata = await sharp(buffer).metadata();
  console.log('Original dimensions:', metadata.width, 'x', metadata.height);

  // Resize and optimize to JPG and WebP (800x900 portrait)
  await sharp(buffer)
    .resize(800, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(publicImagesDir, 'faculty_abdul_rahman.jpg'));

  await sharp(buffer)
    .resize(800, 900, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(publicImagesDir, 'faculty_abdul_rahman.webp'));

  console.log('Saved to public/images/faculty_abdul_rahman.jpg and .webp');

  // 2. Update src/siteData.json
  const siteDataPath = path.resolve('src/siteData.json');
  let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

  siteData.faculty.forEach((member) => {
    if (member.id === 'fac-prog' || member.name.includes('Abdul Rahman')) {
      member.image = './images/faculty_abdul_rahman.jpg';
    }
  });

  siteData.updatedAt = Date.now();
  fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
  console.log('2. Updated src/siteData.json with Abdul Rahman official photo');

  // 3. Update DATA_VERSION in src/App.jsx
  const appJsxPath = path.resolve('src/App.jsx');
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  appJsx = appJsx.replace(
    /const DATA_VERSION = '[^']+';/,
    "const DATA_VERSION = 'v18_abdul_rahman_portrait';"
  );

  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log('3. Bumped DATA_VERSION in src/App.jsx to v18_abdul_rahman_portrait');

  // 4. Sync to Cloud Storage Bin
  const binUrl = new URL(siteData.cloudSyncUrl || 'https://extendsclass.com/api/json-storage/bin/bddeefd');
  const payload = JSON.stringify(siteData);

  const req = https.request(binUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => {
      console.log('4. Cloud storage bin synced successfully. Status:', res.statusCode);
    });
  });

  req.on('error', (e) => console.log('Cloud sync warning:', e.message));
  req.write(payload);
  req.end();
}

processAbdulRahmanPhoto().catch(err => {
  console.error('Error processing photo:', err);
  process.exit(1);
});
