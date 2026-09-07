const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

async function processPhotos() {
  const uploadedCeoPath = 'C:\\Users\\GHALAXY\\.gemini\\antigravity\\brain\\f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad\\.user_uploaded\\media_1788798234412.jpg';
  const uploadedFaustinaPath = 'C:\\Users\\GHALAXY\\.gemini\\antigravity\\brain\\f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad\\.user_uploaded\\media_1788798292692.jpg';

  const publicImagesDir = path.resolve('public/images');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // 1. Process CEO Mr. Solomon Nkwantabisa Image
  console.log('1. Processing CEO Mr. Solomon Nkwantabisa photo...');
  const ceoBuffer = fs.readFileSync(uploadedCeoPath);
  
  await sharp(ceoBuffer)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(path.join(publicImagesDir, 'ceo_solomon.jpg'));

  await sharp(ceoBuffer)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .webp({ quality: 86 })
    .toFile(path.join(publicImagesDir, 'ceo_solomon.webp'));

  console.log('CEO image saved to public/images/ceo_solomon.jpg and .webp');

  // 2. Process Madam Lamiorkor Faustina Photo
  console.log('2. Processing Madam Lamiorkor Faustina photo...');
  const faustinaBuffer = fs.readFileSync(uploadedFaustinaPath);
  
  // Crop upper body/headshot (top 60% of vertical photo)
  const metadata = await sharp(faustinaBuffer).metadata();
  const cropHeight = Math.round(metadata.height * 0.70);
  const cropWidth = metadata.width;

  await sharp(faustinaBuffer)
    .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
    .resize(800, 900, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(path.join(publicImagesDir, 'faculty_faustina.jpg'));

  await sharp(faustinaBuffer)
    .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
    .resize(800, 900, { fit: 'cover', position: 'top' })
    .webp({ quality: 86 })
    .toFile(path.join(publicImagesDir, 'faculty_faustina.webp'));

  console.log('Madam Faustina image saved to public/images/faculty_faustina.jpg and .webp');

  // 3. Update src/siteData.json
  const siteDataPath = path.resolve('src/siteData.json');
  let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

  // Ensure CEO details are accurate
  siteData.faculty[0] = {
    id: 'fac-ceo',
    name: 'Mr. Solomon Nkwantabisa',
    role: 'Chief Executive Officer (CEO)',
    image: './images/ceo_solomon.jpg',
    bio: 'Leads the strategic vision, institutional growth, and executive leadership of LCS Computer Training College in Ghana.'
  };

  // Add / update Madam Lamiorkor Faustina as Facilitator and Secretary right after CEO
  const faustinaEntry = {
    id: 'fac-faustina',
    name: 'Madam Lamiorkor Faustina',
    role: 'Facilitator & Secretary',
    image: './images/faculty_faustina.jpg',
    bio: 'Facilitator and College Secretary overseeing student affairs, academic administrative facilitation, and secretarial leadership.'
  };

  // Check if already in array, otherwise insert as index 1
  const existingIndex = siteData.faculty.findIndex(f => f.id === 'fac-faustina' || f.name.includes('Faustina'));
  if (existingIndex >= 0) {
    siteData.faculty[existingIndex] = faustinaEntry;
  } else {
    siteData.faculty.splice(1, 0, faustinaEntry);
  }

  siteData.updatedAt = Date.now();
  fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
  console.log('3. Updated src/siteData.json with CEO and Madam Faustina');

  // 4. Update src/App.jsx DATA_VERSION
  const appJsxPath = path.resolve('src/App.jsx');
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  appJsx = appJsx.replace(
    /const DATA_VERSION = '[^']+';/,
    "const DATA_VERSION = 'v15_ceo_solomon_faustina';"
  );

  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log('4. Bumped DATA_VERSION in src/App.jsx to v15_ceo_solomon_faustina');

  // 5. Sync to Cloud Storage Bin
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
      console.log('5. Cloud storage bin synced successfully. Status:', res.statusCode);
    });
  });

  req.on('error', (e) => console.log('Cloud sync warning:', e.message));
  req.write(payload);
  req.end();
}

processPhotos().catch(err => {
  console.error('Error processing photos:', err);
  process.exit(1);
});
