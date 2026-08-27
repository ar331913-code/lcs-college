const fs = require('fs');
const path = require('path');

// 1. Update src/App.jsx to add HeroSlider
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Define heroSlides constant and HeroSlider component
const heroSliderComponent = `
const heroSlides = [
  {
    image: './images/heroImage.jpg',
    webp: './images/heroImage.webp',
    alt: 'Students learning in LCS computer laboratory'
  },
  {
    image: './images/campus_lab_coding.jpg',
    webp: './images/campus_lab_coding.webp',
    alt: 'Mr. Solomon mentoring student on laptop'
  },
  {
    image: './images/campus_classroom_overview.jpg',
    webp: './images/campus_classroom_overview.webp',
    alt: 'Computer Training Laboratory with students and projector'
  },
  {
    image: './images/campus_student_focus.jpg',
    webp: './images/campus_student_focus.webp',
    alt: 'Software development and programming practical lab'
  },
  {
    image: './images/campus_uniform_session.jpg',
    webp: './images/campus_uniform_session.webp',
    alt: 'LCS students in class with CEO'
  },
  {
    image: './images/campus_hardware_workshop.jpg',
    webp: './images/campus_hardware_workshop.webp',
    alt: 'Hands-on motherboard and hardware engineering workshop'
  }
];

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider-container">
      {heroSlides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.image}
            className={\`hero-slide-item \${isActive ? 'active' : ''}\`}
            aria-hidden={!isActive}
          >
            <picture>
              <source srcSet={resolveAssetPath(slide.webp)} type="image/webp" />
              <img
                src={resolveAssetPath(slide.image)}
                alt={slide.alt}
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
      
      {/* Slide Navigation Indicator Pills */}
      <div className="hero-slide-dots" aria-label="Hero slider pagination">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={\`hero-dot \${idx === currentSlide ? 'active' : ''}\`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={\`Slide \${idx + 1}\`}
          />
        ))}
      </div>
    </div>
  );
}
`;

// Insert heroSliderComponent right before function HomePage
appJsx = appJsx.replace(
  'function HomePage({ siteData }) {',
  `${heroSliderComponent}\n\nfunction HomePage({ siteData }) {`
);

// Replace the static hero backdrop inside HomePage with <HeroSlider />
const oldHeroBackdropRegex = /<div className="hero-backdrop-media">[\s\S]*?<\/div>\s*<\/div>/;
appJsx = appJsx.replace(
  oldHeroBackdropRegex,
  `<HeroSlider />`
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. src/App.jsx updated with 3-second automatic HeroSlider component!');

// 2. Update src/App.css with smooth sliding transitions & indicator pills
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const heroSliderCss = `
/* =========================================================================
   HERO 3-SECOND AUTOMATIC SLIDER STYLES
   ========================================================================= */

.hero-slider-container {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  z-index: 1 !important;
}

.hero-slide-item {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 0 !important;
  transform: scale(1.05) !important;
  transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 3.5s ease-out !important;
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

.hero-slide-dots {
  position: absolute !important;
  bottom: 22px !important;
  right: 32px !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(14, 2, 4, 0.45) !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
}

.hero-dot {
  width: 18px !important;
  height: 6px !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.45) !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  padding: 0 !important;
}

.hero-dot.active {
  width: 34px !important;
  background: #ffffff !important;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.9) !important;
}

.hero-dot:hover {
  background: rgba(255, 255, 255, 0.8) !important;
}

@media (max-width: 960px) {
  .hero-slide-dots {
    bottom: 16px !important;
    right: 20px !important;
  }
}

@media (max-width: 640px) {
  .hero-slide-dots {
    bottom: 12px !important;
    right: 50% !important;
    transform: translateX(50%) !important;
    gap: 6px !important;
    padding: 4px 10px !important;
  }

  .hero-dot {
    width: 14px !important;
    height: 4px !important;
  }

  .hero-dot.active {
    width: 24px !important;
  }
}
`;

css += '\n' + heroSliderCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. src/App.css updated with Hero slider transitions & pagination dots!');
