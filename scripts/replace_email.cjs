const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

siteData.email = 'lcsinstituteghana@gmail.com';
siteData.phone = '024 207 0679 / 0549 480 902';
siteData.address = 'Inside Happy Home Tiles Building, Near Metro Mass Transport, Koforidua, Ghana';
siteData.updatedAt = Date.now();

fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('1. Updated src/siteData.json with email: lcsinstituteghana@gmail.com');

// 2. Update src/App.jsx
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Replace fallback email in ContactPage
appJsx = appJsx.replace(
  /const academyEmail = siteData\?\.email \|\| '[^']+';/,
  "const academyEmail = siteData?.email || 'lcsinstituteghana@gmail.com';"
);

// Replace any leftover occurrences of old emails
appJsx = appJsx.replace(/admissions@lcsitacademy\.com/g, 'lcsinstituteghana@gmail.com');
appJsx = appJsx.replace(/info@lcsitacademy\.com/g, 'lcsinstituteghana@gmail.com');

// Bump DATA_VERSION so localStorage is automatically refreshed
appJsx = appJsx.replace(
  /const DATA_VERSION = '[^']+';/,
  "const DATA_VERSION = 'v14_email_lcsinstituteghana';"
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('2. Updated src/App.jsx with email: lcsinstituteghana@gmail.com and bumped DATA_VERSION!');

// 3. Sync to Cloud Storage Bin
const syncCloudData = () => {
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
      console.log('3. Cloud storage bin synced successfully. Response status:', res.statusCode);
    });
  });

  req.on('error', (e) => console.log('Cloud sync warning:', e.message));
  req.write(payload);
  req.end();
};

syncCloudData();
