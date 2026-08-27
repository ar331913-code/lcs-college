const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Define complete heroSlides data with rich content for each slide
const newHeroSlidesCode = `
const heroSlides = [
  {
    image: './images/heroImage.jpg',
    webp: './images/heroImage.webp',
    alt: 'Students learning in LCS computer laboratory',
    badge: 'Admissions Open 2026/2027 • Regular & Weekend Sessions',
    title: 'LCS COMPUTER TRAINING COLLEGE',
    subtitle: 'Learn. Build. Launch.',
    lead: 'Professional IT training with 95% practical focus. Master Cybersecurity, Web Development, Computer Networking, Hardware Engineering, Graphic Design, and Artificial Intelligence.'
  },
  {
    image: './images/campus_lab_coding.jpg',
    webp: './images/campus_lab_coding.webp',
    alt: 'CEO Mr. Solomon mentoring student on laptop',
    badge: '95% Practical Laboratory Training',
    title: 'PRACTICAL SOFTWARE & CODING LABS',
    subtitle: 'Hands-On Mentorship',
    lead: 'Learn directly with experienced instructors. Build real-world desktop and full-stack web applications with Python, JavaScript, React, and databases.'
  },
  {
    image: './images/campus_classroom_overview.jpg',
    webp: './images/campus_classroom_overview.webp',
    alt: 'Computer Training Laboratory with students and projector',
    badge: 'Modern Technology Workstations',
    title: 'STATE-OF-THE-ART COMPUTER LAB',
    subtitle: 'High-Speed Tech Environment',
    lead: 'Equipped with dedicated student laptops, workstations, high-speed fiber internet, and multimedia presentation projectors in Koforidua.'
  },
  {
    image: './images/campus_student_focus.jpg',
    webp: './images/campus_student_focus.webp',
    alt: 'Software development and programming practical lab',
    badge: 'Career-Ready Skill Development',
    title: 'INTERACTIVE PROGRAMMING & DESIGN',
    subtitle: 'Build Your Tech Portfolio',
    lead: 'Develop in-demand software skills, UI/UX designs, video editing, and database management systems that employers in Ghana and globally require.'
  },
  {
    image: './images/campus_uniform_session.jpg',
    webp: './images/campus_uniform_session.webp',
    alt: 'LCS students in class with CEO',
    badge: 'Accredited by Ghana Education Service',
    title: 'EXPERT TUTORSHIP & LEADERSHIP',
    subtitle: 'Dedicated Industry Mentors',
    lead: 'Guided by CEO Mr. Solomon Nkwantabisa and certified industry faculty committed to transforming learners into competent IT professionals.'
  },
  {
    image: './images/campus_hardware_workshop.jpg',
    webp: './images/campus_hardware_workshop.webp',
    alt: 'Hands-on motherboard and hardware engineering workshop',
    badge: 'Engineering & Diagnostics Studio',
    title: 'HARDWARE & NETWORK WORKSHOP',
    subtitle: 'Motherboard & PC Diagnostics',
    lead: 'Master computer assembly, chip-level troubleshooting, laptop repairs, Cisco router configurations, and LAN/WAN enterprise network setup.'
  }
];

function HeroSlider({ siteData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // changes smoothly every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="hero-slider-wrapper">
      {/* Background Sliding Images */}
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

      {/* Hero Writings Overlaid Directly on Top of Sliding Images */}
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

// Replace existing heroSlides and HeroSlider with the new integrated component
const existingHeroSectionRegex = /const heroSlides = \[[\s\S]*?function HeroSlider\(\) \{[\s\S]*?^}/m;
appJsx = appJsx.replace(existingHeroSectionRegex, newHeroSlidesCode);

// Ensure HomePage calls <HeroSlider siteData={siteData} />
appJsx = appJsx.replace(
  '<HeroSlider />',
  '<HeroSlider siteData={siteData} />'
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. src/App.jsx updated with complete text overlay on sliding hero images!');

// 2. Update src/App.css for text animations and layout
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const heroTextSliderCss = `
/* =========================================================================
   HERO SLIDER WITH TEXT OVERLAY ANIMATIONS
   ========================================================================= */

.hero-slider-wrapper {
  position: relative !important;
  width: 100% !important;
  min-height: 600px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

.hero-slider-media {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  z-index: 1 !important;
  border-radius: inherit !important;
}

.hero-fade-text {
  display: inline-block !important;
  animation: heroTextFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

@keyframes heroTextFadeIn {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title-text {
  letter-spacing: -0.03em !important;
}

@media (max-width: 960px) {
  .hero-slider-wrapper {
    min-height: 520px !important;
  }
}

@media (max-width: 640px) {
  .hero-slider-wrapper {
    min-height: 480px !important;
  }
}
`;

css += '\n' + heroTextSliderCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. src/App.css updated with hero text animation styles!');
