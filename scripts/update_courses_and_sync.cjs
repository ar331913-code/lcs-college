const fs = require('fs');
const https = require('https');
const path = require('path');

const updatedCourses = [
  {
    id: "it-fundamentals",
    title: "Information Technology",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    text: "95% practical training in IT fundamentals, computer architecture, enterprise software, and modern digital productivity."
  },
  {
    id: "computer-networking",
    title: "Computer Networking",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    text: "Master LAN/WAN design, Cisco router & switch configuration, IP subnetting, network troubleshooting, and server cabling."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    text: "Learn threat detection, system security, ethical hacking, network defense, firewalls, and incident response."
  },
  {
    id: "programming",
    title: "Programming",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    text: "95% hands-on coding with multiple languages (Python, JavaScript, Java, C++) and modern software engineering principles."
  },
  {
    id: "database-management",
    title: "Database Management",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    text: "Master relational and NoSQL database design, SQL querying, PostgreSQL/MySQL administration, and cloud datastores."
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80",
    text: "Professional design tools (Photoshop, Illustrator, Figma) and visual communication for branding, marketing, and UI."
  },
  {
    id: "hardware-engineering",
    title: "Hardware Engineering",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80",
    text: "Hands-on training in computer hardware assembly, motherboards, chip troubleshooting, diagnostics, and repairs."
  },
  {
    id: "video-editing",
    title: "Video Editing",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    text: "Professional video editing, motion graphics, audio mastering, and color grading using Premiere Pro & After Effects."
  },
  {
    id: "microsoft-office",
    title: "Microsoft Office",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    text: "Master Advanced Excel financial models, Word documentation, PowerPoint presentations, and Access databases."
  },
  {
    id: "website-development",
    title: "Website Development",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    text: "Full-stack web development with modern HTML5/CSS3, JavaScript, React, Node.js, and live hosting deployments."
  },
  {
    id: "advanced-ai",
    title: "Advanced AI",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    text: "Artificial Intelligence, machine learning principles, neural networks, and building practical AI-powered workflows."
  }
];

// 1. Update src/siteData.json
const siteDataPath = path.resolve('src/siteData.json');
const localData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));
localData.courses = updatedCourses;
localData.updatedAt = Date.now();
fs.writeFileSync(siteDataPath, JSON.stringify(localData, null, 2), 'utf8');
console.log('src/siteData.json updated with 11 courses including Computer Networking!');

// 2. Sync to cloud database bin
const binUrl = 'https://extendsclass.com/api/json-storage/bin/bddeefd';

https.get(binUrl, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      parsed.courses = updatedCourses;
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
