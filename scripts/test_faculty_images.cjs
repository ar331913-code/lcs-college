const https = require('https');

const faculty = [
  { name: 'Mr. Solomon Nkwantabisa (CEO)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Emmanuel Boateng Boadu (AI Tutor)', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Abdul Rahman Adjovu (Programming Tutor)', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kofi Mensah Asante (Networking & Cyber)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Grace Ansah (Graphic & Video)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kwame Appiah Danquah (Hardware Engineering)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
];

faculty.forEach(({ name, url }) => {
  https.get(url, (res) => {
    console.log(`${name}: HTTP ${res.statusCode} (${res.headers['content-type']})`);
  }).on('error', (e) => console.error(name, e.message));
});
