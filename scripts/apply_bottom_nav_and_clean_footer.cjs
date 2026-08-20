const fs = require('fs');
const path = require('path');

const appPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.jsx');
const cssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.css');

// 1. Update App.jsx: Replace footer links with clean footer and add mobile-bottom-nav
let appCode = fs.readFileSync(appPath, 'utf8');

const oldFooterRegex = /<footer className="site-footer">[\s\S]*?<\/footer>/;
const newFooterAndBottomNav = `<footer className="site-footer">
        <div className="footer-content-wrap">
          <span className="brand-name footer-brand">LCS COMPUTER TRAINING COLLEGE</span>
          <p>Training the next generation of digital professionals in Ghana. Accredited by Ghana Education Service.</p>
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} LCS Computer Training College. All rights reserved.</span>
            <NavLink to="/admin" className="admin-link-discrete">Admin</NavLink>
          </div>
        </div>
      </footer>

      {/* Modern App-Style Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Bottom Navigation">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IconGraduationCap size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Home</span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IconUsers size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-label">About</span>
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IconBookOpen size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Courses</span>
        </NavLink>
        <NavLink to="/requirements" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IconCheckCircle size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Admission</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IconPhone size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Contact</span>
        </NavLink>
      </nav>`;

appCode = appCode.replace(oldFooterRegex, newFooterAndBottomNav);
fs.writeFileSync(appPath, appCode, 'utf8');
console.log('App.jsx updated: removed nav in footer and added mobile-bottom-nav!');

// 2. Update App.css with clean footer styling and mobile bottom navigation rules
let appCss = fs.readFileSync(cssPath, 'utf8');

const bottomNavAndCleanFooterCss = `
/* =========================================================================
   CLEAN FOOTER (NO NAV LINKS) & MODERN MOBILE BOTTOM NAVIGATION BAR
   ========================================================================= */

footer.site-footer,
.site-footer {
  width: 100% !important;
  max-width: 100% !important;
  margin: 36px 0 0 0 !important;
  padding: 38px 24px 42px !important;
  background: linear-gradient(135deg, #140204 0%, #2b0408 55%, #100204 100%) !important;
  border-top: 3px solid #d71920 !important;
  border-radius: 0 !important;
  box-shadow: 0 -15px 40px rgba(20, 2, 4, 0.35) !important;
  color: #fdf0f2 !important;
  box-sizing: border-box !important;
  text-align: center !important;
}

.footer-content-wrap {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  max-width: 680px !important;
  margin: 0 auto !important;
}

.footer-copyright {
  margin-top: 14px !important;
  font-size: 0.84rem !important;
  color: rgba(253, 240, 242, 0.65) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 14px !important;
}

.admin-link-discrete {
  color: rgba(253, 240, 242, 0.45) !important;
  text-decoration: none !important;
  font-size: 0.80rem !important;
}

.admin-link-discrete:hover {
  color: #ffffff !important;
}

/* Mobile Bottom Navigation Bar */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 960px) {
  .mobile-bottom-nav {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: 62px !important;
    background: rgba(20, 2, 4, 0.95) !important;
    backdrop-filter: blur(18px) !important;
    -webkit-backdrop-filter: blur(18px) !important;
    border-top: 1px solid rgba(215, 25, 32, 0.38) !important;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5) !important;
    z-index: 9999 !important;
    align-items: center !important;
    justify-content: space-around !important;
    padding: 0 4px !important;
    box-sizing: border-box !important;
  }

  .bottom-nav-item {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-decoration: none !important;
    color: rgba(255, 255, 255, 0.65) !important;
    font-size: 0.68rem !important;
    font-weight: 600 !important;
    gap: 3px !important;
    padding: 6px 8px !important;
    border-radius: 10px !important;
    transition: all 0.2s ease !important;
    flex: 1 !important;
  }

  .bottom-nav-item.active {
    color: #ffffff !important;
    background: rgba(215, 25, 32, 0.28) !important;
  }

  .bottom-nav-item.active .bottom-nav-icon {
    color: #ea1d25 !important;
    transform: scale(1.08);
  }

  .bottom-nav-icon {
    transition: transform 0.2s ease !important;
  }

  .bottom-nav-label {
    letter-spacing: 0.02em !important;
  }

  /* Keep WhatsApp button floating above bottom nav */
  .whatsapp-float {
    bottom: 74px !important;
    right: 14px !important;
  }

  .site-shell {
    padding-bottom: 74px !important;
  }
}
`;

appCss += '\n' + bottomNavAndCleanFooterCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated: clean footer and mobile bottom navigation bar!');
