const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('C:/Users/GHALAXY/Desktop/lcs-school-website/src/App.css');

let appCss = fs.readFileSync(cssPath, 'utf8');

const perfectImageFitCss = `
/* =========================================================================
   PERFECT IMAGE CONTAINER FITTING & ASPECT RATIO CONTROL
   ========================================================================= */

/* Universal Progressive Image Wrapper & Image Fill */
.progressive-image-wrapper {
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.progressive-image-wrapper img,
.progressive-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  display: block !important;
  transition: opacity 0.3s ease, transform 0.3s ease !important;
}

/* Split Image Section Containers (Home & About) */
.split-image-wrap {
  width: 100% !important;
  height: 420px !important;
  min-height: 360px !important;
  max-height: 480px !important;
  overflow: hidden !important;
  border-radius: 20px !important;
  box-shadow: 0 12px 32px rgba(20, 2, 4, 0.12) !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.split-image-wrap .progressive-image-wrapper,
.split-image-wrap img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

/* College Leadership CEO Card Container */
.leader-card {
  width: 100% !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(215, 25, 32, 0.12) !important;
  box-shadow: 0 14px 34px rgba(20, 2, 4, 0.08) !important;
  display: flex !important;
  flex-direction: column !important;
}

.leader-card .progressive-image-wrapper {
  width: 100% !important;
  height: 360px !important;
  max-height: 380px !important;
}

.leader-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: top center !important;
}

/* Teaching Faculty Cards Container */
.teacher-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
  gap: 20px !important;
  width: 100% !important;
}

.teacher-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 16px !important;
  padding: 16px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(215, 25, 32, 0.1) !important;
  box-shadow: 0 8px 24px rgba(20, 2, 4, 0.06) !important;
  overflow: hidden !important;
}

.teacher-card .progressive-image-wrapper {
  width: 100px !important;
  height: 100px !important;
  min-width: 100px !important;
  min-height: 100px !important;
  max-width: 100px !important;
  max-height: 100px !important;
  border-radius: 14px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.teacher-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: top center !important;
  border-radius: 14px !important;
}

.teacher-info {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  flex: 1 !important;
}

/* Course Cards Images */
.course-card {
  border-radius: 20px !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}

.course-card .progressive-image-wrapper {
  width: 100% !important;
  height: 220px !important;
  max-height: 220px !important;
}

.course-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

/* Gallery Cards Images */
.gallery-card {
  border-radius: 18px !important;
  overflow: hidden !important;
}

.gallery-card .progressive-image-wrapper {
  width: 100% !important;
  height: 240px !important;
}

.gallery-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

/* Responsive Mobile Image Overrides */
@media (max-width: 768px) {
  .split-image-wrap {
    height: 280px !important;
    min-height: 260px !important;
  }

  .leader-card .progressive-image-wrapper {
    height: 290px !important;
  }

  .teacher-card {
    padding: 14px !important;
    gap: 14px !important;
  }

  .teacher-card .progressive-image-wrapper {
    width: 85px !important;
    height: 85px !important;
    min-width: 85px !important;
    min-height: 85px !important;
  }
}
`;

appCss += '\n' + perfectImageFitCss;
fs.writeFileSync(cssPath, appCss, 'utf8');
console.log('App.css updated with perfect image fit rules!');
