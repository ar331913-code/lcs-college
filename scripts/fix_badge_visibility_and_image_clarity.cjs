const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const visibilityAndClarityCss = `
/* =========================================================================
   HERO BADGE, EYEBROW VISIBILITY & BRIGHT CLEAR BACKGROUND PHOTO
   ========================================================================= */

/* 1. Luminous, high-contrast Hero Badge */
.hero-badge,
.hero-full-bleed-slider .hero-badge,
.hero-inner-content .hero-badge {
  background: rgba(255, 255, 255, 0.18) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.55) !important;
  color: #ffffff !important;
  padding: 8px 18px !important;
  border-radius: 999px !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9) !important;
}

.hero-badge span,
.hero-badge .hero-fade-text {
  color: #ffffff !important;
  font-weight: 700 !important;
}

.hero-badge-icon {
  color: #ffffff !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) !important;
}

.pulse-dot {
  background-color: #22c55e !important;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.8) !important;
}

/* 2. High-Visibility Eyebrow Text */
.hero-eyebrow,
.hero-inner-content .hero-eyebrow,
.hero-inner-content .eyebrow {
  color: #ffd6de !important;
  font-size: 0.84rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.8) !important;
  margin-bottom: 12px !important;
}

/* 3. Brighter, Much Clearer Background Imagery */
.hero-gradient-overlay {
  background: linear-gradient(
    90deg,
    rgba(10, 2, 4, 0.70) 0%,
    rgba(10, 2, 4, 0.48) 42%,
    rgba(10, 2, 4, 0.15) 75%,
    rgba(10, 2, 4, 0.04) 100%
  ) !important;
}

.hero-slide-item img,
.hero-backdrop-img {
  filter: contrast(1.06) brightness(1.08) saturate(1.06) !important;
  image-rendering: -webkit-optimize-contrast !important;
}

/* 4. Deep Contrast Text Shadows for maximum legibility on bright backgrounds */
.hero-main-title {
  color: #ffffff !important;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.95), 0 4px 32px rgba(0, 0, 0, 0.85) !important;
}

.hero-lead-text,
.hero-lead-text span {
  color: rgba(255, 255, 255, 0.96) !important;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(0, 0, 0, 0.85) !important;
}

@media (max-width: 960px) {
  .hero-gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(10, 2, 4, 0.40) 0%,
      rgba(10, 2, 4, 0.18) 40%,
      rgba(10, 2, 4, 0.65) 100%
    ) !important;
  }
}
`;

css += '\n' + visibilityAndClarityCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('src/App.css updated with bright text visibility and clear hero background imagery!');
