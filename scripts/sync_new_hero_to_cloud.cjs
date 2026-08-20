const https = require('https');
const fs = require('fs');

// Sync new updatedAt timestamp and hero image to cloud bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      parsed.heroImage = './images/heroImage.jpg';
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
