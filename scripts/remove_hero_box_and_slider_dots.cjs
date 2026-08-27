const fs = require('fs');
const path = require('path');

// 1. Remove slider dots from src/App.jsx
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

const sliderDotsRegex = /\{\/\* Slide Navigation Indicator Pills \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\);\s*}/;

const replacementJsx = `    </div>
  );
}`;

appJsx = appJsx.replace(sliderDotsRegex, replacementJsx);
fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Removed slider indicator dots from src/App.jsx');

// 2. Update src/App.css to remove box frames, borders, box-shadows, and hide any leftover slider dot classes
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const unboxedHeroCss = `
/* =========================================================================
   BORDERLESS / UNBOXED IMMERSIVE HERO (NO BOX FRAME, NO BOTTOM SLIDER BAR)
   ========================================================================= */

.hero-full-bleed,
.hero-section.hero-full-bleed,
.hero-section {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
}

.hero-slider-wrapper {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  width: 100% !important;
}

.hero-slider-media {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
}

.hero-slide-item,
.hero-backdrop-img,
.hero-backdrop-media img {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

/* Remove bottom slider pagination bar completely */
.hero-slide-dots,
.hero-dot {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
`;

css += '\n' + unboxedHeroCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css to eliminate box framing and bottom slider bar!');
