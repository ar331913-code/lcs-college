const fs = require('fs');
const path = require('path');

// 1. Update index.html with Outfit and Plus Jakarta Sans Google Fonts
const indexPath = path.resolve('index.html');
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#d71920" />
    <meta name="description" content="LCS Computer Training College - Accredited professional IT, Coding, Cybersecurity, and AI practical training in Koforidua, Ghana." />
    <title>LCS Computer Training College | Learn. Build. Launch.</title>
    
    <!-- Google Fonts: Outfit & Plus Jakarta Sans (Header & Nav), Playfair Display (Headings), Inter (Body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    <link rel="preconnect" href="https://extendsclass.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('1. index.html updated with Google Fonts');

// 2. Update src/App.jsx: Remove mobile-bottom-nav
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

appJsx = appJsx.replace(/\{\/\*\s*Modern App-Style Bottom Navigation Bar\s*\*\/\}[\s\S]*?<\/nav>/, '');
appJsx = appJsx.replace(/<nav className="mobile-bottom-nav"[\s\S]*?<\/nav>/, '');
fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('2. src/App.jsx: Removed mobile-bottom-nav');

// 3. Update src/App.css:
// - Clean up problematic .site-shell width offsets in media queries
// - Apply Outfit & Plus Jakarta Sans typography to header
// - Universal symmetric centered footer
const appCssPath = path.resolve('src/App.css');
let appCss = fs.readFileSync(appCssPath, 'utf8');

// Fix any media query narrowing .site-shell
appCss = appCss.replace(/width:\s*min\(100%\s*-\s*18px,\s*1280px\);/g, 'width: 100%;');

const targetedFixesCss = `
/* =========================================================================
   UNIVERSAL CLEAN CONTAINER LAYOUT (NO HORIZONTAL SHIFT ON MOBILE)
   ========================================================================= */

html, body, #root {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
}

.site-shell {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  overflow-x: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 100vh !important;
}

.page-content {
  flex: 1 0 auto !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.topbar {
  width: min(1200px, calc(100% - 32px)) !important;
  margin: 12px auto 24px auto !important;
  box-sizing: border-box !important;
}

@media (max-width: 640px) {
  .topbar {
    width: calc(100% - 24px) !important;
    margin: 10px auto 16px auto !important;
  }
}

/* =========================================================================
   HEADER TYPOGRAPHY (OUTFIT & PLUS JAKARTA SANS)
   ========================================================================= */

.topbar,
.site-header,
.brand-name,
.brand-text,
.desktop-nav,
.main-nav,
.nav-link,
.header-actions,
.header-apply-btn,
.mobile-nav-drawer,
.mobile-drawer-header,
.mobile-nav-link,
.mobile-nav-text,
.mobile-drawer-footer {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.brand-name {
  font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  font-size: 1.15rem !important;
  color: #140204 !important;
}

.brand small {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  font-size: 0.74rem !important;
}

.nav-link {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.94rem !important;
  letter-spacing: 0.01em !important;
}

.header-apply-btn {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
}

.mobile-nav-link {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 600 !important;
  font-size: 1.02rem !important;
}

/* =========================================================================
   REMOVE MOBILE BOTTOM NAVIGATION BAR & RESET WHATSAPP BUTTON
   ========================================================================= */

.mobile-bottom-nav {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

@media (max-width: 960px) {
  .mobile-bottom-nav {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    opacity: 0 !important;
  }

  .whatsapp-float {
    bottom: 24px !important;
    right: 18px !important;
  }
}

/* =========================================================================
   PERFECTLY CENTERED FULL-WIDTH FOOTER (ZERO HORIZONTAL SHIFT)
   ========================================================================= */

footer.site-footer,
.site-footer {
  width: 100% !important;
  max-width: 100% !important;
  margin: 48px 0 0 0 !important;
  padding: 44px 20px 48px 20px !important;
  background: linear-gradient(135deg, #140204 0%, #2b0408 55%, #100204 100%) !important;
  border-top: 3px solid #d71920 !important;
  border-radius: 0 !important;
  color: #fdf0f2 !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  position: relative !important;
  left: 0 !important;
  right: 0 !important;
}

.footer-content-wrap {
  width: 100% !important;
  max-width: 720px !important;
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
  font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  text-align: center !important;
  display: block !important;
  margin: 0 auto !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6) !important;
}

.site-footer p {
  color: rgba(253, 240, 242, 0.85) !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 0.92rem !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 580px !important;
  text-align: center !important;
}

.footer-copyright {
  margin: 14px auto 0 auto !important;
  font-size: 0.84rem !important;
  color: rgba(253, 240, 242, 0.65) !important;
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 12px !important;
  font-family: 'Inter', sans-serif !important;
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
  footer.site-footer,
  .site-footer {
    padding: 34px 16px 38px 16px !important;
    margin-top: 36px !important;
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

appCss += '\n' + targetedFixesCss;
fs.writeFileSync(appCssPath, appCss, 'utf8');
console.log('3. App.css updated with centered footer, header font, and bottom nav removal');
