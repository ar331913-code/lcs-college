const fs = require('fs');
const https = require('https');
const path = require('path');

const updatedFaculty = [
  {
    id: "fac-ceo",
    name: "Mr. Solomon Nkwntabisa",
    role: "Chief Executive Officer (CEO)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Leads the strategic vision, institutional growth, and executive leadership of LCS Computer Training College in Ghana."
  },
  {
    id: "fac-ai",
    name: "Emmanuel Boateng Boadu",
    role: "AI Tutor",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Specializes in Artificial Intelligence, machine learning principles, neural networks, and building practical AI-powered workflows."
  },
  {
    id: "fac-prog",
    name: "Abdul Rahman Adjovu",
    role: "Programming Tutor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Leads practical coding in Python, JavaScript, Java, C++, and full-stack web and software engineering projects."
  },
  {
    id: "fac-network",
    name: "Kofi Mensah Asante",
    role: "Networking & Cybersecurity Tutor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Guides students in LAN/WAN infrastructure, Cisco routing & switching, network defense, firewalls, and server management."
  },
  {
    id: "fac-creative",
    name: "Grace Ansah",
    role: "Graphic Design & Video Editing Tutor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Professional media designer training learners in Adobe Photoshop, Illustrator, Premiere Pro, and motion graphics."
  },
  {
    id: "fac-hardware",
    name: "Kwame Appiah Danquah",
    role: "Hardware Engineering & Diagnostics Tutor",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Practical hardware technician teaching computer assembly, motherboards, chip troubleshooting, and system repairs."
  }
];

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
const localData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));
localData.faculty = updatedFaculty;
localData.updatedAt = Date.now();
fs.writeFileSync(siteDataPath, JSON.stringify(localData, null, 2), 'utf8');
console.log('src/siteData.json updated with new CEO and Teachers list!');

// 2. Sync to cloud database bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      parsed.faculty = updatedFaculty;
      parsed.updatedAt = Date.now();

      const postData = JSON.stringify(parsed);
      const req = https.request(binUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (putRes) => {
        let putData = '';
        putRes.on('data', (c) => putData += c);
        putRes.on('end', () => {
          console.log('Cloud bin sync status:', putRes.statusCode);
        });
      });
      req.write(postData);
      req.end();
    } catch(e) {
      console.error(e);
    }
  });
});
