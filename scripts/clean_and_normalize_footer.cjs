const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove all legacy .site-footer / footer.site-footer / .footer-content-wrap overrides
css = css.replace(/(?:footer\.site-footer|\.site-footer|\.footer-content-wrap|\.footer-brand|\.footer-copyright)[\s\S]*?\{[\s\S]*?\}/g, '');

// Also remove empty or broken rules if any
css = css.replace(/@media[^{}]*\{\s*\}/g, '');

// 2. Append the single, clean, definitive, normal footer styling
const cleanDefinitiveFooterCss = `
/* =========================================================================
   STANDARD NORMAL FULL-WIDTH FOOTER (PERFECTLY CENTERED, ZERO OFFSET)
   ========================================================================= */

.site-footer {
  width: 100% !important;
  max-width: 100% !important;
  margin: 40px 0 0 0 !important;
  padding: 44px 20px !important;
  background: linear-gradient(135deg, #140204 0%, #2b0408 55%, #100204 100%) !important;
  border-top: 3px solid #d71920 !important;
  border-radius: 0 !important;
  color: #fdf0f2 !important;
  box-sizing: border-box !important;
  display: block !important;
  text-align: center !important;
  clear: both !important;
  position: relative !important;
}

.footer-content-wrap {
  width: 100% !important;
  max-width: 760px !important;
  margin: 0 auto !important;
  padding: 0 10px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 12px !important;
  box-sizing: border-box !important;
}

.site-footer .footer-brand {
  color: #ffffff !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.03em !important;
  text-align: center !important;
  display: block !important;
  margin: 0 auto !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6) !important;
  font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif !important;
}

.site-footer p {
  color: rgba(253, 240, 242, 0.85) !important;
  font-size: 0.92rem !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 580px !important;
  text-align: center !important;
}

.footer-copyright {
  margin: 14px auto 0 !important;
  font-size: 0.84rem !important;
  color: rgba(253, 240, 242, 0.65) !important;
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 12px !important;
}

.admin-link-discrete {
  color: rgba(253, 240, 242, 0.4) !important;
  text-decoration: none !important;
  font-size: 0.80rem !important;
  transition: color 0.2s ease !important;
}

.admin-link-discrete:hover {
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .site-footer {
    padding: 34px 16px !important;
    margin-top: 30px !important;
  }

  .site-footer .footer-brand {
    font-size: 1.1rem !important;
  }

  .site-footer p {
    font-size: 0.86rem !important;
  }

  .footer-copyright {
    flex-direction: column !important;
    gap: 6px !important;
  }
}
`;

css += '\n' + cleanDefinitiveFooterCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('App.css cleaned and standard normal footer applied!');
