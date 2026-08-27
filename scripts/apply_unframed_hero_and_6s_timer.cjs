const fs = require('fs');
const path = require('path');

// 1. Update src/App.jsx to set slide change timer to 6000ms (6 seconds)
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Change 3000 to 6000
appJsx = appJsx.replace(
  /setInterval\(\(\) => \{[\s\S]*?\}, \d+\);/,
  `setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // changes smoothly every 6 seconds`
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated slide interval to 6000ms (6 seconds) in src/App.jsx');

// 2. Update src/App.css to make Hero truly edge-to-edge full-bleed without any outer frame, box border, or margin
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const fullBleedEdgeToEdgeHeroCss = `
/* =========================================================================
   EDGE-TO-EDGE UNFRAMED HERO BANNER (NO FRAME, NO BORDERS, 6S DURATION)
   ========================================================================= */

.hero-full-bleed,
.hero-section.hero-full-bleed {
  position: relative !important;
  width: 100vw !important;
  left: 50% !important;
  right: 50% !important;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  margin-top: -26px !important;
  margin-bottom: 40px !important;
  padding: 80px max(24px, calc((100vw - 1200px) / 2)) 70px !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  background: #140508 !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.hero-slider-wrapper {
  position: relative !important;
  width: 100% !important;
  min-height: 540px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.hero-slider-media {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  z-index: 1 !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

.hero-slide-item {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 0 !important;
  transform: scale(1.06) !important;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 6.5s ease-out !important;
  will-change: opacity, transform !important;
  z-index: 1 !important;
  pointer-events: none !important;
  border-radius: 0 !important;
}

.hero-slide-item.active {
  opacity: 1 !important;
  transform: scale(1) !important;
  z-index: 2 !important;
  pointer-events: auto !important;
}

.hero-backdrop-img,
.hero-backdrop-media img {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

@media (max-width: 960px) {
  .hero-full-bleed,
  .hero-section.hero-full-bleed {
    margin-top: -18px !important;
    padding: 50px 20px 45px !important;
  }

  .hero-slider-wrapper {
    min-height: 480px !important;
  }
}

@media (max-width: 640px) {
  .hero-full-bleed,
  .hero-section.hero-full-bleed {
    margin-top: -14px !important;
    padding: 40px 16px 35px !important;
  }

  .hero-slider-wrapper {
    min-height: 440px !important;
  }
}
`;

css += '\n' + fullBleedEdgeToEdgeHeroCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css with edge-to-edge unframed hero banner and 6s transition timings!');
