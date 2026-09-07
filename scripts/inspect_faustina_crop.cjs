const sharp = require('sharp');
const path = require('path');

async function inspect() {
  const imgPath = 'C:\\Users\\GHALAXY\\.gemini\\antigravity\\brain\\f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad\\.user_uploaded\\media_1788798292692.jpg';
  const meta = await sharp(imgPath).metadata();
  console.log('Original image dimensions:', meta.width, 'x', meta.height);
}

inspect();
