const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
const localData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

// Update CEO
localData.faculty[0].name = 'Mr. Solomon Nkwantabisa';
localData.faculty[0].role = 'Chief Executive Officer (CEO)';
localData.faculty[0].image = './images/ceo_solomon.jpg';
localData.faculty[0].bio = 'Leads the strategic vision, institutional growth, and executive leadership of LCS Computer Training College in Ghana.';

// Update Gallery with all 5 uploaded authentic photos
localData.gallery = [
  {
    type: 'image',
    title: 'Modern Coding & Software Lab',
    image: './images/campus_lab_coding.jpg'
  },
  {
    type: 'image',
    title: 'Computer Training Laboratory & Projector',
    image: './images/campus_classroom_overview.jpg'
  },
  {
    type: 'image',
    title: 'Collaborative Student Practice & Programming',
    image: './images/campus_student_focus.jpg'
  },
  {
    type: 'image',
    title: 'Accredited Technical Lecture & Mentorship',
    image: './images/campus_uniform_session.jpg'
  },
  {
    type: 'image',
    title: 'Hardware Diagnostics & Repair Workshop',
    image: './images/campus_hardware_workshop.jpg'
  }
];

localData.updatedAt = Date.now();
fs.writeFileSync(siteDataPath, JSON.stringify(localData, null, 2), 'utf8');
console.log('1. src/siteData.json updated with CEO portrait and 5 campus life photos!');

// 2. Sync to cloud database bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed.faculty) && parsed.faculty.length > 0) {
        parsed.faculty[0].name = 'Mr. Solomon Nkwantabisa';
        parsed.faculty[0].role = 'Chief Executive Officer (CEO)';
        parsed.faculty[0].image = './images/ceo_solomon.jpg';
        parsed.faculty[0].bio = localData.faculty[0].bio;
      }
      parsed.gallery = localData.gallery;
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
          console.log('2. Cloud bin sync status:', putRes.statusCode);
        });
      });
      req.write(postData);
      req.end();
    } catch(e) {
      console.error(e);
    }
  });
});

// 3. Update DATA_VERSION in src/App.jsx
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');
appJsx = appJsx.replace(/const DATA_VERSION = '[^']+';/, "const DATA_VERSION = 'v13_authentic_campus_photos';");
fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('3. src/App.jsx bumped to v13_authentic_campus_photos');
