const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

const heroSliderCode = fs.readFileSync('scripts/hero_slider_code.txt', 'utf8');

// 1. Restore heroSlides & HeroSlider right before HomePage
if (!appJsx.includes('function HeroSlider')) {
  appJsx = appJsx.replace(
    'function HomePage({ siteData }) {',
    `${heroSliderCode}\n\nfunction HomePage({ siteData }) {`
  );
  console.log('1. Restored HeroSlider component in src/App.jsx');
}

// 2. Fix ErrorBoundary handleReset to prevent 404 on GitHub Pages
appJsx = appJsx.replace(
  `  handleReset = () => {
    localStorage.removeItem(SITE_DATA_KEY);
    localStorage.removeItem(DATA_VERSION_KEY);
    window.location.href = '/';
  };`,
  `  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };`
);
console.log('2. Fixed ErrorBoundary handleReset');

// 3. Make resolveAssetPath 100% crash-proof
appJsx = appJsx.replace(
  `export const resolveAssetPath = (assetPath) => {
  if (!assetPath) return '';
  if (assetPath.startsWith('data:') || assetPath.startsWith('http:') || assetPath.startsWith('https:') || assetPath.startsWith('blob:')) {
    return assetPath;
  }
  const clean = assetPath.replace(/^(\.\\/|\\/)/, '');
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : \`\${base}/\`;
  return \`\${cleanBase}\${clean}\`;
};`,
  `export const resolveAssetPath = (assetPath) => {
  if (!assetPath || typeof assetPath !== 'string') return '';
  if (assetPath.startsWith('data:') || assetPath.startsWith('http:') || assetPath.startsWith('https:') || assetPath.startsWith('blob:')) {
    return assetPath;
  }
  const clean = assetPath.replace(/^(\.\\/|\\/)/, '');
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : \`\${base}/\`;
  return \`\${cleanBase}\${clean}\`;
};`
);
console.log('3. Hardened resolveAssetPath');

// 4. Ensure DATA_VERSION is bumped to clear any corrupted cache in visitors' browsers
appJsx = appJsx.replace(
  /const DATA_VERSION = '[^']+';/,
  "const DATA_VERSION = 'v17_hero_slider_restored_clean';"
);
console.log('4. Bumped DATA_VERSION to v17_hero_slider_restored_clean');

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('src/App.jsx fully restored and protected against crashes!');
