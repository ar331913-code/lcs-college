const fs = require('fs');
const path = require('path');

// 1. Update HeroSlider in src/App.jsx with the new direct full-bleed structure
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

const newHeroSliderCode = `function HeroSlider({ siteData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="hero-full-bleed-slider">
      {/* Background Sliding Images spanning 100% full screen width and height */}
      <div className="hero-slider-media">
        {heroSlides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={s.image}
              className={\`hero-slide-item \${isActive ? 'active' : ''}\`}
              aria-hidden={!isActive}
            >
              <picture>
                <source srcSet={resolveAssetPath(s.webp)} type="image/webp" />
                <img
                  src={resolveAssetPath(s.image)}
                  alt={s.alt}
                  className="hero-backdrop-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchpriority={idx === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </picture>
            </div>
          );
        })}
        <div className="hero-gradient-overlay" />
      </div>

      {/* Centered Content Container */}
      <div className="hero-content-container">
        <div className="hero-inner-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <IconGraduationCap size={16} className="hero-badge-icon" />
            <span key={slide.badge} className="hero-fade-text">{slide.badge}</span>
          </div>

          <p className="eyebrow hero-eyebrow">Accredited by Ghana Education Service</p>
          
          <h1 className="hero-main-title">
            <span key={slide.title} className="hero-fade-text hero-title-text">{slide.title}</span>
          </h1>
          
          <p className="lead hero-lead-text">
            <span key={slide.lead} className="hero-fade-text">{slide.lead}</span>
          </p>

          <div className="button-row hero-button-row">
            <NavLink to="/courses" className="btn btn-primary btn-hero-primary btn-with-icon">
              <span>Explore Programs</span>
              <IconArrowRight size={16} />
            </NavLink>
            <NavLink to="/contact" className="btn btn-secondary btn-hero-secondary">
              Apply Online →
            </NavLink>
          </div>

          <div className="stats-grid hero-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card hero-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-bottom-promo-pill">
            <span className="promo-tag">{siteData?.promoTitle || '95% Practical'}</span>
            <span>{siteData?.promoText || 'Flexible schedules with regular and weekend sessions. Hostel facilities available.'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}`;

// Replace function HeroSlider
const heroSliderRegex = /function HeroSlider\(\{ siteData \}\) \{[\s\S]*?^}/m;
appJsx = appJsx.replace(heroSliderRegex, newHeroSliderCode);

// In HomePage, replace <section className="hero-section hero-full-bleed">...<HeroSlider siteData={siteData} />...</section> with just <HeroSlider siteData={siteData} />
appJsx = appJsx.replace(
  /<section className="hero-section hero-full-bleed">[\s\S]*?<HeroSlider siteData=\{siteData\} \/>[\s\S]*?<\/section>/,
  '<HeroSlider siteData={siteData} />'
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated HomePage and HeroSlider in src/App.jsx!');

// 2. Update src/App.css with full fill, responsive rules, and zero-gap bleed
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const heroFullFillCss = `
/* =========================================================================
   TRUE FULL-BLEED HERO SLIDER (FILLS 100% WIDTH & HEIGHT ON ALL DEVICES)
   ========================================================================= */

.hero-full-bleed-slider {
  position: relative !important;
  width: 100vw !important;
  left: 50% !important;
  right: 50% !important;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  margin-top: -26px !important;
  margin-bottom: 40px !important;
  min-height: 640px !important;
  display: flex !important;
  align-items: center !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  background: #140508 !important;
}

.hero-slider-media {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  z-index: 1 !important;
  border: none !important;
  border-radius: 0 !important;
}

.hero-slide-item {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 0 !important;
  transform: scale(1.05) !important;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 6.5s ease-out !important;
  will-change: opacity, transform !important;
  z-index: 1 !important;
  pointer-events: none !important;
}

.hero-slide-item.active {
  opacity: 1 !important;
  transform: scale(1) !important;
  z-index: 2 !important;
  pointer-events: auto !important;
}

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
  border: none !important;
  border-radius: 0 !important;
}

.hero-gradient-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 3 !important;
  background: linear-gradient(
    90deg,
    rgba(14, 2, 4, 0.92) 0%,
    rgba(14, 2, 4, 0.78) 42%,
    rgba(14, 2, 4, 0.38) 72%,
    rgba(14, 2, 4, 0.18) 100%
  ) !important;
}

.hero-content-container {
  position: relative !important;
  z-index: 5 !important;
  width: 100% !important;
  max-width: 1240px !important;
  margin: 0 auto !important;
  padding: 84px 28px 74px !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.hero-inner-content {
  max-width: 700px !important;
  width: 100% !important;
  text-align: left !important;
}

/* Tablet & Mobile: Image fills entire background, overlay is light and clear */
@media (max-width: 960px) {
  .hero-full-bleed-slider {
    margin-top: -18px !important;
    min-height: 560px !important;
  }

  .hero-slide-item img,
  .hero-backdrop-img {
    object-position: center 20% !important;
  }

  .hero-gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(14, 2, 4, 0.50) 0%,
      rgba(14, 2, 4, 0.28) 40%,
      rgba(14, 2, 4, 0.78) 100%
    ) !important;
  }

  .hero-content-container {
    padding: 50px 20px 45px !important;
  }
}

@media (max-width: 640px) {
  .hero-full-bleed-slider {
    margin-top: -14px !important;
    min-height: 500px !important;
  }

  .hero-content-container {
    padding: 40px 16px 36px !important;
  }

  .hero-slide-item img,
  .hero-backdrop-img {
    object-position: center 18% !important;
  }
}
`;

css += '\n' + heroFullFillCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css with full fill hero slider rules!');
