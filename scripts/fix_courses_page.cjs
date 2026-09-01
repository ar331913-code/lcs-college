const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// 1. Add useMemo and useCallback to React import
appJsx = appJsx.replace(
  /import React,\s*\{([^}]+)\}\s*from\s*['"]react['"];/,
  (match, p1) => {
    const imports = p1.split(',').map(s => s.trim()).filter(Boolean);
    if (!imports.includes('useMemo')) imports.push('useMemo');
    if (!imports.includes('useCallback')) imports.push('useCallback');
    return `import React, { ${imports.join(', ')} } from 'react';`;
  }
);

// 2. Ensure CoursesPage handles undefined/null courses robustly
appJsx = appJsx.replace(
  /function CoursesPage\(\{ courses \}\) \{/,
  'function CoursesPage({ courses = [] }) {\n  const courseList = Array.isArray(courses) && courses.length > 0 ? courses : (defaultCourses || []);'
);

appJsx = appJsx.replace(
  /return courses\.filter\(/,
  'return courseList.filter('
);

appJsx = appJsx.replace(
  /of \{courses\.length\} programs/,
  'of {courseList.length} programs'
);

appJsx = appJsx.replace(
  /\}, \[courses, searchTerm, selectedCategory\]\);/,
  '}, [courseList, searchTerm, selectedCategory]);'
);

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('Fixed useMemo import and robust course fallback in src/App.jsx!');
