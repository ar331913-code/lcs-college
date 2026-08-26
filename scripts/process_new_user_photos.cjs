const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploads = {
  img1: 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787785203465.jpg', // CEO mentoring student
  img2: 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787785220469.jpg', // Full lab overview
  img3: 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787785232137.jpg', // Student focus coding
  img4: 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787785239824.jpg', // Uniform session with CEO
  img5: 'C:/Users/GHALAXY/.gemini/antigravity/brain/f65e1abc-7e82-4a6d-ae9f-5aef300cd2ad/.user_uploaded/media_1787785249789.jpg', // Hardware workshop
};

async function processPhotos() {
  // 1. CEO Portrait Crop (Mr. Solomon in peach shirt from img1)
  // Left side has Mr. Solomon standing smiling
  const meta1 = await sharp(uploads.img1).metadata();
  console.log('img1 meta:', meta1.width, meta1.height);

  // Extract Mr. Solomon from img1 (left: 0 to 420, top: 50 to 550)
  await sharp(uploads.img1)
    .extract({ left: 10, top: 60, width: 440, height: 560 })
    .resize(600, 700, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92, progressive: true })
    .toFile('public/images/ceo_solomon.jpg');

  await sharp(uploads.img1)
    .extract({ left: 10, top: 60, width: 440, height: 560 })
    .resize(600, 700, { fit: 'cover', position: 'top' })
    .webp({ quality: 92 })
    .toFile('public/images/ceo_solomon.webp');

  // 2. Process all 5 Campus Life Gallery images
  // Image 1: Modern Coding & Software Lab
  await sharp(uploads.img1)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/campus_lab_coding.jpg');
  await sharp(uploads.img1)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile('public/images/campus_lab_coding.webp');

  // Image 2: Computer Training Laboratory & Projector
  await sharp(uploads.img2)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/campus_classroom_overview.jpg');
  await sharp(uploads.img2)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile('public/images/campus_classroom_overview.webp');

  // Image 3: Collaborative Student Practice & Programming
  await sharp(uploads.img3)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/campus_student_focus.jpg');
  await sharp(uploads.img3)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile('public/images/campus_student_focus.webp');

  // Image 4: Accredited Technical Lecture & Mentorship
  await sharp(uploads.img4)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/campus_uniform_session.jpg');
  await sharp(uploads.img4)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile('public/images/campus_uniform_session.webp');

  // Image 5: Hardware Diagnostics & Repair Workshop
  await sharp(uploads.img5)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile('public/images/campus_hardware_workshop.jpg');
  await sharp(uploads.img5)
    .resize(1024, 680, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile('public/images/campus_hardware_workshop.webp');

  console.log('All 5 uploaded images and CEO portrait successfully cropped and saved!');
}

processPhotos().catch(console.error);
