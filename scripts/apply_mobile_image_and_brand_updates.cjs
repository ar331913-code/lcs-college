const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const mobileImageFixCss = `
/* =========================================================================
   PERFECT MOBILE IMAGE FITTING & RESPONSIVE PROPORTIONS
   ========================================================================= */

@media (max-width: 768px) {
  /* Split Intro & Community Section Images on Mobile */
  .split-image-wrap {
    height: 240px !important;
    min-height: 220px !important;
    max-height: 260px !important;
    width: 100% !important;
    border-radius: 16px !important;
    margin-bottom: 18px !important;
  }

  .split-image-wrap .progressive-image-wrapper,
  .split-image-wrap img {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  /* Leadership Cards (CEO & Madam Faustina) on Mobile */
  .leader-card,
  .two-column-leaders .leader-card {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 20px 16px !important;
    gap: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .leader-card .progressive-image-wrapper,
  .two-column-leaders .leader-card .progressive-image-wrapper {
    width: 100% !important;
    max-width: 200px !important;
    height: 240px !important;
    min-width: unset !important;
    border-radius: 16px !important;
    margin: 0 auto !important;
  }

  .leader-card img,
  .two-column-leaders .leader-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center top !important;
    border-radius: 16px !important;
  }

  /* Teaching Faculty Cards on Mobile */
  .teacher-grid {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
    width: 100% !important;
  }

  .teacher-card {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 14px !important;
    padding: 14px !important;
    border-radius: 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .teacher-card .progressive-image-wrapper {
    width: 80px !important;
    height: 80px !important;
    min-width: 80px !important;
    max-width: 80px !important;
    min-height: 80px !important;
    max-height: 80px !important;
    border-radius: 14px !important;
    flex-shrink: 0 !important;
  }

  .teacher-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center top !important;
    border-radius: 14px !important;
  }

  /* Course Cards on Mobile */
  .course-grid {
    grid-template-columns: 1fr !important;
    gap: 18px !important;
    width: 100% !important;
  }

  .course-card {
    width: 100% !important;
    border-radius: 18px !important;
    box-sizing: border-box !important;
  }

  .course-card .progressive-image-wrapper,
  .course-thumbnail {
    width: 100% !important;
    height: 190px !important;
    min-height: 190px !important;
    border-radius: 18px 18px 0 0 !important;
  }

  .course-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  /* Gallery Grid on Mobile */
  .gallery-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    width: 100% !important;
  }

  .gallery-card {
    width: 100% !important;
    border-radius: 16px !important;
    overflow: hidden !important;
  }

  .gallery-card .progressive-image-wrapper {
    width: 100% !important;
    height: 200px !important;
    border-radius: 16px !important;
  }

  .gallery-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }
}
`;

css += '\n' + mobileImageFixCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('src/App.css updated with responsive mobile image fitting rules!');
