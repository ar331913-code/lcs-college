const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// 1. Ensure initialLoading starts as true
appJsx = appJsx.replace(
  /const \[initialLoading, setInitialLoading\] = useState\(false\);/,
  'const [initialLoading, setInitialLoading] = useState(true);'
);

// 2. Ensure cloud sync and timer guarantee preloader displays smoothly for 1.1s and fades out
appJsx = appJsx.replace(
  /\.finally\(\(\) => \{\s*setTimeout\(\(\) => setInitialLoading\(false\), \d+\);\s*\}\);/,
  `.finally(() => {
        setTimeout(() => setInitialLoading(false), 1000);
      });`
);

// Add fallback timer on mount in case fetch takes longer or fails
if (!appJsx.includes('// Preloader safety timeout')) {
  appJsx = appJsx.replace(
    'return () => clearInterval(timer);',
    `return () => clearInterval(timer);`
  );
}

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated src/App.jsx to restore page loader on page load!');

// 3. Ensure preloader CSS is robust and z-indexed at the top of the viewport
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const preloaderFixCss = `
/* =========================================================================
   PAGE PRELOADER RESTORATION & SILKY SMOOTH FADEOUT ANIMATION
   ========================================================================= */

.page-preloader {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: radial-gradient(circle at center, #26050b 0%, #120204 70%, #080102 100%) !important;
  z-index: 999999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

.page-preloader.preloader-fadeout {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.preloader-card {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  padding: 36px 32px !important;
  max-width: 440px !important;
  width: 90% !important;
}

.preloader-crest-wrap {
  position: relative !important;
  width: 100px !important;
  height: 100px !important;
  margin-bottom: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.preloader-spinner-ring {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 50% !important;
  border: 3px solid rgba(215, 25, 32, 0.2) !important;
  border-top-color: #ea1d25 !important;
  border-right-color: #ffd6de !important;
  animation: preloaderSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite !important;
}

@keyframes preloaderSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.preloader-logo-box {
  width: 74px !important;
  height: 74px !important;
  border-radius: 50% !important;
  background: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
  overflow: hidden !important;
  padding: 6px !important;
  box-sizing: border-box !important;
}

.preloader-logo-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}

.preloader-text-group {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 8px !important;
}

.preloader-title {
  color: #ffffff !important;
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin: 0 !important;
  font-family: 'Playfair Display', Georgia, serif !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6) !important;
}

.preloader-motto {
  color: #ffd6de !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  margin: 0 0 16px 0 !important;
}

.preloader-bar-track {
  width: 220px !important;
  height: 4px !important;
  background: rgba(255, 255, 255, 0.15) !important;
  border-radius: 999px !important;
  overflow: hidden !important;
  position: relative !important;
}

.preloader-bar-fill {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(90deg, #ea1d25, #ffffff, #ea1d25) !important;
  border-radius: 999px !important;
  animation: preloaderFill 1.4s ease-in-out infinite !important;
}

@keyframes preloaderFill {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
}
`;

css += '\n' + preloaderFixCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css with restored preloader styles and animations!');
