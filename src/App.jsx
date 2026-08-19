import {
  IconGraduationCap,
  IconMapPin,
  IconClock,
  IconNavigation,
  IconPhone,
  IconMail,
  IconCheckCircle,
  IconArrowRight,
  IconImage,
  IconBookOpen,
  IconUsers,
  IconCamera,
  IconTag,
  IconBarChart,
  IconSettings,
  IconRefresh,
  IconDownload,
  IconSave,
  IconTrash,
  IconUpload,
  IconPlus,
  IconVideo,
  IconMonitor,
  IconLightbulb,
  IconWhatsApp
} from './components/Icons';
import { HashRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const VISITOR_LOG_KEY = 'lcs_visitor_logs';
const SITE_DATA_KEY = 'lcs_site_data';
const DATA_VERSION = 'v5_interactive_map';
const DATA_VERSION_KEY = 'lcs_site_version';

const whatsappNumber = '233242070679';
const whatsappMessage = encodeURIComponent(
  'Hello LCS IT Academy, I would like to learn more about your training programs.'
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Requirements', path: '/requirements' },
  { label: 'Contact', path: '/contact' },
];

const defaultAdmin = {
  email: 'admin@lcsitacademy.com',
  password: 'admin123',
};

const defaultCourses = [
  {
    id: 'it-fundamentals',
    title: 'Information Technology',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    text: '95% practical training in IT fundamentals, computer architecture, enterprise systems, and networking solutions.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    text: 'Learn threat detection, system security, ethical hacking, network defense, and practical incident response.',
  },
  {
    id: 'programming',
    title: 'Programming',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    text: '95% hands-on coding with multiple languages (Python, JavaScript, Java, C++) and modern development frameworks.',
  },
  {
    id: 'database-management',
    title: 'Database Management',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    text: 'Master relational and NoSQL database design, SQL querying, PostgreSQL/MySQL administration, and cloud storage.',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    text: 'Professional design tools (Photoshop, Illustrator, Figma) and visual communication for branding and UI.',
  },
  {
    id: 'hardware-engineering',
    title: 'Hardware Engineering',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80',
    text: 'Hands-on training in computer hardware assembly, motherboards, chip troubleshooting, diagnostics, and repairs.',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    text: 'Professional video editing, motion graphics, audio mastering, and color grading using Premiere Pro & After Effects.',
  },
  {
    id: 'microsoft-office',
    title: 'Microsoft Office',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
    text: 'Master Advanced Excel, Word documentation, PowerPoint presentations, and Access databases for office productivity.',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    text: 'Full-stack web development with modern HTML/CSS, JavaScript, React, Node.js, and real live client deployments.',
  },
  {
    id: 'advanced-ai',
    title: 'Advanced AI',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    text: 'Artificial Intelligence, machine learning principles, neural networks, and building practical AI-powered workflows.',
  },
];

const defaultFaculty = [
  {
    id: 'fac-1',
    name: 'Engr. Daniel Okafor',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Leads the academy vision with a focus on innovation, digital skills, and future-ready learning.',
  },
  {
    id: 'fac-2',
    name: 'Mrs. Grace Thompson',
    role: 'Head of Training',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Coordinates academic excellence, trainer quality, and practical learning outcomes for every cohort.',
  },
  {
    id: 'fac-3',
    name: 'Mr. Peter Adeyemi',
    role: 'Frontend Mentor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Mentors students in frontend design, JavaScript, and modern UI development best practices.',
  },
  {
    id: 'fac-4',
    name: 'Mrs. Linda Mba',
    role: 'Student Success Lead',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: 'Guides learners through onboarding, support, and career development from enrollment to placement.',
  },
];

const defaultSiteData = {
  logo: 'LCS',
  logoImage: null,
  heroBadgeText: 'Admissions Open for 2026/2027 • Regular & Weekend Sessions',
  heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  communityImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  aboutIntroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  aboutVideo: 'https://www.youtube.com/watch?v=lQx5NQ3Wq8w',
  mapAddress: 'Inside Happy Home Tiles Building, Near Metro Mass Transport, Koforidua, Ghana',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Metro%20Mass%20Transit%2C%20Koforidua%2C%20Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Metro+Mass+Transit+Koforidua+Ghana',
  promoTitle: '95% Practical Training',
  promoText: 'Flexible schedules with regular and weekend sessions. Hostel facilities available.',
  courses: defaultCourses,
  faculty: defaultFaculty,
  gallery: [
    {
      title: 'Modern Coding Lab',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Hardware & Tech Studio',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Mentor Collaboration',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    },
  ],
};


// Client-side image compressor: converts large (5MB-20MB) camera photos to lightweight (<100KB) WebP/JPEG
const compressImageFile = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Pass SVGs directly without compression
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read SVG file'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional aspect ratio resize
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(event.target.result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        // Fallback to raw data url if canvas fails
        resolve(event.target.result);
      };

      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};

// Safe localStorage setter that will never throw unhandled QuotaExceededError
const safeSetStorage = (key, value) => {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.warn(`Storage full or restricted for key ${key}:`, err);
    return false;
  }
};

const getStoredValue = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

const getMergedSiteData = () => {
  try {
    const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
    const saved = localStorage.getItem(SITE_DATA_KEY);

    // If version changed or no saved data, clean update to default
    if (storedVersion !== DATA_VERSION || !saved) {
      safeSetStorage(DATA_VERSION_KEY, DATA_VERSION);
      safeSetStorage(SITE_DATA_KEY, defaultSiteData);
      return defaultSiteData;
    }

    const parsed = JSON.parse(saved);

    // Sanitize any broken legacy URLs from user's cache
    const sanitizedCourses = (Array.isArray(parsed.courses) ? parsed.courses : defaultCourses).map((c) => {
      if (c.title === 'Information Technology') {
        return { ...c, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' };
      }
      if (c.title === 'Microsoft Office' && (!c.image || c.image.includes('1460925895917'))) {
        return { ...c, image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80' };
      }
      if (c.title === 'Advanced AI') {
        return { ...c, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80' };
      }
      return c;
    });

    return {
      ...defaultSiteData,
      ...parsed,
      courses: sanitizedCourses,
      faculty: Array.isArray(parsed.faculty) && parsed.faculty.length > 0 ? parsed.faculty : defaultFaculty,
      gallery: Array.isArray(parsed.gallery) && parsed.gallery.length > 0 ? parsed.gallery : defaultSiteData.gallery,
    };
  } catch {
    return defaultSiteData;
  }
};

const getClientIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('Could not fetch IP');
    }
    const data = await response.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
};

const formatDuration = (durationMs) => {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

const stats = [
  { value: '95%', label: 'Practical training focus' },
  { value: '10+', label: 'Professional courses' },
  { value: 'Accredited', label: 'Ghana Education Service' },
  { value: 'Flexible', label: 'Regular & Weekend sessions' },
];

const strengths = [
  {
    title: '95% Practical Training',
    text: 'Hands-on experience with real-world projects and industry-standard tools for every course.',
  },
  {
    title: 'Flexible Learning',
    text: 'Choose from regular weekday sessions or weekend classes that fit your schedule. Hostel facilities available.',
  },
  {
    title: 'Government Accredited',
    text: 'Accredited by Ghana Education Service with comprehensive professional IT curriculum.',
  },
];

const requirements = [
  'Completed enrollment form',
  'Valid identification (National ID, Passport, or Student ID)',
  'Passport photograph',
  'Preferred course of interest',
  'Contact information for communication',
  'Parent/guardian details if applicant is under 18',
];

const faqs = [
  {
    question: 'What makes LCS Computer Training College unique?',
    answer: 'We focus on 95% practical training with hands-on experience. All courses are accredited by Ghana Education Service with flexible regular and weekend sessions.',
  },
  {
    question: 'Are there flexible schedules?',
    answer: 'Yes! We offer both regular weekday sessions and weekend classes. Hostel facilities are available for students who need accommodation.',
  },
  {
    question: 'What courses are available?',
    answer: 'We offer 10+ professional courses: Information Technology, Cybersecurity, Programming, Database Management, Graphic Design, Hardware Engineering, Video Editing, Microsoft Office, Website Development, and Advanced AI.',
  },
];

const testimonials = [
  {
    quote: 'I started with zero tech experience, and the structured training helped me land my first front-end role.',
    author: 'Emmanuel O.',
  },
  {
    quote: 'The practical projects and mentorship made the difference. I gained real confidence and job-ready skills.',
    author: 'Faith A.',
  },
  {
    quote: 'The trainers are knowledgeable, supportive, and focused on outcomes. It felt like a real tech career launchpad.',
    author: 'David C.',
  },
];


// Helper to parse and convert any video link (YouTube standard, shorts, Vimeo, mp4, or uploaded video)
const formatVideoEmbedUrl = (url) => {
  if (!url) return { type: 'empty', url: '' };
  const trimmed = String(url).trim();

  // If it's a base64 or blob data URL, or direct video file
  if (trimmed.startsWith('data:video') || trimmed.startsWith('blob:') || trimmed.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
    return { type: 'html5', url: trimmed };
  }

  // YouTube match: standard watch?v=, youtu.be/, embed/, or shorts/
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return { type: 'iframe', url: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1` };
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return { type: 'iframe', url: `https://player.vimeo.com/video/${vimeoMatch[3]}` };
  }

  // If already an embed link
  if (trimmed.includes('embed') || trimmed.includes('player.')) {
    return { type: 'iframe', url: trimmed };
  }

  return { type: 'html5', url: trimmed };
};

// Safe universal video player
function SafeVideoPlayer({ videoSource, title = 'LCS Video', poster = '' }) {
  const videoData = formatVideoEmbedUrl(videoSource);

  if (!videoSource || videoData.type === 'empty') {
    return (
      <div className="video-empty-state">
        <IconVideo size={42} className="video-empty-svg-icon" />
        <h4>No video currently set</h4>
        <p>You can paste any YouTube / Vimeo URL or upload an MP4 video in the Admin Dashboard.</p>
      </div>
    );
  }

  if (videoData.type === 'iframe') {
    return (
      <div className="video-responsive-wrap">
        <iframe
          src={videoData.url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-responsive-wrap">
      <video
        controls
        playsInline
        poster={poster}
        src={videoData.url}
        className="html5-video-player"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}


// Interactive functioning Google Map section
function CampusMapSection({ siteData, showHeader = true }) {
  const address = siteData?.mapAddress || 'Inside Happy Home Tiles Building, Near Metro Mass Transport, Koforidua, Ghana';
  const embedUrl = siteData?.mapEmbedUrl || 'https://maps.google.com/maps?q=Metro%20Mass%20Transit%2C%20Koforidua%2C%20Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed';
  const directionsUrl = siteData?.mapDirectionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=Metro+Mass+Transit+Koforidua+Ghana';

  return (
    <section className="content-section map-section">
      {showHeader && (
        <div className="section-heading">
          <p className="eyebrow">Campus Location</p>
          <h2>Find us in Koforidua</h2>
          <p className="lead" style={{ margin: '10px auto 0', color: 'rgba(42, 23, 29, 0.8)' }}>
            Conveniently located near Metro Mass Transport in the Happy Home Tiles Building.
          </p>
        </div>
      )}

      <div className="map-container-card">
        <div className="map-iframe-wrap">
          <iframe
            title="LCS Computer Training College Location Map"
            src={embedUrl}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="map-info-overlay">
          <div className="map-info-item">
            <span className="map-icon"><IconMapPin size={22} /></span>
            <div>
              <strong>Campus Address</strong>
              <p>{address}</p>
            </div>
          </div>

          <div className="map-info-item">
            <span className="map-icon"><IconClock size={22} /></span>
            <div>
              <strong>Opening Hours</strong>
              <p>Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 3:00 PM</p>
            </div>
          </div>

          <div className="map-info-actions">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-small btn-with-icon"
            >
              <IconNavigation size={16} />
              <span>Get Directions</span>
            </a>
            <a
              href="tel:0242070679"
              className="btn btn-secondary btn-small btn-with-icon"
            >
              <IconPhone size={16} />
              <span>Call 024 207 0679</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced SafeImage component with automatic retry & fallback
function SafeImage({ src, alt, className = '', fallbackText = 'Course Image', style = {} }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    // If it was an AI or IT image that failed, fallback to a reliable tech image
    if (alt?.toLowerCase().includes('ai') || alt?.toLowerCase().includes('intelligence')) {
      setCurrentSrc('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80');
    } else if (alt?.toLowerCase().includes('information') || alt?.toLowerCase().includes('it')) {
      setCurrentSrc('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80');
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`fallback-image-box ${className}`} style={style} role="img" aria-label={alt || fallbackText}>
        <div className="fallback-content">
          <IconMonitor size={36} className="fallback-svg-icon" />
          <span className="fallback-title">{alt || fallbackText}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || fallbackText}
      className={className}
      style={style}
      loading="lazy"
      onError={handleImageError}
    />
  );
}


// Top-level ErrorBoundary to prevent blank white screens
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem(SITE_DATA_KEY);
    localStorage.removeItem(DATA_VERSION_KEY);
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fcf8f9',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '520px',
            background: '#ffffff',
            padding: '36px',
            borderRadius: '24px',
            boxShadow: '0 20px 45px rgba(125,29,50,0.12)',
            border: '1px solid rgba(125,29,50,0.15)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#7d1d32', margin: '0 0 12px' }}>Something went wrong</h2>
            <p style={{ color: '#553e44', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px' }}>
              A storage or rendering issue occurred. Click below to restore default settings and recover the site.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: '1px solid #7d1d32',
                  background: '#ffffff',
                  color: '#7d1d32',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  background: '#7d1d32',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <SiteLayout />
      </HashRouter>
    </ErrorBoundary>
  );
}

function SiteLayout() {
  const [siteData, setSiteData] = useState(getMergedSiteData);
  const [visitorLogs, setVisitorLogs] = useState(() => getStoredValue(VISITOR_LOG_KEY, []));
  const [isAdmin, setIsAdmin] = useState(() => getStoredValue('lcs_admin_session', false));
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    safeSetStorage(SITE_DATA_KEY, siteData);
    safeSetStorage(DATA_VERSION_KEY, DATA_VERSION);
  }, [siteData]);

  useEffect(() => {
    safeSetStorage('lcs_admin_session', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    safeSetStorage(VISITOR_LOG_KEY, visitorLogs);
  }, [visitorLogs]);

  useEffect(() => {
    const startTime = Date.now();
    const sessionId = `visit-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const recordVisit = async () => {
      const ipAddress = await getClientIp();
      const visitEntry = {
        sessionId,
        ipAddress,
        path: window.location.pathname,
        enteredAt: new Date().toISOString(),
        durationMs: 0,
        endedAt: null,
      };

      const nextLogs = [...getStoredValue(VISITOR_LOG_KEY, []), visitEntry];
      setVisitorLogs(nextLogs);
    };

    const finalizeVisit = () => {
      const currentLogs = getStoredValue(VISITOR_LOG_KEY, []);
      const nextLogs = currentLogs.map((log) =>
        log.sessionId === sessionId
          ? {
              ...log,
              durationMs: Math.max(log.durationMs, Date.now() - startTime),
              endedAt: new Date().toISOString(),
            }
          : log
      );

      setVisitorLogs(nextLogs);
    };

    recordVisit();
    window.addEventListener('beforeunload', finalizeVisit);

    return () => {
      finalizeVisit();
      window.removeEventListener('beforeunload', finalizeVisit);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const keyPressed = event.key?.toLowerCase?.() ?? '';
      if (event.shiftKey && keyPressed === 'a') {
        setShowAdminPortal(true);
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [navigate]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (loginForm.email === defaultAdmin.email && loginForm.password === defaultAdmin.password) {
      setIsAdmin(true);
      setStatus('Admin access granted.');
      setShowAdminPortal(true);
      navigate('/admin');
      return;
    }

    setStatus('Invalid admin credentials.');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPortal(false);
    setLoginForm({ email: '', password: '' });
    setStatus('Logged out successfully.');
    navigate('/');
  };

  // Maintain admin session while tab is open

  const handleSaveSiteData = (nextData) => {
    setSiteData(nextData);
    setStatus('Website data & images updated successfully.');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all images, courses, and site data back to defaults?')) {
      setSiteData(defaultSiteData);
      localStorage.setItem(SITE_DATA_KEY, JSON.stringify(defaultSiteData));
      localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
      setStatus('All images and courses restored to default settings.');
    }
  };

  const allowAdminPanel = showAdminPortal || isAdmin;

  return (
    <div className="site-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          {siteData.logoImage ? (
            <img src={siteData.logoImage} alt="Logo" className="brand-logo-image" />
          ) : (
            <span className="brand-mark">{siteData.logo || 'LCS'}</span>
          )}
          <div>
            <span className="brand-name">LCS COMPUTER TRAINING COLLEGE</span>
            <small>Learn. Build. Launch.</small>
          </div>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {allowAdminPanel && (
            <button type="button" className="logout-btn" onClick={handleLogout}>
              {isAdmin ? 'Logout' : 'Close Portal'}
            </button>
          )}
          {!isAdmin && <NavLink to="/contact" className="btn btn-primary btn-small">Apply Now</NavLink>}
        </div>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage siteData={siteData} />} />
          <Route path="/about" element={<AboutPage siteData={siteData} />} />
          <Route path="/courses" element={<CoursesPage courses={siteData.courses || defaultCourses} />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminPanel
                  siteData={siteData}
                  visitorLogs={visitorLogs}
                  onSave={handleSaveSiteData}
                  onResetDefaults={handleResetToDefaults}
                  status={status}
                  setStatus={setStatus}
                  onLogout={handleLogout}
                />
              ) : (
                <AdminLoginPage
                  loginForm={loginForm}
                  setLoginForm={setLoginForm}
                  handleLogin={handleLogin}
                  status={status}
                />
              )
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div>
          <span className="brand-name footer-brand">LCS COMPUTER TRAINING COLLEGE</span>
          <p>Training the next generation of digital professionals in Ghana.</p>
        </div>

        <div className="footer-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/requirements">Requirements</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/admin" className="admin-link-discrete">Admin Portal</NavLink>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappLink} target="_blank" rel="noreferrer" title="Chat with admissions on WhatsApp">
        <IconWhatsApp size={20} />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}

function HomePage({ siteData }) {
  const displayCourses = siteData.courses || defaultCourses;

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <IconGraduationCap size={16} className="hero-badge-icon" />
            <span>{(siteData.heroBadgeText || 'Admissions Open for 2026/2027 • Regular & Weekend Sessions').replace(/^🎓\s*/, '')}</span>
          </div>
          <p className="eyebrow">Accredited by Ghana Education Service</p>
          <h1>LCS Computer Training College</h1>
          <p className="lead">
            Professional IT training with 95% practical focus. Master Information Technology, Cybersecurity,
            Programming, Database Management, Graphic Design, Hardware Engineering, Video Editing, 
            Microsoft Office, Website Development, and Advanced AI.
          </p>

          <div className="button-row">
            <NavLink to="/courses" className="btn btn-primary">
              Explore programs
            </NavLink>
            <NavLink to="/contact" className="btn btn-secondary">
              Apply online →
            </NavLink>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <SafeImage 
              src={siteData.heroImage} 
              alt="Students learning together at LCS"
              fallbackText="LCS Computer Training College"
            />
          </div>

          <div className="floating-badge">
            <span>{siteData.promoTitle || '95% Practical'}</span>
            <strong>Training</strong>
            <p>{siteData.promoText || 'Flexible schedules with regular and weekend sessions.'}</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Why choose us</p>
          <h2>Training that prepares students for the real tech world.</h2>
        </div>

        <div className="feature-grid">
          {strengths.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div className="split-image-wrap">
          <SafeImage
            src={siteData.communityImage || defaultSiteData.communityImage}
            alt="Students learning in a modern IT environment"
            fallbackText="Vibrant Tech Learning Community"
          />
        </div>

        <div className="split-copy">
          <p className="eyebrow">A vibrant learning community</p>
          <h2>Students learn by building, solving, and practicing real digital skills.</h2>
          <p>
            We combine technical training, project-based learning, and practical mentorship to help each
            learner understand the tools, workflows, and confidence needed to thrive in today's digital careers.
          </p>
          <ul className="check-list">
            <li>Experienced trainers and industry mentors</li>
            <li>Project-based and 95% practical hands-on labs</li>
            <li>Hostel facilities and career-focused growth support</li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Popular study paths</p>
          <h2>Programs designed for real-world careers in tech.</h2>
        </div>

        <div className="course-grid">
          {displayCourses.slice(0, 3).map((course) => (
            <article key={course.id || course.title} className="course-card">
              <SafeImage 
                src={course.image} 
                alt={course.title}
                className="course-thumbnail"
                fallbackText={course.title}
              />
              <div className="course-body">
                <span className="course-duration">{course.duration || 'Flexible'}</span>
                <h3>{course.title}</h3>
                <p>{course.text}</p>
                <NavLink to="/contact" className="course-link"><span>Enroll in this course</span> <IconArrowRight size={15} /></NavLink>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <NavLink to="/courses" className="btn btn-secondary">
            View all {displayCourses.length} courses →
          </NavLink>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Gallery</p>
          <h2>Campus life and learning experiences.</h2>
        </div>

        <div className="gallery-grid">
          {(siteData.gallery || defaultSiteData.gallery).map((item, idx) => (
            <article key={item.title + idx} className="gallery-card">
              <SafeImage 
                src={item.image} 
                alt={item.title}
                fallbackText={item.title}
              />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <CampusMapSection siteData={siteData} showHeader={true} />

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Student feedback</p>
          <h2>Trusted by learners building careers in tech.</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="testimonial-card">
              <p>“{item.quote}”</p>
              <footer>{item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage({ siteData }) {
  const facultyMembers = siteData.faculty || defaultFaculty;

  return (
    <>
      <section className="page-hero compact">
        <div>
          <p className="eyebrow">About LCS Computer Training College</p>
          <h1>Accredited by Ghana Education Service</h1>
        </div>
      </section>

      <section className="about-intro split-section">
        <div className="split-image-wrap">
          <SafeImage
            src={siteData.aboutIntroImage || defaultSiteData.aboutIntroImage}
            alt="School leadership and students"
            fallbackText="About LCS Computer College"
          />
        </div>

        <div className="split-copy">
          <p className="eyebrow">Our Mission</p>
          <h2>95% Practical Training for Professional IT Skills</h2>
          <p>
            LCS Computer Training College is accredited by Ghana Education Service and dedicated to providing
            professional IT training with a 95% practical focus. We offer both regular weekday and weekend sessions
            with flexible scheduling to accommodate all learners.
          </p>
          <p>
            Our comprehensive curriculum covers 10+ professional courses including Information Technology, 
            Cybersecurity, Programming, Database Management, Graphic Design, Hardware Engineering, Video Editing,
            Microsoft Office, Website Development, and Advanced AI. Hostel facilities are available for students.
          </p>
        </div>
      </section>

      <section className="content-section video-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Our Training Approach</p>
          <h2>Learn from experts with hands-on, real-world projects.</h2>
        </div>

        <div className="video-card">
          <SafeVideoPlayer videoSource={siteData.aboutVideo} title="LCS Computer Training College Introduction" />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Leadership</p>
          <h2>Meet the people guiding our vision.</h2>
        </div>

        <div className="leader-grid">
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
            <p className="eyebrow">Our teaching team</p>
            <h2>Experienced staff supporting every learner.</h2>
          </div>

          <div className="teacher-grid">
            {facultyMembers.slice(2).map((person) => (
              <article key={person.id || person.name} className="teacher-card">
                <SafeImage 
                  src={person.image} 
                  alt={person.name} 
                  fallbackText={person.name}
                />
                <div>
                  <h3>{person.name}</h3>
                  <span>{person.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function CoursesPage({ courses }) {
  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Our courses</p>
          <h1>Career-ready IT programs built for today's digital economy.</h1>
          <p className="lead" style={{ margin: '14px auto 0', color: 'rgba(42, 23, 29, 0.85)' }}>
            All courses feature 95% practical laboratory training, certified instructors, and flexible regular or weekend sessions.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="course-grid full-width">
          {courses.map((course) => (
            <article key={course.id || course.title} className="course-card large-card">
              <SafeImage 
                src={course.image} 
                alt={course.title}
                className="course-thumbnail"
                fallbackText={course.title}
              />
              <div className="course-body">
                <span className="course-duration">{course.duration || 'Flexible Sessions'}</span>
                <h3>{course.title}</h3>
                <p>{course.text}</p>
                <div className="course-actions">
                  <NavLink to="/contact" className="btn btn-primary btn-small">
                    Enroll Now
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function RequirementsPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Admission requirements</p>
          <h1>Simple steps to join the LCS IT Academy.</h1>
        </div>
      </section>

      <section className="content-section requirements-layout">
        <div className="requirements-panel">
          <h3>Required documents</h3>
          <ul className="requirement-list">
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="requirements-panel">
          <h3>Application process</h3>
          <ol className="steps-list">
            <li>Submit your application form online or in person.</li>
            <li>Complete a short consultation and course orientation.</li>
            <li>Select your preferred schedule (Regular or Weekend).</li>
            <li>Complete registration and begin practical hands-on classes.</li>
          </ol>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Common questions</p>
          <h2>Everything applicants and parents need to know.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <article key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.fullName || !formData.message) {
      alert('Please fill in Name, Email, and Message fields.');
      return;
    }

    // Send email via mailto
    const mailtoLink = `mailto:admissions@lcsitacademy.com?subject=Course Inquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourse: ${formData.course}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;

    // Send WhatsApp message
    const whatsappText = encodeURIComponent(
      `Hello LCS IT Academy,\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourse of Interest: ${formData.course}\n\nMessage: ${formData.message}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/233242070679?text=${whatsappText}`, '_blank');
    }, 500);

    setSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', course: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1>Speak with our admissions team & start your IT journey.</h1>
        </div>
      </section>

      <section className="contact-layout content-section">
        <div className="contact-card">
          <h3>Send us an inquiry</h3>
          {submitted && (
            <p className="form-success">
              <IconCheckCircle size={18} /> Your message has been prepared for email and WhatsApp!
            </p>
          )}
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="input-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (e.g. 024 207 0679)"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="course"
                placeholder="Course of interest"
                value={formData.course}
                onChange={handleInputChange}
              />
            </div>
            <textarea
              rows="5"
              name="message"
              placeholder="Your inquiry or questions about courses, schedules, or hostel facilities..."
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn btn-primary">
              Send inquiry
            </button>
            <small>This will connect you directly with our admissions office via email & WhatsApp.</small>
          </form>
        </div>

        <aside className="info-card">
          <h3>Academy Information</h3>
          <div className="contact-info-list">
            <div className="contact-info-row">
              <IconMapPin size={20} className="contact-info-icon" />
              <div>
                <strong>Location</strong>
                <p>Koforidua, Inside Happy Home Tiles Building<br />Near Metro Mass Transport, Ghana</p>
              </div>
            </div>
            <div className="contact-info-row">
              <IconPhone size={20} className="contact-info-icon" />
              <div>
                <strong>Phone Lines</strong>
                <p><a href="tel:0242070679">024 207 0679</a> / <a href="tel:0549480902">0549 480 902</a></p>
              </div>
            </div>
            <div className="contact-info-row">
              <IconMail size={20} className="contact-info-icon" />
              <div>
                <strong>Email Address</strong>
                <p><a href="mailto:admissions@lcsitacademy.com">admissions@lcsitacademy.com</a></p>
              </div>
            </div>
            <div className="contact-info-row">
              <IconClock size={20} className="contact-info-icon" />
              <div>
                <strong>Working Hours</strong>
                <p>Mon - Fri: 8:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 3:00 PM</p>
              </div>
            </div>
          </div>
          <a className="btn btn-primary whatsapp-button btn-with-icon" href={whatsappLink} target="_blank" rel="noreferrer">
            <IconWhatsApp size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </aside>
      </section>

      <CampusMapSection siteData={siteData} showHeader={false} />
    </>
  );
}

function AdminLoginPage({ loginForm, setLoginForm, handleLogin, status }) {
  return (
    <section className="content-section admin-wrapper">
      <div className="admin-card login-card">
        <p className="eyebrow">Restricted access</p>
        <h2>Administrator login</h2>
        <form className="admin-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={loginForm.email}
              onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
              placeholder="admin@lcsitacademy.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={loginForm.password}
              onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
              placeholder="Enter admin password"
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Access dashboard
          </button>
        </form>
        {status && <p className="admin-status">{status}</p>}
      </div>
    </section>
  );
}

function AdminPanel({ siteData, visitorLogs, onSave, onResetDefaults, status, setStatus, onLogout }) {
  const [activeTab, setActiveTab] = useState('siteImages');
  
  // Local forms state
  const [brandingForm, setBrandingForm] = useState({
    logo: siteData.logo || 'LCS',
    logoImage: siteData.logoImage || '',
    heroBadgeText: siteData.heroBadgeText || defaultSiteData.heroBadgeText,
    promoTitle: siteData.promoTitle || defaultSiteData.promoTitle,
    promoText: siteData.promoText || defaultSiteData.promoText,
    mapAddress: siteData.mapAddress || defaultSiteData.mapAddress,
    mapEmbedUrl: siteData.mapEmbedUrl || defaultSiteData.mapEmbedUrl,
  });

  const [mediaForm, setMediaForm] = useState({
    logoImage: siteData.logoImage || '',
    heroImage: siteData.heroImage || defaultSiteData.heroImage,
    communityImage: siteData.communityImage || defaultSiteData.communityImage,
    aboutIntroImage: siteData.aboutIntroImage || defaultSiteData.aboutIntroImage,
    aboutVideo: siteData.aboutVideo || defaultSiteData.aboutVideo,
  });

  const [coursesList, setCoursesList] = useState(siteData.courses || defaultCourses);
  const [facultyList, setFacultyList] = useState(siteData.faculty || defaultFaculty);
  const [galleryItems, setGalleryItems] = useState(siteData.gallery || defaultSiteData.gallery);

  useEffect(() => {
    setBrandingForm({
      logo: siteData.logo || 'LCS',
      logoImage: siteData.logoImage || '',
      heroBadgeText: siteData.heroBadgeText || defaultSiteData.heroBadgeText,
      promoTitle: siteData.promoTitle || defaultSiteData.promoTitle,
      promoText: siteData.promoText || defaultSiteData.promoText,
      mapAddress: siteData.mapAddress || defaultSiteData.mapAddress,
      mapEmbedUrl: siteData.mapEmbedUrl || defaultSiteData.mapEmbedUrl,
    });
    setMediaForm({
      logoImage: siteData.logoImage || '',
      heroImage: siteData.heroImage || defaultSiteData.heroImage,
      communityImage: siteData.communityImage || defaultSiteData.communityImage,
      aboutIntroImage: siteData.aboutIntroImage || defaultSiteData.aboutIntroImage,
      aboutVideo: siteData.aboutVideo || defaultSiteData.aboutVideo,
    });
    setCoursesList(siteData.courses || defaultCourses);
    setFacultyList(siteData.faculty || defaultFaculty);
    setGalleryItems(siteData.gallery || defaultSiteData.gallery);
  }, [siteData]);

  // Handle local image file upload with automatic compression (<100KB)
  const handleLocalImageUpload = async (file, onDone, maxWidth = 1200, maxHeight = 1200) => {
    if (!file) return;
    try {
      setStatus('Optimizing and uploading image...');
      const compressedDataUrl = await compressImageFile(file, maxWidth, maxHeight);
      onDone(compressedDataUrl);
      setStatus('Image uploaded and optimized successfully! Click "Save" to apply.');
    } catch (err) {
      console.error('Image compression error:', err);
      setStatus('Image upload failed. Please try another image or check file format.');
    }
  };

  // 1. Save Site Images & Banners
  const handleMediaSubmit = (event) => {
    event.preventDefault();
    try {
      onSave({
        ...siteData,
        ...mediaForm,
        logoImage: mediaForm.logoImage || null,
      });
      setStatus('Hero & site banners saved successfully!');
    } catch (err) {
      setStatus('Error saving media. Please try again.');
    }
  };

  // 2. Save Branding & Announcement
  const handleBrandingSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...siteData,
      logo: brandingForm.logo || 'LCS',
      heroBadgeText: brandingForm.heroBadgeText,
      promoTitle: brandingForm.promoTitle,
      promoText: brandingForm.promoText,
      mapAddress: brandingForm.mapAddress || defaultSiteData.mapAddress,
      mapEmbedUrl: brandingForm.mapEmbedUrl || defaultSiteData.mapEmbedUrl,
    });
  };

  // 3. Courses Management
  const handleCourseFieldChange = (index, field, value) => {
    setCoursesList((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const handleAddCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: 'New IT Course',
      duration: 'Flexible',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      text: 'Practical hands-on training curriculum.',
    };
    setCoursesList((prev) => [newCourse, ...prev]);
  };

  const handleRemoveCourse = (index) => {
    if (window.confirm(`Are you sure you want to remove "${coursesList[index]?.title}"?`)) {
      setCoursesList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSaveCourses = (event) => {
    event.preventDefault();
    onSave({
      ...siteData,
      courses: coursesList,
    });
  };

  // 4. Faculty Management
  const handleFacultyFieldChange = (index, field, value) => {
    setFacultyList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  const handleAddFaculty = () => {
    const newPerson = {
      id: `fac-${Date.now()}`,
      name: 'New Faculty Member',
      role: 'Instructor / Mentor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bio: 'Professional IT instructor focused on hands-on practical learning.',
    };
    setFacultyList((prev) => [...prev, newPerson]);
  };

  const handleRemoveFaculty = (index) => {
    if (window.confirm(`Are you sure you want to remove "${facultyList[index]?.name}"?`)) {
      setFacultyList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSaveFaculty = (event) => {
    event.preventDefault();
    onSave({
      ...siteData,
      faculty: facultyList,
    });
  };

  // 5. Gallery Management
  const handleGalleryChange = (index, field, value) => {
    setGalleryItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddGalleryItem = () => {
    setGalleryItems((prev) => [
      ...prev,
      {
        title: `Campus Activity ${prev.length + 1}`,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
    ]);
  };

  const handleRemoveGalleryItem = (index) => {
    setGalleryItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveGallery = (event) => {
    event.preventDefault();
    const cleaned = galleryItems.filter((g) => g.image || g.title);
    onSave({
      ...siteData,
      gallery: cleaned.length ? cleaned : defaultSiteData.gallery,
    });
  };

  return (
    <section className="content-section admin-wrapper">
      <div className="admin-card admin-panel">
        <div className="admin-shell">
          <aside className="admin-sidebar">
            <div className="admin-header">
              <div>
                <p className="eyebrow">Protected area</p>
                <h2>Admin Control Center</h2>
              </div>
            </div>

            <div className="admin-tabs" aria-label="Admin dashboard sections">
              <button
                type="button"
                className={activeTab === 'siteImages' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('siteImages')}
              >
                <IconImage size={18} />
                <span>Site Banners & Media</span>
              </button>
              <button
                type="button"
                className={activeTab === 'courses' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('courses')}
              >
                <IconBookOpen size={18} />
                <span>Courses ({coursesList.length})</span>
              </button>
              <button
                type="button"
                className={activeTab === 'faculty' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('faculty')}
              >
                <IconUsers size={18} />
                <span>Faculty ({facultyList.length})</span>
              </button>
              <button
                type="button"
                className={activeTab === 'gallery' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('gallery')}
              >
                <IconCamera size={18} />
                <span>Campus Gallery ({galleryItems.length})</span>
              </button>
              <button
                type="button"
                className={activeTab === 'branding' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('branding')}
              >
                <IconTag size={18} />
                <span>Branding & Text</span>
              </button>
              <button
                type="button"
                className={activeTab === 'visitors' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('visitors')}
              >
                <IconBarChart size={18} />
                <span>Visitor Traffic</span>
              </button>
              <button
                type="button"
                className={activeTab === 'backup' ? 'admin-tab active' : 'admin-tab'}
                onClick={() => setActiveTab('backup')}
              >
                <IconSettings size={18} />
                <span>Reset & Backup</span>
              </button>
            </div>
          </aside>

          <div className="admin-main">
            {/* TAB 1: SITE BANNERS & MEDIA */}
            {activeTab === 'siteImages' && (
              <form className="admin-form" onSubmit={handleMediaSubmit}>
                <div className="admin-tab-header">
                  <h3>Website Banners & Key Media</h3>
                  <p>Change every background and header image. You can paste an online URL or upload a photo directly from your device.</p>
                </div>

                <div className="admin-grid-cards">
                  {/* Hero Image */}
                  <div className="admin-media-card">
                    <div className="admin-media-preview">
                      <SafeImage src={mediaForm.heroImage} alt="Hero Banner Preview" />
                    </div>
                    <div className="admin-media-fields">
                      <label><strong>Homepage Hero Image</strong></label>
                      <input
                        type="url"
                        value={mediaForm.heroImage}
                        onChange={(e) => setMediaForm({ ...mediaForm, heroImage: e.target.value })}
                        placeholder="Paste image URL..."
                      />
                      <div className="admin-file-upload-row">
                        <small>Or upload from computer:</small>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => setMediaForm((prev) => ({ ...prev, heroImage: url })), 1600, 1000)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Community Split Image */}
                  <div className="admin-media-card">
                    <div className="admin-media-preview">
                      <SafeImage src={mediaForm.communityImage} alt="Community Image Preview" />
                    </div>
                    <div className="admin-media-fields">
                      <label><strong>Homepage Community Banner</strong></label>
                      <input
                        type="url"
                        value={mediaForm.communityImage}
                        onChange={(e) => setMediaForm({ ...mediaForm, communityImage: e.target.value })}
                        placeholder="Paste image URL..."
                      />
                      <div className="admin-file-upload-row">
                        <small>Or upload from computer:</small>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => setMediaForm((prev) => ({ ...prev, communityImage: url })), 1200, 800)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Page Intro Image */}
                  <div className="admin-media-card">
                    <div className="admin-media-preview">
                      <SafeImage src={mediaForm.aboutIntroImage} alt="About Intro Preview" />
                    </div>
                    <div className="admin-media-fields">
                      <label><strong>About Page Main Image</strong></label>
                      <input
                        type="url"
                        value={mediaForm.aboutIntroImage}
                        onChange={(e) => setMediaForm({ ...mediaForm, aboutIntroImage: e.target.value })}
                        placeholder="Paste image URL..."
                      />
                      <div className="admin-file-upload-row">
                        <small>Or upload from computer:</small>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => setMediaForm((prev) => ({ ...prev, aboutIntroImage: url })), 1200, 800)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Logo Image */}
                  <div className="admin-media-card">
                    <div className="admin-media-preview">
                      {mediaForm.logoImage ? (
                        <SafeImage src={mediaForm.logoImage} alt="Logo Preview" />
                      ) : (
                        <div className="brand-mark">{siteData.logo || 'LCS'}</div>
                      )}
                    </div>
                    <div className="admin-media-fields">
                      <label><strong>Header & Footer Logo Image (Optional)</strong></label>
                      <input
                        type="url"
                        value={mediaForm.logoImage || ''}
                        onChange={(e) => setMediaForm({ ...mediaForm, logoImage: e.target.value })}
                        placeholder="Logo image URL (leave blank for text badge)"
                      />
                      <div className="admin-file-upload-row">
                        <small>Or upload logo file:</small>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => setMediaForm((prev) => ({ ...prev, logoImage: url })), 400, 400)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="admin-media-card full-width-card">
                    <div className="admin-media-fields">
                      <label>
                        <strong>About Page Video (YouTube Link, Vimeo, or Video File)</strong>
                      </label>
                      <p className="admin-field-hint">
                        <IconLightbulb size={14} /> Paste any YouTube link (e.g. <code>https://www.youtube.com/watch?v=...</code>, shorts, or share link), Vimeo link, or upload an MP4/WebM file below:
                      </p>
                      
                      <input
                        type="text"
                        value={mediaForm.aboutVideo || ''}
                        onChange={(e) => setMediaForm({ ...mediaForm, aboutVideo: e.target.value })}
                        placeholder="Paste YouTube, Vimeo, or MP4 video URL here..."
                      />

                      <div className="admin-file-upload-row">
                        <small><IconUpload size={14} /> Or upload a video file from your computer (MP4, WebM, MOV):</small>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/ogg,video/quicktime"
                          onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => setMediaForm((prev) => ({ ...prev, aboutVideo: url })))}
                        />
                      </div>

                      {mediaForm.aboutVideo && (
                        <div className="admin-video-preview-box">
                          <small><strong>Live Video Preview:</strong></small>
                          <div style={{ maxWidth: '600px', marginTop: '10px' }}>
                            <SafeVideoPlayer videoSource={mediaForm.aboutVideo} title="Admin Video Preview" />
                          </div>
                          <button
                            type="button"
                            className="btn-danger-text"
                            style={{ marginTop: '10px' }}
                            onClick={() => setMediaForm((prev) => ({ ...prev, aboutVideo: '' }))}
                          >
                            <IconTrash size={14} /> <span>Remove Video</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="admin-submit-bar">
                  <button type="submit" className="btn btn-primary">
                    <IconSave size={16} /> <span>Save All Site Banners</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: COURSES & IMAGES */}
            {activeTab === 'courses' && (
              <form className="admin-form" onSubmit={handleSaveCourses}>
                <div className="admin-tab-header">
                  <div className="tab-title-row">
                    <div>
                      <h3>Manage Courses & Course Photos</h3>
                      <p>Edit course titles, descriptions, and update or upload course banner images.</p>
                    </div>
                    <button type="button" className="btn btn-secondary btn-small" onClick={handleAddCourse}>
                      <IconPlus size={15} /> <span>Add New Course</span>
                    </button>
                  </div>
                </div>

                <div className="admin-items-list">
                  {coursesList.map((course, index) => (
                    <div key={course.id || index} className="admin-item-card">
                      <div className="item-card-preview">
                        <SafeImage src={course.image} alt={course.title} />
                      </div>
                      <div className="item-card-details">
                        <div className="input-row">
                          <label>
                            Course Title
                            <input
                              type="text"
                              value={course.title}
                              onChange={(e) => handleCourseFieldChange(index, 'title', e.target.value)}
                              placeholder="Course Title"
                              required
                            />
                          </label>
                          <label>
                            Duration / Schedule
                            <input
                              type="text"
                              value={course.duration}
                              onChange={(e) => handleCourseFieldChange(index, 'duration', e.target.value)}
                              placeholder="e.g. Flexible / 3 Months"
                            />
                          </label>
                        </div>

                        <label>
                          Course Image (URL or Upload)
                          <input
                            type="url"
                            value={course.image}
                            onChange={(e) => handleCourseFieldChange(index, 'image', e.target.value)}
                            placeholder="Image URL"
                          />
                        </label>
                        <div className="admin-file-upload-row">
                          <small>Upload photo from computer:</small>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => handleCourseFieldChange(index, 'image', url))}
                          />
                        </div>

                        <label>
                          Description
                          <textarea
                            rows="2"
                            value={course.text}
                            onChange={(e) => handleCourseFieldChange(index, 'text', e.target.value)}
                            placeholder="What students learn..."
                          />
                        </label>

                        <div className="item-card-footer">
                          <span className="course-index-tag">Course #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-danger-text"
                            onClick={() => handleRemoveCourse(index)}
                          >
                            <IconTrash size={14} /> <span>Delete Course</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-submit-bar">
                  <button type="submit" className="btn btn-primary">
                    <IconSave size={16} /> <span>Save All Courses & Photos</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: FACULTY & TEAM */}
            {activeTab === 'faculty' && (
              <form className="admin-form" onSubmit={handleSaveFaculty}>
                <div className="admin-tab-header">
                  <div className="tab-title-row">
                    <div>
                      <h3>Manage Leadership & Instructors</h3>
                      <p>Update faculty member photos, names, titles, and bios.</p>
                    </div>
                    <button type="button" className="btn btn-secondary btn-small" onClick={handleAddFaculty}>
                      <IconPlus size={15} /> <span>Add Team Member</span>
                    </button>
                  </div>
                </div>

                <div className="admin-items-list">
                  {facultyList.map((person, index) => (
                    <div key={person.id || index} className="admin-item-card">
                      <div className="item-card-preview round-preview">
                        <SafeImage src={person.image} alt={person.name} />
                      </div>
                      <div className="item-card-details">
                        <div className="input-row">
                          <label>
                            Full Name
                            <input
                              type="text"
                              value={person.name}
                              onChange={(e) => handleFacultyFieldChange(index, 'name', e.target.value)}
                              placeholder="Name"
                              required
                            />
                          </label>
                          <label>
                            Role / Job Title
                            <input
                              type="text"
                              value={person.role}
                              onChange={(e) => handleFacultyFieldChange(index, 'role', e.target.value)}
                              placeholder="Role / Title"
                            />
                          </label>
                        </div>

                        <label>
                          Photo (URL or Upload)
                          <input
                            type="url"
                            value={person.image}
                            onChange={(e) => handleFacultyFieldChange(index, 'image', e.target.value)}
                            placeholder="Image URL"
                          />
                        </label>
                        <div className="admin-file-upload-row">
                          <small>Upload photo from computer:</small>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => handleFacultyFieldChange(index, 'image', url))}
                          />
                        </div>

                        <label>
                          Bio / Background
                          <textarea
                            rows="2"
                            value={person.bio || ''}
                            onChange={(e) => handleFacultyFieldChange(index, 'bio', e.target.value)}
                            placeholder="Short biography..."
                          />
                        </label>

                        <div className="item-card-footer">
                          <button
                            type="button"
                            className="btn-danger-text"
                            onClick={() => handleRemoveFaculty(index)}
                          >
                            <IconTrash size={14} /> <span>Delete Member</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-submit-bar">
                  <button type="submit" className="btn btn-primary">
                    <IconSave size={16} /> <span>Save Faculty & Team</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: CAMPUS GALLERY */}
            {activeTab === 'gallery' && (
              <form className="admin-form" onSubmit={handleSaveGallery}>
                <div className="admin-tab-header">
                  <div className="tab-title-row">
                    <div>
                      <h3>Campus Life Gallery</h3>
                      <p>Showcase campus facilities, students working in computer labs, and events.</p>
                    </div>
                    <button type="button" className="btn btn-secondary btn-small" onClick={handleAddGalleryItem}>
                      <IconPlus size={15} /> <span>Add Gallery Photo</span>
                    </button>
                  </div>
                </div>

                <div className="admin-items-list">
                  {galleryItems.map((item, index) => (
                    <div key={index} className="admin-item-card">
                      <div className="item-card-preview">
                        <SafeImage src={item.image} alt={item.title} />
                      </div>
                      <div className="item-card-details">
                        <label>
                          Photo Caption / Title
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleGalleryChange(index, 'title', e.target.value)}
                            placeholder="e.g. Students in AI Lab"
                          />
                        </label>
                        <label>
                          Photo (URL or Upload)
                          <input
                            type="url"
                            value={item.image}
                            onChange={(e) => handleGalleryChange(index, 'image', e.target.value)}
                            placeholder="Image URL"
                          />
                        </label>
                        <div className="admin-file-upload-row">
                          <small>Upload photo from computer:</small>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLocalImageUpload(e.target.files?.[0], (url) => handleGalleryChange(index, 'image', url))}
                          />
                        </div>

                        <div className="item-card-footer">
                          <button
                            type="button"
                            className="btn-danger-text"
                            onClick={() => handleRemoveGalleryItem(index)}
                          >
                            <IconTrash size={14} /> <span>Delete Photo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-submit-bar">
                  <button type="submit" className="btn btn-primary">
                    <IconSave size={16} /> <span>Save Gallery Photos</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 5: BRANDING & TEXT */}
            {activeTab === 'branding' && (
              <form className="admin-form" onSubmit={handleBrandingSubmit}>
                <div className="admin-tab-header">
                  <h3>Branding & Text Content</h3>
                  <p>Update header badge announcements, logo text, and promotional banners.</p>
                </div>

                <div className="admin-grid">
                  <label>
                    Website Logo Badge Text
                    <input
                      type="text"
                      value={brandingForm.logo}
                      onChange={(e) => setBrandingForm({ ...brandingForm, logo: e.target.value })}
                      placeholder="LCS"
                      maxLength="20"
                    />
                    <small>Used when no image logo is uploaded.</small>
                  </label>

                  <label>
                    Homepage Live Announcement Badge
                    <input
                      type="text"
                      value={brandingForm.heroBadgeText}
                      onChange={(e) => setBrandingForm({ ...brandingForm, heroBadgeText: e.target.value })}
                      placeholder="🎓 Admissions Open..."
                    />
                  </label>

                  <label>
                    Ad / Promo Floating Title
                    <input
                      type="text"
                      value={brandingForm.promoTitle}
                      onChange={(e) => setBrandingForm({ ...brandingForm, promoTitle: e.target.value })}
                      placeholder="95% Practical Training"
                    />
                  </label>

                  <label>
                    Campus Address Description
                    <input
                      type="text"
                      value={brandingForm.mapAddress || ''}
                      onChange={(e) => setBrandingForm({ ...brandingForm, mapAddress: e.target.value })}
                      placeholder="Inside Happy Home Tiles Building..."
                    />
                  </label>

                  <label>
                    Google Maps Search / Coordinates Query
                    <input
                      type="text"
                      value={brandingForm.mapEmbedUrl || ''}
                      onChange={(e) => setBrandingForm({ ...brandingForm, mapEmbedUrl: e.target.value })}
                      placeholder="https://maps.google.com/maps?q=..."
                    />
                  </label>

                  <label>
                    Ad / Promo Floating Text
                    <textarea
                      rows="3"
                      value={brandingForm.promoText}
                      onChange={(e) => setBrandingForm({ ...brandingForm, promoText: e.target.value })}
                      placeholder="Flexible schedules with regular and weekend sessions..."
                    />
                  </label>
                </div>

                <div className="admin-submit-bar">
                  <button type="submit" className="btn btn-primary">
                    <IconSave size={16} /> <span>Save Branding & Text</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 6: TRAFFIC */}
            {activeTab === 'visitors' && (
              <div className="visitor-log-wrap">
                <div className="admin-tab-header">
                  <h3>Website Visitor Analytics</h3>
                  <p>Real-time analytics of visitor sessions, IP tracking, and duration on site.</p>
                </div>

                <div className="admin-summary-grid">
                  <div className="summary-card">
                    <span>Total Visits Recorded</span>
                    <strong>{visitorLogs.length}</strong>
                  </div>
                  <div className="summary-card">
                    <span>Latest Visitor IP</span>
                    <strong>{visitorLogs.length ? visitorLogs[visitorLogs.length - 1].ipAddress : 'None'}</strong>
                  </div>
                </div>

                {visitorLogs.length === 0 ? (
                  <p style={{ marginTop: '20px' }}>No visits recorded yet.</p>
                ) : (
                  <div className="visitor-table">
                    <div className="visitor-row visitor-header">
                      <span>IP Address</span>
                      <span>Date & Time</span>
                      <span>Time Spent</span>
                    </div>
                    {[...visitorLogs].reverse().slice(0, 30).map((log, i) => (
                      <div key={log.sessionId || i} className="visitor-row">
                        <span>{log.ipAddress}</span>
                        <span>{new Date(log.enteredAt).toLocaleString()}</span>
                        <span>{formatDuration(log.durationMs || 0)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: RESET & BACKUP */}
            {activeTab === 'backup' && (
              <div className="admin-backup-wrap">
                <div className="admin-tab-header">
                  <h3>Reset & Data Maintenance</h3>
                  <p>Restore default images or export/import website configuration.</p>
                </div>

                <div className="backup-actions-grid">
                  <div className="backup-card">
                    <h4><IconRefresh size={20} /> Restore Default Images & Content</h4>
                    <p>If any broken image URLs or corrupted uploads occur, click this button to restore all default high-resolution images and courses.</p>
                    <button
                      type="button"
                      className="btn btn-secondary danger-btn"
                      onClick={onResetDefaults}
                    >
                      Restore All Defaults
                    </button>
                  </div>

                  <div className="backup-card">
                    <h4><IconDownload size={20} /> Export Website Backup</h4>
                    <p>Download a JSON copy of all current courses, images, and content settings to your computer.</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute('href', dataStr);
                        downloadAnchor.setAttribute('download', 'lcs_site_backup.json');
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                      }}
                    >
                      Export Backup (JSON)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {status && <div className="admin-status-toast">{status}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
