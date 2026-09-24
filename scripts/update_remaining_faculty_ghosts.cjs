const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

async function setupGhostFaculty() {
  const publicImagesDir = path.resolve('public/images');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // 1. Generate an elegant, professional ghost avatar silhouette SVG
  const ghostSvg = `
  <svg width="800" height="900" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdf2f4"/>
        <stop offset="50%" stop-color="#f5e1e5"/>
        <stop offset="100%" stop-color="#ebd0d6"/>
      </linearGradient>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a62b42"/>
        <stop offset="100%" stop-color="#6e1223"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#7d1d32" flood-opacity="0.18"/>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="900" fill="url(#bgGrad)"/>
    
    <!-- Subtle Background Pattern / Tech Lines -->
    <circle cx="400" cy="450" r="320" fill="none" stroke="rgba(215, 25, 32, 0.08)" stroke-width="2"/>
    <circle cx="400" cy="450" r="240" fill="none" stroke="rgba(215, 25, 32, 0.08)" stroke-width="2"/>

    <!-- Avatar Silhouette -->
    <g filter="url(#shadow)">
      <!-- Head -->
      <circle cx="400" cy="340" r="140" fill="url(#avatarGrad)"/>
      
      <!-- Shoulders & Upper Body Silhouette -->
      <path d="M 170 820 C 170 560, 250 500, 400 500 C 550 500, 630 560, 630 820 Z" fill="url(#avatarGrad)"/>
    </g>

    <!-- Subtle Collar Accent -->
    <path d="M 350 520 L 400 620 L 450 520" fill="none" stroke="#fdf2f4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const svgBuffer = Buffer.from(ghostSvg);

  // Save as JPG, PNG, and WebP
  await sharp(svgBuffer)
    .png({ quality: 90 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.png'));

  await sharp(svgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.jpg'));

  await sharp(svgBuffer)
    .webp({ quality: 90 })
    .toFile(path.join(publicImagesDir, 'faculty_ghost_avatar.webp'));

  console.log('1. Ghost avatar images generated in public/images/faculty_ghost_avatar.*');

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
  console.log('2. Updated src/siteData.json with Mr. Livingston, Mr. Manuel, and Emmanuel Ohene Budu');

  // 3. Update DATA_VERSION in src/App.jsx
  const appJsxPath = path.resolve('src/App.jsx');
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  appJsx = appJsx.replace(
    /const DATA_VERSION = '[^']+';/,
    "const DATA_VERSION = 'v20_faculty_livingston_manuel_budu';"
  );

  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log('3. Bumped DATA_VERSION in src/App.jsx to v20_faculty_livingston_manuel_budu');

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
}

setupGhostFaculty().catch(err => {
  console.error('Error updating faculty:', err);
  process.exit(1);
});
