const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const redPreloaderTextCss = `
/* =========================================================================
   PAGE PRELOADER RED FONT COLOR (OFFICIAL LCS VIBRANT RED)
   ========================================================================= */

.preloader-title,
h3.preloader-title,
.page-preloader .preloader-title {
  color: #ea1d25 !important;
  font-size: 1.18rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin: 0 !important;
  font-family: 'Playfair Display', Georgia, serif !important;
  text-shadow: 0 0 25px rgba(234, 29, 37, 0.45), 0 2px 10px rgba(0, 0, 0, 0.9) !important;
}

.preloader-motto,
p.preloader-motto,
.page-preloader .preloader-motto {
  color: #ff3340 !important;
  font-size: 0.88rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  margin: 0 0 16px 0 !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85) !important;
}
`;

css += '\n' + redPreloaderTextCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('src/App.css updated with vibrant red font color for page loader text!');
