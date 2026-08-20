const sharp = require('sharp');

async function testBothCeoShots() {
  // Shot 1: Smiling assisting students
  const input1 = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787246415517.jpg';
  await sharp(input1)
    .extract({ left: 330, top: 180, width: 280, height: 340 })
    .resize(500, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92 })
    .toFile('public/images/ceo_solomon_shot1.jpg');

  // Shot 2: Standing proudly with students in lab
  const input2 = 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787249757566.jpg';
  const meta2 = await sharp(input2).metadata();
  console.log('Image 2 dims:', meta2.width, meta2.height);

  // In Image 2, he is at the top left in pink shirt
  await sharp(input2)
    .extract({ left: 0, top: 10, width: 170, height: 260 })
    .resize(500, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92 })
    .toFile('public/images/ceo_solomon_shot2.jpg');

  console.log('Both shots created successfully');
}

testBothCeoShots().catch(console.error);
