const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const heroLeftAlignmentCss = `
/* =========================================================================
   HERO DESKTOP PROPER LEFT-ALIGNMENT (NOT TOO CENTERED ON COMPUTER SCREENS)
   ========================================================================= */

.hero-content-container {
  position: relative !important;
  z-index: 5 !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 80px clamp(28px, 6vw, 90px) 70px !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
}

.hero-inner-content {
  max-width: 720px !important;
  width: 100% !important;
  margin: 0 !important;
  text-align: left !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
}

.hero-inner-content .hero-badge {
  align-self: flex-start !important;
  margin: 0 0 16px 0 !important;
}

.hero-inner-content .hero-eyebrow {
  text-align: left !important;
  align-self: flex-start !important;
  margin: 0 0 10px 0 !important;
}

.hero-inner-content .hero-main-title {
  text-align: left !important;
  align-self: flex-start !important;
  margin: 0 0 16px 0 !important;
}

.hero-inner-content .hero-lead-text {
  text-align: left !important;
  align-self: flex-start !important;
  margin: 0 0 24px 0 !important;
}

.hero-inner-content .hero-button-row {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-start !important;
  align-self: flex-start !important;
  gap: 16px !important;
  margin: 0 0 28px 0 !important;
}

.hero-inner-content .hero-stats-grid {
  align-self: flex-start !important;
  width: 100% !important;
  max-width: 620px !important;
  margin: 0 0 24px 0 !important;
}

.hero-inner-content .hero-bottom-promo-pill {
  align-self: flex-start !important;
  margin: 0 !important;
}

@media (max-width: 960px) {
  .hero-content-container {
    padding: 50px 24px 45px !important;
  }
}

@media (max-width: 640px) {
  .hero-content-container {
    padding: 40px 16px 36px !important;
  }
  
  .hero-inner-content .hero-stats-grid {
    max-width: 100% !important;
  }
}
`;

css += '\n' + heroLeftAlignmentCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('src/App.css updated with proper left-alignment on desktop!');
