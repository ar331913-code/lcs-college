const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Update src/siteData.json with cache buster query for Faustina image
const siteDataPath = path.resolve('src/siteData.json');
let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

siteData.faculty.forEach((f) => {
  if (f.id === 'fac-faustina' || f.name.includes('Faustina')) {
    f.image = './images/faculty_faustina.jpg?v=' + Date.now();
  }
});
siteData.updatedAt = Date.now();

fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('1. Updated src/siteData.json with updated Faustina image URL');

// 2. Bump DATA_VERSION in src/App.jsx
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

appJsx = appJsx.replace(
  /const DATA_VERSION = '[^']+';/,
  "const DATA_VERSION = 'v16_faustina_repositioned_perfect';"
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('2. Bumped DATA_VERSION in src/App.jsx to v16_faustina_repositioned_perfect');

// 3. Update src/App.css for clean leadership card aspect ratios
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const leaderLayoutFixCss = `
/* =========================================================================
   LEADERSHIP CARDS BALANCED FRAMING & HEADSHOT PROPORTIONS
   ========================================================================= */

.two-column-leaders .leader-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 22px !important;
  padding: 22px !important;
}

.two-column-leaders .leader-card .progressive-image-wrapper {
  width: 170px !important;
  height: 220px !important;
  min-width: 170px !important;
  max-width: 170px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.two-column-leaders .leader-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center top !important;
  border-radius: 16px !important;
  display: block !important;
}

@media (max-width: 768px) {
  .two-column-leaders .leader-card {
    flex-direction: column !important;
    text-align: center !important;
    padding: 24px 18px !important;
    gap: 16px !important;
  }

  .two-column-leaders .leader-card .progressive-image-wrapper {
    width: 100% !important;
    max-width: 240px !important;
    height: 280px !important;
    min-width: unset !important;
  }
}
`;

css += '\n' + leaderLayoutFixCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('3. Updated src/App.css with balanced leadership card framing');

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
