const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.resolve('src/App.css'), 'utf8');

const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('100vw') || line.includes('calc(100%') || line.includes('margin-left: -') || line.includes('margin-right: -') || line.includes('site-shell') || line.includes('site-footer')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
