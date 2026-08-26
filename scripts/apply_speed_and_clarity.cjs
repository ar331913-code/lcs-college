const fs = require('fs');
const path = require('path');

// 1. Update index.html to preload hero image in WebP format
const indexPath = path.resolve('index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

if (!indexHtml.includes('rel="preload" as="image"')) {
  indexHtml = indexHtml.replace(
    '<!-- Primary SEO Metadata -->',
    `<!-- Preload Hero Image for Instant Mobile LCP -->
    <link rel="preload" as="image" href="./images/heroImage.webp" type="image/webp" fetchpriority="high" />
    
    <!-- Primary SEO Metadata -->`
  );
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('1. index.html updated with hero image preload!');
}

// 2. Enhance SafeImage in src/App.jsx to support <picture> with WebP source
const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Replace SafeImage with optimized WebP picture component
const oldSafeImageRegex = /function SafeImage\(\{[\s\S]*?return \(\s*<div className=\{`progressive-image-wrapper[\s\S]*?<\/div>\s*\);\s*\}/;

const newSafeImageCode = `function SafeImage({ src, alt, className = '', fallbackText = 'Course Image', style = {} }) {
  const resolved = resolveAssetPath(src);
  const [currentSrc, setCurrentSrc] = useState(resolved);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute webp equivalent if local image
  const webpSrc = resolved && resolved.endsWith('.jpg') ? resolved.replace(/\\.jpg$/, '.webp') : null;

  useEffect(() => {
    const res = resolveAssetPath(src);
    setCurrentSrc(res);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleImageError = () => {
    if (alt?.toLowerCase().includes('ai') || alt?.toLowerCase().includes('intelligence')) {
      setCurrentSrc('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80');
    } else if (alt?.toLowerCase().includes('information') || alt?.toLowerCase().includes('it')) {
      setCurrentSrc('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80');
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={\`fallback-image-box \${className}\`} style={style} role="img" aria-label={alt || fallbackText}>
        <div className="fallback-content">
          <IconMonitor size={36} className="fallback-svg-icon" />
          <span className="fallback-title">{alt || fallbackText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={\`progressive-image-wrapper \${isLoaded ? 'loaded' : 'loading'} \${className}\`} style={style}>
      {!isLoaded && <div className="image-skeleton-shimmer" />}
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={currentSrc}
          alt={alt || fallbackText}
          className={\`progressive-img \${isLoaded ? 'visible' : 'hidden'}\`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
        />
      </picture>
    </div>
  );
}`;

appJsx = appJsx.replace(oldSafeImageRegex, newSafeImageCode);

// Also enhance Hero background media in HomePage to use WebP source
appJsx = appJsx.replace(
  /<div className="hero-backdrop-media">[\s\S]*?<\/div>/,
  `<div className="hero-backdrop-media">
          <picture>
            <source srcSet={resolveAssetPath('./images/heroImage.webp')} type="image/webp" />
            <img 
              src={resolveAssetPath(siteData.heroImage || './images/heroImage.jpg')} 
              alt="Students learning in the LCS computer lab"
              className="hero-backdrop-img"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </picture>
          <div className="hero-gradient-overlay" />
        </div>`
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('2. src/App.jsx updated with WebP picture support!');

// 3. Update src/App.css to make mobile hero image significantly clearer and sharper
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const mobileHeroEnhancements = `
/* =========================================================================
   MOBILE HERO CLARITY & LIGHTNING IMAGE PERFORMANCE
   ========================================================================= */

.hero-backdrop-img {
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: auto !important;
  filter: contrast(1.04) brightness(1.02) !important;
}

@media (max-width: 960px) {
  .hero-backdrop-img,
  .hero-backdrop-media img {
    object-position: center 22% !important;
    transform: scale(1.02) !important;
  }

  /* Clearer, lighter translucent gradient on mobile so students & laptops shine through */
  .hero-gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(14, 2, 4, 0.45) 0%,
      rgba(14, 2, 4, 0.30) 40%,
      rgba(14, 2, 4, 0.70) 100%
    ) !important;
  }

  .hero-main-title {
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9), 0 4px 28px rgba(0, 0, 0, 0.7) !important;
  }

  .hero-lead-text {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 20px rgba(0, 0, 0, 0.8) !important;
  }
}

@media (max-width: 640px) {
  .hero-backdrop-img,
  .hero-backdrop-media img {
    object-position: center 18% !important;
  }

  .hero-gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(14, 2, 4, 0.40) 0%,
      rgba(14, 2, 4, 0.25) 38%,
      rgba(14, 2, 4, 0.68) 100%
    ) !important;
  }
}
`;

css += '\n' + mobileHeroEnhancements;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('3. src/App.css updated with mobile hero clarity rules!');
