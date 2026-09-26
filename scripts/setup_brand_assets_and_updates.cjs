const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

async function main() {
  const publicDir = path.resolve('public');
  const imagesDir = path.join(publicDir, 'images');
  const logoPath = path.join(imagesDir, 'logo.png');

  console.log('1. Generating high-resolution Favicon, Apple Touch Icon, and OpenGraph Preview from LCS Logo...');

  const logoBuffer = fs.readFileSync(logoPath);

  // A. Generate favicon.png (512x512)
  await sharp(logoBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // B. Generate apple-touch-icon.png (180x180)
  await sharp(logoBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // C. Generate favicon.svg containing the LCS Crest Logo
  const logoBase64 = logoBuffer.toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <circle cx="256" cy="256" r="248" fill="#ffffff" stroke="#d71920" stroke-width="14"/>
  <image href="data:image/png;base64,${logoBase64}" x="36" y="36" width="440" height="440" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');

  // D. Generate 1200x630 OpenGraph Preview Card for WhatsApp and Social Media
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#140204"/>
        <stop offset="60%" stop-color="#2a050b"/>
        <stop offset="100%" stop-color="#100204"/>
      </linearGradient>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ea1d25"/>
        <stop offset="100%" stop-color="#d71920"/>
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <circle cx="1050" cy="315" r="450" fill="rgba(215,25,32,0.12)"/>
    <circle cx="150" cy="550" r="300" fill="rgba(215,25,32,0.08)"/>

    <!-- Left Logo Circle Shield -->
    <circle cx="230" cy="315" r="145" fill="#ffffff" stroke="#ea1d25" stroke-width="8"/>
    <image href="data:image/png;base64,${logoBase64}" x="110" y="195" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>

    <!-- Right Copy & Typography -->
    <g transform="translate(420, 160)">
      <!-- Badge -->
      <rect x="0" y="0" width="370" height="42" rx="21" fill="rgba(215,25,32,0.25)" stroke="#ea1d25" stroke-width="2"/>
      <text x="185" y="27" fill="#ffd6de" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" text-anchor="middle" letter-spacing="1">ACCREDITED BY GES • GHANA</text>

      <!-- Main Title -->
      <text x="0" y="115" fill="#ffffff" font-family="Georgia, serif" font-size="46" font-weight="800" letter-spacing="-0.5">LCS COMPUTER</text>
      <text x="0" y="175" fill="#ea1d25" font-family="Georgia, serif" font-size="46" font-weight="800" letter-spacing="-0.5">TRAINING COLLEGE</text>

      <!-- Motto / Subtitle -->
      <text x="0" y="235" fill="#fdf0f2" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500">Learn. Build. Launch. • 95% Practical IT Training</text>
      <text x="0" y="275" fill="#ffccd5" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="400">Regular Weekday &amp; Weekend Sessions | Koforidua, Ghana</text>
    </g>

    <!-- Bottom Highlight Accent Line -->
    <rect x="0" y="618" width="1200" height="12" fill="url(#redGrad)"/>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95 })
    .toFile(path.join(imagesDir, 'og_preview.png'));

  console.log('Brand assets and OpenGraph preview generated successfully!');

  // 2. Update index.html
  const indexHtmlPath = path.resolve('index.html');
  const indexHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#d71920" />
    <title>LCS Computer Training College | Learn. Build. Launch.</title>
    
    <!-- Primary SEO & Discovery -->
    <meta name="title" content="LCS Computer Training College | Learn. Build. Launch." />
    <meta name="description" content="Accredited by Ghana Education Service. 95% practical hands-on IT, Programming, Cybersecurity, AI, Microsoft Office Suite, and Graphic Design training in Koforidua, Ghana." />
    <meta name="keywords" content="LCS Computer College, IT Training Ghana, Koforidua Computer School, Learn Programming, AI Training, Cybersecurity, Microsoft Office Suite, Web Development Ghana" />
    <meta name="author" content="LCS Computer Training College" />

    <!-- Favicons & Mobile Home Screen Icons (Official LCS Crest) -->
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="./images/logo.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="./favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />

    <!-- Open Graph / WhatsApp / Facebook Preview Card -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ar331913-code.github.io/lcs-college/" />
    <meta property="og:title" content="LCS Computer Training College | Learn. Build. Launch." />
    <meta property="og:description" content="Accredited by Ghana Education Service. 95% practical IT, Programming, Cybersecurity, AI, and Microsoft Office Suite training in Koforidua, Ghana." />
    <meta property="og:image" content="https://ar331913-code.github.io/lcs-college/images/og_preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="LCS Computer Training College Crest and Campus Overview" />
    <meta property="og:site_name" content="LCS Computer Training College" />

    <!-- Twitter Card Preview -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://ar331913-code.github.io/lcs-college/" />
    <meta name="twitter:title" content="LCS Computer Training College | Learn. Build. Launch." />
    <meta name="twitter:description" content="Accredited by Ghana Education Service. 95% practical IT training in Koforidua, Ghana." />
    <meta name="twitter:image" content="https://ar331913-code.github.io/lcs-college/images/og_preview.png" />

    <!-- Google Fonts: Outfit, Plus Jakarta Sans, Playfair Display, Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    <link rel="preconnect" href="https://extendsclass.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
  fs.writeFileSync(indexHtmlPath, indexHtmlContent, 'utf8');
  console.log('2. Updated index.html with official LCS favicon and WhatsApp/Social Preview tags');

  // 3. Update src/siteData.json: Change 'Microsoft Office' to 'Microsoft Office Suite'
  const siteDataPath = path.resolve('src/siteData.json');
  let siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));

  siteData.courses.forEach((course) => {
    if (course.id === 'microsoft-office' || course.title.toLowerCase().includes('microsoft office')) {
      course.title = 'Microsoft Office Suite';
    }
  });

  siteData.updatedAt = Date.now();
  fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf8');
  console.log('3. Updated src/siteData.json with course name "Microsoft Office Suite"');

  // 4. Update DATA_VERSION in src/App.jsx
  const appJsxPath = path.resolve('src/App.jsx');
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  appJsx = appJsx.replace(
    /const DATA_VERSION = '[^']+';/,
    "const DATA_VERSION = 'v22_microsoft_office_suite_brand_favicon';"
  );

  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log('4. Bumped DATA_VERSION in src/App.jsx');

  // 5. Sync to ExtendsClass Cloud Storage Bin
  const payload = JSON.stringify(siteData);
  const syncUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

  console.log('5. Uploading updated course name to cloud storage bin...');
  
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
        console.log('Cloud bin response status:', res.statusCode);
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
    console.log('Retrying cloud upload...');
    await new Promise(r => setTimeout(r, 2000));
    await uploadToCloud().catch(err => console.error('Cloud sync retry error:', err.message));
  }
}

main().catch(console.error);
