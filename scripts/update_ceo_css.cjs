const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /\.leader-card img \{[\s\S]*?\}/g,
  `.leader-card img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  border-radius: 18px !important;
  display: block !important;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('App.css updated with centered CEO image position!');
