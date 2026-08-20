const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.css');
const indexCssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/index.css');

// 1. Update index.css to match LCS Logo Palette (#d71920 / #b30f16 / #140204 / #fdf1f2)
const logoThemeIndexCss = `
:root {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  font-weight: 400;
  color: #1f080b;
  background:
    radial-gradient(circle at top, rgba(215, 25, 32, 0.08), transparent 25%),
    linear-gradient(180deg, #fcf8f8 0%, #f7eded 28%, #fbf5f5 100%);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
  overflow-x: hidden !important;
  scroll-behavior: smooth;
  background: transparent;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

#root {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
}

h1, h2, h3, h4, h5, h6, .hero-main-title, .brand-name, .btn, .eyebrow {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

img {
  max-width: 100%;
}

a {
  color: inherit;
}

h1, h2, h3, p, blockquote, ul, ol, li, input, textarea, button {
  margin-top: 0;
}

button, input, textarea, select {
  font: inherit;
}
`;
fs.writeFileSync(indexCssPath, logoThemeIndexCss, 'utf8');
console.log('index.css updated with LCS Logo color blend!');

// 2. Update App.css with Logo Colors and Border-Radius Removal on Footer
let appCss = fs.readFileSync(cssPath, 'utf8');

const logoColorBlendAndFooterFlatCss = `
/* =========================================================================
   LCS LOGO COLOR BLEND PALETTE & FLAT-EDGE FOOTER (NO BORDER RADIUS)
   ========================================================================= */

/* Brand Color Tokens matching official LCS Logo */
:root {
  --lcs-red: #d71920;
  --lcs-red-bright: #ea1d25;
  --lcs-red-dark: #8c0c12;
  --lcs-dark-obsidian: #140204;
  --lcs-soft-rose: #fdf0f2;
}

/* Primary Button & Highlights with LCS Logo Vibrant Red */
.btn-primary,
.btn-hero-primary {
  background: linear-gradient(135deg, #ea1d25 0%, #b30f16 70%, #68050a 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 10px 25px rgba(215, 25, 32, 0.35) !important;
  border: none !important;
}

.btn-primary:hover,
.btn-hero-primary:hover {
  background: linear-gradient(135deg, #ff2a33 0%, #c4121a 70%, #7d080e 100%) !important;
  box-shadow: 0 14px 30px rgba(215, 25, 32, 0.45) !important;
  transform: translateY(-2px);
}

.brand-mark {
  background: linear-gradient(135deg, #ea1d25, #b30f16 65%, #68050a) !important;
}

.eyebrow,
.hero-eyebrow {
  color: #d71920 !important;
}

.hero-full-bleed .hero-eyebrow {
  color: #ffccd0 !important;
}

.hero-bottom-promo-pill .promo-tag {
  background: #d71920 !important;
  color: #ffffff !important;
}

.pulse-dot {
  background: #ea1d25 !important;
  box-shadow: 0 0 10px #ea1d25 !important;
}

.admin-tab.active {
  background: linear-gradient(135deg, #ea1d25 0%, #b30f16 70%, #68050a 100%) !important;
  color: #ffffff !important;
}

.preloader-spinner-ring {
  border-top-color: #d71920 !important;
  border-right-color: #ea1d25 !important;
}

.preloader-bar-fill {
  background: linear-gradient(90deg, #b30f16, #ea1d25, #b30f16) !important;
}

.preloader-title,
.preloader-motto {
  color: #d71920 !important;
}

/* =========================================================================
   FOOTER: ZERO BORDER RADIUS (FLAT EDGE) & RICH LCS LOGO COLOR GRADIENT
   ========================================================================= */

footer.site-footer,
.site-footer {
  width: 100% !important;
  max-width: 100% !important;
  margin: 36px 0 0 0 !important;
  padding: 44px 28px 38px !important;
  background: linear-gradient(135deg, #140204 0%, #2b0408 55%, #100204 100%) !important;
  border-top: 3px solid #d71920 !important;
  border-radius: 0 !important; /* ZERO BORDER RADIUS - COMPLETELY FLAT EDGE */
  box-shadow: 0 -15px 40px rgba(20, 2, 4, 0.35) !important;
  color: #fdf0f2 !important;
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 24px !important;
  box-sizing: border-box !important;
}

.site-footer .footer-brand {
  color: #ffffff !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.site-footer p {
  color: rgba(253, 240, 242, 0.85) !important;
  font-size: 0.94rem !important;
  margin-top: 8px !important;
  max-width: 500px;
}

.footer-links {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
}

.footer-links a {
  color: #fce1e4 !important;
  font-weight: 600 !important;
  font-size: 0.92rem !important;
  transition: all 0.2s ease !important;
  text-decoration: none !important;
  padding: 8px 15px !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.footer-links a:hover {
  color: #ffffff !important;
  background: linear-gradient(135deg, #ea1d25, #b30f16) !important;
  border-color: transparent !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(215, 25, 32, 0.4) !important;
}

@media (max-width: 768px) {
  footer.site-footer,
  .site-footer {
    flex-direction: column !important;
    align-items: flex-start !important;
    padding: 30px 18px 32px !important;
    border-radius: 0 !important; /* ZERO BORDER RADIUS ON MOBILE */
    gap: 20px !important;
  }

  .footer-links {
    width: 100% !important;
    gap: 8px !important;
  }

  .footer-links a {
    font-size: 0.86rem !important;
    padding: 7px 11px !important;
  }
}
`;

appCss += '\n' + logoColorBlendAndFooterFlatCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated with Logo Color Blend and flat-edge footer!');
