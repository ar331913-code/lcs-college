const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

async function main() {
  const publicImagesDir = path.resolve('public/images');

  // 1. Generate a crisp, ultra-clean professional ghost silhouette avatar image
  const ghostSvg = `
  <svg width="800" height="900" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
      <linearGradient id="silhouette" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.15"/>
      </filter>
    </defs>
    
    <!-- Background Canvas -->
    <rect width="800" height="900" fill="url(#bg)"/>

    <!-- Subtle framing ring -->
    <circle cx="400" cy="420" r="300" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="12 12"/>

    <!-- Avatar Silhouette -->
    <g filter="url(#subtleShadow)">
      <!-- Head -->
      <circle cx="400" cy="320" r="140" fill="url(#silhouette)"/>
      <!-- Neck & Shoulders -->
      <path d="M 180 840 C 180 570, 260 510, 400 510 C 540 510, 620 570, 620 840 Z" fill="url(#silhouette)"/>
      <!-- Crisp Shirt Collar Cutout -->
      <polygon points="360,510 400,600 440,510" fill="#f8fafc"/>
    </g>
  </svg>
  `;

  const svgBuf = Buffer.from(ghostSvg);

  await sharp(svgBuf)
    .jpeg({ quality: 92 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.jpg'));

  await sharp(svgBuf)
    .png({ quality: 92 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.png'));

  await sharp(svgBuf)
    .webp({ quality: 92 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.webp'));

  console.log('1. Generated crisp ghost avatar in public/images/faculty_ghost_avatar.*');

  // 2. Update src/siteData.json
  const siteDataPath = path.resolve('src/siteData.json');
  let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

  siteData.faculty = [
    {
      id: 'fac-ceo',
      name: 'Mr. Solomon Nkwantabisa',
      role: 'Chief Executive Officer (CEO)',
      image: './images/ceo_solomon.jpg',
      bio: 'Leads the strategic vision, institutional growth, and executive leadership of LCS Computer Training College in Ghana.'
    },
    {
      id: 'fac-faustina',
      name: 'Madam Lamiorkor Faustina',
      role: 'Facilitator & Secretary',
      image: './images/faculty_faustina.jpg',
      bio: 'Facilitator and College Secretary overseeing student affairs, academic administrative facilitation, and secretarial leadership.'
    },
    {
      id: 'fac-ai',
      name: 'Emmanuel Boateng Boadu',
      role: 'AI Tutor',
      image: './images/faculty_emmanuel_boateng.jpg',
      bio: 'Specializes in Artificial Intelligence, machine learning principles, neural networks, and building practical AI-powered workflows.'
    },
    {
      id: 'fac-prog',
      name: 'Abdul Rahman Adjovu',
      role: 'Programming Tutor',
      image: './images/faculty_abdul_rahman.jpg',
      bio: 'Leads practical coding in Python, JavaScript, Java, C++, and full-stack web and software engineering projects.'
    },
    {
      id: 'fac-livingston',
      name: 'Mr. Livingston',
      role: 'Networking & Cybersecurity Instructor',
      image: './images/faculty_ghost_avatar.jpg',
      bio: 'Specialist instructor in network administration, Cisco routing & switching, cybersecurity defenses, and systems infrastructure.'
    },
    {
      id: 'fac-manuel',
      name: 'Mr. Manuel',
      role: 'Graphic Design & Video Editing Instructor',
      image: './images/faculty_ghost_avatar.jpg',
      bio: 'Creative media instructor training students in Adobe Photoshop, Illustrator, Premiere Pro, and motion graphic design.'
    },
    {
      id: 'fac-ohene-budu',
      name: 'Emmanuel Ohene Budu',
      role: 'Hardware Engineering & Technical Diagnostics Instructor',
      image: './images/faculty_ghost_avatar.jpg',
      bio: 'Practical technician teaching computer assembly, motherboard architecture, chip-level troubleshooting, and hardware repairs.'
    }
  ];

  siteData.updatedAt = Date.now();
  fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
  console.log('2. Updated src/siteData.json');

  // 3. Update DATA_VERSION in src/App.jsx
  const appJsxPath = path.resolve('src/App.jsx');
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  appJsx = appJsx.replace(
    /const DATA_VERSION = '[^']+';/,
    "const DATA_VERSION = 'v21_ghost_avatars_active';"
  );

  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log('3. Bumped DATA_VERSION in src/App.jsx to v21_ghost_avatars_active');

  // 4. Sync to ExtendsClass cloud bin with retry
  const payload = JSON.stringify(siteData);
  const syncUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

  console.log('4. Uploading updated data to cloud storage bin...');
  
  const uploadToCloud = () => new Promise((resolve, reject) => {
    const req = https.request(syncUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        console.log('Cloud bin response status:', res.statusCode, body);
        resolve(res.statusCode);
      });
    });

    req.on('error', (err) => {
      console.warn('Upload error:', err.message);
      reject(err);
    });

    req.write(payload);
    req.end();
  });

  try {
    await uploadToCloud();
  } catch (e) {
    console.log('Retrying cloud upload in 2s...');
    await new Promise(r => setTimeout(r, 2000));
    await uploadToCloud().catch(err => console.error('Second attempt failed:', err.message));
  }
}

main().catch(console.error);
