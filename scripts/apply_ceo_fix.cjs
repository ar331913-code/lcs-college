const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
const localData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

// Set CEO Solomon image to authentic cropped portrait
localData.faculty[0].image = './images/ceo_solomon.jpg';
localData.updatedAt = Date.now();
fs.writeFileSync(siteDataPath, JSON.stringify(localData, null, 2), 'utf8');
console.log('src/siteData.json updated with CEO image: ./images/ceo_solomon.jpg');

// 2. Sync to cloud database bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed.faculty) && parsed.faculty.length > 0) {
        parsed.faculty[0].image = './images/ceo_solomon.jpg';
      }
      parsed.updatedAt = Date.now();

      const postData = JSON.stringify(parsed);
      const req = https.request(binUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (putRes) => {
        let putData = '';
        putRes.on('data', (c) => putData += c);
        putRes.on('end', () => {
          console.log('Cloud bin sync status:', putRes.statusCode);
        });
      });
      req.write(postData);
      req.end();
    } catch(e) {
      console.error(e);
    }
  });
});

// 3. Update App.css with Executive Leadership Card styling
const cssPath = path.resolve('src/App.css');
let appCss = fs.readFileSync(cssPath, 'utf8');

const executiveCeoCardCss = `
/* =========================================================================
   EXECUTIVE LEADERSHIP SPOTLIGHT (CEO MR. SOLOMON NKWNTABISA)
   ========================================================================= */

.leader-grid {
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.leader-card {
  width: 100% !important;
  max-width: 680px !important;
  margin: 0 auto !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 28px !important;
  padding: 24px !important;
  border-radius: 24px !important;
  background: rgba(255, 255, 255, 0.98) !important;
  border: 2px solid rgba(215, 25, 32, 0.18) !important;
  box-shadow: 0 16px 40px rgba(20, 2, 4, 0.09) !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.leader-card .progressive-image-wrapper {
  width: 200px !important;
  height: 250px !important;
  min-width: 200px !important;
  max-width: 200px !important;
  border-radius: 18px !important;
  overflow: hidden !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14) !important;
  flex-shrink: 0 !important;
}

.leader-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: top center !important;
  border-radius: 18px !important;
  display: block !important;
}

.leader-body {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  flex: 1 !important;
  padding: 0 !important;
}

.leader-body h3 {
  font-size: 1.55rem !important;
  color: #140204 !important;
  margin: 0 0 6px 0 !important;
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 700 !important;
}

.leader-body span {
  display: inline-block !important;
  color: #d71920 !important;
  font-weight: 700 !important;
  font-size: 0.82rem !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.leader-body p {
  color: rgba(26, 4, 7, 0.85) !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

@media (max-width: 768px) {
  .leader-card {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 22px 18px !important;
    gap: 18px !important;
  }

  .leader-card .progressive-image-wrapper {
    width: 180px !important;
    height: 220px !important;
    min-width: 180px !important;
    max-width: 180px !important;
  }
}
`;

appCss += '\n' + executiveCeoCardCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated with executive CEO spotlight styles!');
