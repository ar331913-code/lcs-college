const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
const localData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));
localData.aboutVideo = './videos/campus_video.mp4';
localData.updatedAt = Date.now();
fs.writeFileSync(siteDataPath, JSON.stringify(localData, null, 2), 'utf8');
console.log('src/siteData.json updated with aboutVideo: ./videos/campus_video.mp4');

// 2. Sync to cloud database bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      parsed.aboutVideo = './videos/campus_video.mp4';
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
