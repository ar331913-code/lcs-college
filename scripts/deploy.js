const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const repoUrl = 'https://github.com/ar331913-code/lcs-school-website.git';

console.log('=== Starting Fresh Clean Deployment ===');

// 1. Build project
console.log('Step 1: Building production bundle...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 2. Ensure 404.html exists in dist
const html404Src = path.resolve(rootDir, 'public/404.html');
if (fs.existsSync(html404Src)) {
  fs.copyFileSync(html404Src, path.resolve(distDir, '404.html'));
}

// 3. Deploy dist to gh-pages branch
console.log('Step 2: Deploying to gh-pages branch on GitHub...');
const runDist = (cmd) => execSync(cmd, { cwd: distDir, stdio: 'inherit' });

try {
  const gitDir = path.resolve(distDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  runDist('git init');
  runDist('git config user.name "LCS IT Academy"');
  runDist('git config user.email "admissions@lcsitacademy.com"');
  runDist('git add -A');
  runDist('git commit -m "Deploy LCS Website to GitHub Pages"');
  runDist('git branch -M gh-pages');
  runDist(`git remote add origin ${repoUrl}`);
  runDist('git push -f origin gh-pages');

  console.log('\n=============================================');
  console.log('🎉 DEPLOYMENT SUCCESSFUL!');
  console.log('Live site: https://ar331913-code.github.io/lcs-school-website/');
  console.log('=============================================');
} catch (err) {
  console.error('Deployment error:', err);
}
