const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/index.html');
const indexCssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/index.css');
const cssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.css');

// 1. Update index.html to load Poppins font family
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#d71920" />
    <meta name="description" content="LCS Computer Training College - Accredited professional IT, Coding, Cybersecurity, and AI practical training in Koforidua, Ghana." />
    <title>LCS Computer Training College | Learn. Build. Launch.</title>
    
    <!-- Poppins Modern Font Family (Google Fonts) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    <link rel="preconnect" href="https://extendsclass.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('index.html updated with Poppins Google Font!');

// 2. Update index.css with Poppins font-family
const indexCss = `
:root {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif !important;
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
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif !important;
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
console.log('index.css updated with Poppins typography!');

// 3. Update App.css with Poppins font family
let appCss = fs.readFileSync(cssPath, 'utf8');

const poppinsOverrideCss = `
/* =========================================================================
   POPPINS MODERN TYPOGRAPHY ENGINE (PRESTIGIOUS & CRISP)
   ========================================================================= */

body, html, * {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

.hero-main-title,
.section-heading h2,
.split-copy h2,
.brand-name,
.btn,
.eyebrow,
.bottom-nav-item {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.hero-main-title {
  font-weight: 800 !important;
  letter-spacing: -0.02em !important;
}

.eyebrow {
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
}
`;

appCss += '\n' + poppinsOverrideCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated with Poppins modern typography!');
