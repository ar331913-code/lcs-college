const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const perfectMobileImageFittingCss = `
/* =========================================================================
   PERFECT RESPONSIVE IMAGE FITTING ON MOBILE & COMPUTER
   ========================================================================= */

/* 1. Global Progressive Image & Picture Handling */
.progressive-image-wrapper,
.progressive-image-wrapper picture {
  width: 100% !important;
  display: block !important;
}

.progressive-img,
.progressive-image-wrapper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

/* 2. Hero Background Sliding Image Fitting */
.hero-slide-item,
.hero-slide-item picture,
.hero-slide-item img,
.hero-backdrop-img {
  width: 100% !important;
  height: 100% !important;
  min-width: 100% !important;
  min-height: 100% !important;
  object-fit: cover !important;
  object-position: center 25% !important;
  display: block !important;
}

/* 3. Split Section Images (Community & About Intro) */
.split-image-wrap,
.split-image-wrap .progressive-image-wrapper {
  width: 100% !important;
  max-width: 100% !important;
  border-radius: 22px !important;
  overflow: hidden !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
}

.split-image-wrap img,
.split-image-wrap .progressive-img {
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: 16/11 !important;
  object-fit: cover !important;
  object-position: center 20% !important;
  display: block !important;
  border-radius: 22px !important;
}

/* 4. Course Cards & Thumbnails */
.course-card,
.course-thumbnail,
.course-thumbnail .progressive-image-wrapper {
  width: 100% !important;
  overflow: hidden !important;
}

.course-thumbnail img,
.course-card img,
.course-thumbnail .progressive-img {
  width: 100% !important;
  height: 220px !important;
  aspect-ratio: 16/10 !important;
  object-fit: cover !important;
  object-position: center !important;
  border-radius: 16px 16px 0 0 !important;
  display: block !important;
}

/* 5. Gallery & Campus Life Cards */
.gallery-card,
.gallery-card .progressive-image-wrapper {
  width: 100% !important;
  border-radius: 18px !important;
  overflow: hidden !important;
}

.gallery-card img,
.gallery-card .progressive-img {
  width: 100% !important;
  height: 240px !important;
  aspect-ratio: 16/10 !important;
  object-fit: cover !important;
  object-position: center !important;
  border-radius: 18px !important;
  display: block !important;
}

/* 6. Executive Leadership (CEO on About Page) */
.leader-card img,
.leader-card .progressive-img {
  width: 100% !important;
  height: 360px !important;
  aspect-ratio: 4/5 !important;
  object-fit: cover !important;
  object-position: center 15% !important;
  border-radius: 18px !important;
  display: block !important;
}

/* 7. Faculty & Teachers */
.teacher-card img,
.teacher-card .progressive-img {
  width: 110px !important;
  height: 110px !important;
  min-width: 110px !important;
  aspect-ratio: 1/1 !important;
  object-fit: cover !important;
  object-position: center top !important;
  border-radius: 16px !important;
  display: block !important;
}

/* =========================================================================
   MOBILE SPECIFIC IMAGE ADAPTATIONS (max-width: 768px & 640px)
   ========================================================================= */

@media (max-width: 768px) {
  /* Hero on mobile */
  .hero-full-bleed-slider {
    min-height: 520px !important;
  }

  .hero-slide-item img,
  .hero-backdrop-img {
    object-position: center 20% !important;
  }

  /* Split sections stack cleanly */
  .split-section {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
  }

  .split-image-wrap img,
  .split-image-wrap .progressive-img {
    height: 260px !important;
    aspect-ratio: 16/10 !important;
    border-radius: 18px !important;
  }

  /* Gallery grid on mobile */
  .gallery-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }

  .gallery-card img,
  .gallery-card .progressive-img {
    height: 230px !important;
  }

  /* Course grid on mobile */
  .course-grid {
    grid-template-columns: 1fr !important;
    gap: 18px !important;
  }

  .course-thumbnail img,
  .course-card img {
    height: 200px !important;
  }

  /* Leader & Teacher cards on mobile */
  .leader-grid,
  .teacher-grid {
    grid-template-columns: 1fr !important;
  }

  .leader-card img {
    height: 300px !important;
  }

  .teacher-card {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
  }

  .teacher-card img {
    width: 85px !important;
    height: 85px !important;
    min-width: 85px !important;
  }
}

@media (max-width: 480px) {
  .hero-full-bleed-slider {
    min-height: 480px !important;
  }

  .hero-slide-item img,
  .hero-backdrop-img {
    object-position: center 18% !important;
  }

  .split-image-wrap img {
    height: 220px !important;
  }

  .gallery-card img {
    height: 210px !important;
  }

  .course-thumbnail img {
    height: 190px !important;
  }
}
`;

css += '\n' + perfectMobileImageFittingCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('src/App.css updated with perfect responsive image fitting on mobile & computer!');
