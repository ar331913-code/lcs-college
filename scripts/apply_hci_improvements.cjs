const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// 1. Enhanced HeroSlider with Pause on Hover/Touch, Keyboard Navigation, and Previous/Next Controls (HCI User Control & Freedom)
const newHeroSliderComponent = `function HeroSlider({ siteData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section 
      className="hero-full-bleed-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-label="LCS College Highlights Carousel"
    >
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

      {/* Accessible Carousel Navigation Controls (HCI User Control) */}
      <div className="hero-controls-bar">
        <button 
          type="button" 
          onClick={handlePrev} 
          className="hero-nav-arrow hero-nav-prev" 
          aria-label="Previous slide"
          title="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div className="hero-slide-counter" aria-live="polite">
          <span>{currentSlide + 1}</span> / <span>{heroSlides.length}</span>
        </div>
        <button 
          type="button" 
          onClick={handleNext} 
          className="hero-nav-arrow hero-nav-next" 
          aria-label="Next slide"
          title="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
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

appJsx = appJsx.replace(/function HeroSlider\(\{ siteData \}\) \{[\s\S]*?^}/m, newHeroSliderComponent);

// 2. Enhanced CoursesPage with Live Search & Category Filters (HCI Recognition over Recall & Hick's Law)
const newCoursesPageComponent = `function CoursesPage({ courses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'coding', label: 'Software & Web Dev' },
    { id: 'network', label: 'Networking & Security' },
    { id: 'design', label: 'Design & Media' },
    { id: 'office', label: 'Office & Business IT' }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const title = (course.title || '').toLowerCase();
      const desc = (course.text || '').toLowerCase();
      const term = searchTerm.toLowerCase().trim();
      
      const matchesSearch = !term || title.includes(term) || desc.includes(term);

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'coding') {
        return title.includes('programming') || title.includes('website') || title.includes('ai') || title.includes('software') || title.includes('python');
      }
      if (selectedCategory === 'network') {
        return title.includes('cyber') || title.includes('network') || title.includes('hardware') || title.includes('engineering');
      }
      if (selectedCategory === 'design') {
        return title.includes('graphic') || title.includes('video') || title.includes('media') || title.includes('design');
      }
      if (selectedCategory === 'office') {
        return title.includes('office') || title.includes('database') || title.includes('information') || title.includes('business') || title.includes('technology');
      }
      return true;
    });
  }, [courses, searchTerm, selectedCategory]);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Our IT & Tech Programs</p>
          <h1>Career-ready programs built for today's digital economy.</h1>
          <p className="lead" style={{ margin: '14px auto 0', color: 'rgba(42, 23, 29, 0.85)' }}>
            All courses feature 95% practical laboratory training, certified instructors, and flexible regular or weekend sessions.
          </p>
        </div>
      </section>

      {/* HCI Filter & Search Tool (Recognition over Recall) */}
      <section className="course-filter-section">
        <div className="course-search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search programs (e.g. Python, Networking, Graphic Design, AI)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="course-search-input"
            aria-label="Search courses"
          />
          {searchTerm && (
            <button 
              type="button" 
              onClick={() => setSearchTerm('')} 
              className="clear-search-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-pill-group" role="tablist" aria-label="Course categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={\`category-pill \${selectedCategory === cat.id ? 'active' : ''}\`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="results-count-bar">
          <span>Showing <strong>{filteredCourses.length}</strong> of {courses.length} programs</span>
          {searchTerm && (
            <span className="search-query-tag">Matching "{searchTerm}"</span>
          )}
        </div>
      </section>

      <section className="content-section">
        {filteredCourses.length > 0 ? (
          <div className="course-grid full-width">
            {filteredCourses.map((course) => (
              <article key={course.id || course.title} className="course-card large-card">
                <SafeImage 
                  src={course.image} 
                  alt={course.title}
                  className="course-thumbnail"
                  fallbackText={course.title}
                />
                <div className="course-body">
                  <div className="course-meta-tags">
                    <span className="course-duration">{course.duration || 'Flexible Sessions'}</span>
                    <span className="course-accreditation-tag">GES Accredited</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.text}</p>
                  <div className="course-actions">
                    <NavLink 
                      to={\`/contact?program=\${encodeURIComponent(course.title)}\`} 
                      className="btn btn-primary btn-small btn-with-icon"
                    >
                      <span>Enroll in this Course</span>
                      <IconArrowRight size={15} />
                    </NavLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results-box">
            <h3>No matching courses found</h3>
            <p>Try searching for a different keyword or view all available programs.</p>
            <button 
              type="button" 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
              className="btn btn-secondary"
            >
              View All Programs
            </button>
          </div>
        )}
      </section>
    </>
  );
}`;

appJsx = appJsx.replace(/function CoursesPage\(\{ courses \}\) \{[\s\S]*?^}/m, newCoursesPageComponent);

// 3. Add Mobile Bottom Quick-Action Dock (HCI Fitts's Law & Thumb Zone) to SiteLayout
if (!appJsx.includes('mobile-bottom-dock')) {
  appJsx = appJsx.replace(
    '<a className="whatsapp-float"',
    `{/* Mobile Bottom Dock for Thumb-Zone Accessibility (HCI Ergonomics) */}
      <div className="mobile-bottom-dock" aria-label="Quick Actions">
        <a href="tel:+233242070679" className="dock-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>Call Us</span>
        </a>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="dock-action-btn dock-whatsapp">
          <IconWhatsApp size={20} />
          <span>WhatsApp</span>
        </a>
        <NavLink to="/contact" className="dock-action-btn dock-apply">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span>Apply Now</span>
        </NavLink>
      </div>

      <a className="whatsapp-float"`
  );
}

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated src/App.jsx with HCI user controls, course filtering, and mobile thumb-zone dock!');

// 4. Update src/App.css with HCI styling (Focus visible rings, course filters, mobile dock, subtle hero controls)
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const hciCss = `
/* =========================================================================
   HUMAN-COMPUTER INTERACTION (HCI) & ACCESSIBILITY UPGRADES
   ========================================================================= */

/* 1. Universal Accessible Focus Visible Rings (WCAG 2.4.7) */
:focus-visible {
  outline: 3px solid #b84e63 !important;
  outline-offset: 3px !important;
  border-radius: 6px !important;
}

/* 2. Hero Interactive Controls (User Control & Freedom) */
.hero-controls-bar {
  position: absolute !important;
  bottom: 24px !important;
  right: clamp(24px, 5vw, 60px) !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  background: rgba(14, 2, 4, 0.65) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 999px !important;
  padding: 6px 14px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35) !important;
}

.hero-nav-arrow {
  background: rgba(255, 255, 255, 0.15) !important;
  border: none !important;
  color: #ffffff !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.hero-nav-arrow:hover {
  background: #b84e63 !important;
  transform: scale(1.08) !important;
}

.hero-slide-counter {
  color: #ffffff !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  padding: 0 4px !important;
}

/* 3. Course Search & Filter Bar (Recognition Over Recall & Hick's Law) */
.course-filter-section {
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
  margin-bottom: 24px !important;
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(14px) !important;
  padding: 24px 26px !important;
  border-radius: 24px !important;
  border: 1px solid rgba(125, 29, 50, 0.1) !important;
  box-shadow: 0 10px 30px rgba(47, 17, 24, 0.06) !important;
}

.course-search-box {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
}

.search-icon {
  position: absolute !important;
  left: 18px !important;
  color: #8f2946 !important;
  pointer-events: none !important;
}

.course-search-input {
  width: 100% !important;
  padding: 14px 44px 14px 48px !important;
  border-radius: 999px !important;
  border: 1.5px solid rgba(125, 29, 50, 0.18) !important;
  background: #ffffff !important;
  font-size: 1rem !important;
  color: #2a171d !important;
  transition: all 0.25s ease !important;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03) !important;
}

.course-search-input:focus {
  border-color: #8f2946 !important;
  box-shadow: 0 0 0 4px rgba(143, 41, 70, 0.15) !important;
  outline: none !important;
}

.clear-search-btn {
  position: absolute !important;
  right: 14px !important;
  background: rgba(143, 41, 70, 0.1) !important;
  border: none !important;
  color: #8f2946 !important;
  width: 26px !important;
  height: 26px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 0.8rem !important;
  font-weight: bold !important;
}

.category-pill-group {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
}

.category-pill {
  padding: 8px 18px !important;
  border-radius: 999px !important;
  border: 1px solid rgba(125, 29, 50, 0.15) !important;
  background: rgba(255, 255, 255, 0.7) !important;
  color: #4a1f29 !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.category-pill:hover {
  background: rgba(143, 41, 70, 0.08) !important;
  border-color: #8f2946 !important;
  color: #7d1d32 !important;
}

.category-pill.active {
  background: linear-gradient(135deg, #b84e63, #7d1d32) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  box-shadow: 0 4px 12px rgba(125, 29, 50, 0.25) !important;
}

.results-count-bar {
  display: flex !important;
  align-items: center;
  justify-content: space-between !important;
  font-size: 0.88rem !important;
  color: rgba(42, 23, 29, 0.75) !important;
  padding-top: 4px !important;
}

.search-query-tag {
  background: rgba(143, 41, 70, 0.1) !important;
  color: #7d1d32 !important;
  padding: 2px 10px !important;
  border-radius: 6px !important;
  font-weight: 600 !important;
}

.course-meta-tags {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 10px !important;
}

.course-accreditation-tag {
  display: inline-block !important;
  background: rgba(34, 197, 94, 0.12) !important;
  color: #15803d !important;
  border: 1px solid rgba(34, 197, 94, 0.25) !important;
  padding: 3px 10px !important;
  border-radius: 999px !important;
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
}

.no-results-box {
  text-align: center !important;
  padding: 48px 24px !important;
  background: rgba(255, 255, 255, 0.7) !important;
  border-radius: 20px !important;
}

/* 4. Mobile Bottom Quick-Action Dock (HCI Fitts's Law & Thumb Zone Ergonomics) */
.mobile-bottom-dock {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-dock {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 99 !important;
    background: rgba(255, 255, 255, 0.94) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-top: 1px solid rgba(125, 29, 50, 0.12) !important;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08) !important;
    padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px)) !important;
    justify-content: space-around !important;
    align-items: center !important;
  }

  .dock-action-btn {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 3px !important;
    text-decoration: none !important;
    color: #4a1f29 !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    padding: 6px 14px !important;
    border-radius: 12px !important;
    min-height: 48px !important;
    min-width: 68px !important;
    transition: all 0.2s ease !important;
  }

  .dock-action-btn svg {
    color: #7d1d32 !important;
  }

  .dock-whatsapp {
    color: #15803d !important;
  }

  .dock-whatsapp svg {
    color: #22c55e !important;
  }

  .dock-apply {
    background: linear-gradient(135deg, #b84e63, #7d1d32) !important;
    color: #ffffff !important;
    border-radius: 999px !important;
    padding: 6px 20px !important;
  }

  .dock-apply svg {
    color: #ffffff !important;
  }

  /* Add extra padding at the bottom of the page on mobile so content isn't covered by the dock */
  body {
    padding-bottom: 74px !important;
  }

  .whatsapp-float {
    bottom: 84px !important;
  }

  .hero-controls-bar {
    bottom: 16px !important;
    right: 16px !important;
    padding: 4px 10px !important;
  }

  .hero-nav-arrow {
    width: 28px !important;
    height: 28px !important;
  }
}
`;

css += '\n' + hciCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css with comprehensive HCI styling!');
