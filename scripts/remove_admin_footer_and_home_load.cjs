const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// 1. Remove the Admin button from the footer
appJsx = appJsx.replace(
  /<div className="footer-copyright">\s*<span>© \{new Date\(\)\.getFullYear\(\)\} LCS Computer Training College\. All rights reserved\.<\/span>\s*<NavLink to="\/admin" className="admin-link-discrete">Admin<\/NavLink>\s*<\/div>/,
  `<div className="footer-copyright">
            <span>© {new Date().getFullYear()} LCS Computer Training College. All rights reserved.</span>
          </div>`
);

// Also remove any remaining admin-link-discrete occurrences
appJsx = appJsx.replace(/<NavLink to="\/admin" className="admin-link-discrete">Admin<\/NavLink>/g, '');

// 2. Ensure initial load starts at the home page (top) and add fallback route to home
if (!appJsx.includes('<Route path="*" element={<Navigate to="/" replace />} />')) {
  appJsx = appJsx.replace(
    '</Routes>',
    `  <Route path="*" element={<Navigate to="/" replace />} />\n        </Routes>`
  );
}

// 3. Make preloader non-blocking for instantaneous homepage rendering on first load
appJsx = appJsx.replace(
  /const \[initialLoading, setInitialLoading\] = useState\(true\);/,
  'const [initialLoading, setInitialLoading] = useState(false);'
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated src/App.jsx: removed admin link from footer & guaranteed instant homepage loading!');

// 4. Hide admin-link in CSS as safety rule
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const hideAdminCss = `
/* Hide any admin footer links permanently */
.admin-link-discrete,
.footer-bottom-links .admin-link-discrete {
  display: none !important;
  visibility: hidden !important;
}
`;

css += '\n' + hideAdminCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css: ensured admin links in footer are hidden!');
