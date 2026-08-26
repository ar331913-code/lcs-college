const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('src/App.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matches = [];
const regex = /([^{}]*site-footer[^{}]*\{[^{}]*\})/gi;
let m;
while ((m = regex.exec(css)) !== null) {
  matches.push(m[0]);
}

console.log(`Found ${matches.length} footer rules in App.css`);
