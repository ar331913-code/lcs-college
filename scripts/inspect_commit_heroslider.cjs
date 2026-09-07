const { execSync } = require('child_process');
const fs = require('fs');

const oldAppJsx = execSync('git show b47e691:src/App.jsx', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

// Find where heroSlides and HeroSlider are defined
const startIdx = oldAppJsx.indexOf('const heroSlides = [');
const endIdx = oldAppJsx.indexOf('function HomePage({ siteData }) {');

if (startIdx !== -1 && endIdx !== -1) {
  const heroSliderCode = oldAppJsx.slice(startIdx, endIdx);
  console.log('Found HeroSlider code length:', heroSliderCode.length);
  fs.writeFileSync('scripts/hero_slider_code.txt', heroSliderCode, 'utf8');
  console.log('Saved to scripts/hero_slider_code.txt');
} else {
  console.log('Could not find slice boundaries:', { startIdx, endIdx });
}
