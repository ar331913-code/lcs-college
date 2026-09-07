const fs = require('fs');
const path = require('path');

const appJsxPath = path.resolve('src/App.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

// Update AboutPage leadership section to show both CEO Mr. Solomon Nkwantabisa and Facilitator & Secretary Madam Lamiorkor Faustina
const oldLeadershipBlock = `<section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">College Leadership</p>
          <h2>Meet the leadership guiding our vision.</h2>
        </div>

        <div className="leader-grid">
          {facultyMembers.slice(0, 1).map((person) => (
            <article key={person.id || person.name} className="leader-card" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <SafeImage 
                src={person.image} 
                alt={person.name} 
                fallbackText={person.name}
              />
              <div className="leader-body">
                <h3>{person.name}</h3>
                <span>{person.role}</span>
                <p>{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {facultyMembers.length > 1 && (
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Our Teaching Faculty</p>
            <h2>Experienced instructors dedicated to hands-on practical learning.</h2>
          </div>

          <div className="teacher-grid">
            {facultyMembers.slice(1).map((person) => (`;

const newLeadershipBlock = `<section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">College Leadership & Administration</p>
          <h2>Meet the leadership guiding our institution.</h2>
        </div>

        <div className="leader-grid two-column-leaders">
          {facultyMembers.slice(0, 2).map((person) => (
            <article key={person.id || person.name} className="leader-card">
              <SafeImage 
                src={person.image} 
                alt={person.name} 
                fallbackText={person.name}
              />
              <div className="leader-body">
                <h3>{person.name}</h3>
                <span>{person.role}</span>
                <p>{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {facultyMembers.length > 2 && (
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Our Teaching Faculty</p>
            <h2>Experienced instructors dedicated to hands-on practical learning.</h2>
          </div>

          <div className="teacher-grid">
            {facultyMembers.slice(2).map((person) => (` ;

appJsx = appJsx.replace(oldLeadershipBlock, newLeadershipBlock);
fs.writeFileSync(appJsxPath, appJsx, 'utf8');
console.log('1. Updated AboutPage leadership structure in src/App.jsx');

// Update CSS for two-column leadership layout
const cssPath = path.resolve('src/App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const leadershipGridCss = `
/* =========================================================================
   TWO-COLUMN LEADERSHIP GRID (CEO & MADAM FAUSTINA)
   ========================================================================= */

.two-column-leaders {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
  gap: 24px !important;
  width: 100% !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
}

.two-column-leaders .leader-card {
  max-width: 100% !important;
  margin: 0 !important;
}

@media (max-width: 768px) {
  .two-column-leaders {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
}
`;

css += '\n' + leadershipGridCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated src/App.css with two-column leadership styling');
