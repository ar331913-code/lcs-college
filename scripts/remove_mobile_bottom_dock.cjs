const fs = require('fs');
const path = require('path');

// 1. Remove mobile-bottom-dock from src/App.jsx
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

const dockRegex = /\{\/\* Mobile Bottom Dock[\s\S]*?<\/div>\s*<\/div>/;
appJsx = appJsx.replace(dockRegex, '');

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Removed mobile-bottom-dock from src/App.jsx');

// 2. Remove dock styles and restore clean mobile bottom spacing in src/App.css
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const removeDockCss = `
/* =========================================================================
   REMOVE MOBILE BOTTOM DOCK (CLEAN VIEWPORT SPACING)
   ========================================================================= */

.mobile-bottom-dock,
.mobile-bottom-nav {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

body {
  padding-bottom: 0 !important;
}

@media (max-width: 768px) {
  body {
    padding-bottom: 0 !important;
  }

  .whatsapp-float {
    bottom: 22px !important;
    right: 18px !important;
  }
}
`;

css += '\n' + removeDockCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css to remove mobile bottom dock and reset spacing');
