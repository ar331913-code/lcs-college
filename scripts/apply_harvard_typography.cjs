const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/index.html');
const indexCssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/index.css');
const cssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.css');

// 1. Update index.html to load Harvard University font pairing (Playfair Display & Inter)
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#d71920" />
    <meta name="description" content="LCS Computer Training College - Accredited professional IT, Coding, Cybersecurity, and AI practical training in Koforidua, Ghana." />
    <title>LCS Computer Training College | Learn. Build. Launch.</title>
    
    <!-- Harvard University Brand Typography (Playfair Display Serif & Inter Sans-Serif) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    <link rel="preconnect" href="https://extendsclass.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('index.html updated with Harvard University Playfair Display & Inter fonts!');

// 2. Update index.css with Harvard University typography hierarchy
const indexCss = `
:root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  font-weight: 400;
  color: #1a0407;
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

#root {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
}

/* Harvard Ivy League Serif Headings */
h1, h2, h3, h4, .hero-main-title, .brand-name, .page-hero h1, .section-heading h2, .split-copy h2, .footer-brand {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  letter-spacing: -0.02em;
}

.eyebrow, .btn, .bottom-nav-item, .hero-badge, .course-duration, .promo-tag, .stat-card {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
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
fs.writeFileSync(indexCssPath, indexCss, 'utf8');
console.log('index.css updated with Harvard typography!');

// 3. Update App.css with Harvard University typography rules
let appCss = fs.readFileSync(cssPath, 'utf8');

const harvardTypographyCss = `
/* =========================================================================
   OFFICIAL HARVARD UNIVERSITY TYPOGRAPHY SYSTEM (PLAYFAIR DISPLAY & INTER)
   ========================================================================= */

body, html, p, span, li, a, input, textarea, select {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

/* Prestigious Harvard Ivy League Serif Headings */
h1, h2, h3,
.hero-main-title,
.section-heading h2,
.split-copy h2,
.brand-name,
.footer-brand,
.page-hero h1,
.feature-card h3,
.course-body h3,
.leader-body h3,
.teacher-card h3,
.requirements-panel h3,
.preloader-title {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
}

.hero-main-title {
  font-family: 'Playfair Display', Georgia, serif !important;
  font-weight: 800 !important;
  font-size: clamp(2.3rem, 5.2vw, 4.4rem) !important;
  line-height: 1.08 !important;
  letter-spacing: -0.025em !important;
  color: #ffffff !important;
  text-shadow: 0 3px 18px rgba(0, 0, 0, 0.92), 0 1px 4px rgba(0, 0, 0, 0.95) !important;
}

.section-heading h2,
.split-copy h2 {
  font-size: clamp(1.85rem, 3.2vw, 2.75rem) !important;
  line-height: 1.15 !important;
  color: #1a0407 !important;
}

.btn,
.eyebrow,
.hero-eyebrow,
.hero-badge,
.bottom-nav-item,
.course-duration,
.promo-tag,
.stat-card strong,
.stat-card span,
.preloader-motto {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.eyebrow,
.hero-eyebrow {
  font-size: 0.76rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  font-weight: 700 !important;
}

.lead,
.hero-lead-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 1.05rem !important;
  line-height: 1.68 !important;
}
`;

appCss += '\n' + harvardTypographyCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated with Harvard University typography!');
