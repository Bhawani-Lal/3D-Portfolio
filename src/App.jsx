import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import avatar from "./assets/avatar.png";

const PROJECTS = [
  {
    id: "smartmaintain",
    num: "01",
    title: "SmartMaintain",
    subtitle: "Predictive Maintenance System",
    desc: "MSc dissertation: LSTM + Random Forest hybrid on NASA C-MAPSS for turbofan engine RUL prediction, with SHAP explainability and a RAG-powered Copilot layer.",
    tech: ["Python", "LSTM", "Random Forest", "SHAP", "NASA C-MAPSS", "RAG"],
    detail:
      "Dissertation project building a predictive maintenance system for industrial turbofan engines. A hybrid LSTM + Random Forest architecture is trained on NASA's C-MAPSS dataset to predict Remaining Useful Life (RUL). SHAP analysis provides model explainability. A SmartMaintain Copilot (RAG + function calling) is layered on top for natural language querying of maintenance insights.",
    features: [
      "Hybrid LSTM + Random Forest RUL prediction",
      "NASA C-MAPSS turbofan engine dataset",
      "SHAP analysis for model explainability",
      "SmartMaintain Copilot — RAG + function calling",
      "Progress Log 2 cleared — submission Sep 2025",
    ],
    live: true,
  },
  {
    id: "chatbot",
    num: "02",
    title: "Mental Health Chatbot",
    subtitle: null,
    desc: "AI-powered chatbot for supportive conversations, using Gemini API with Supabase authentication and persistent chat history.",
    tech: ["HTML", "CSS", "JS", "Supabase", "Gemini API"],
    detail:
      "An AI-powered mental health chatbot designed to provide supportive conversations and emotional guidance. Focuses on a safe, calming UX with Supabase authentication and intelligent AI-based responses powered by Gemini API.",
    features: [
      "User login & signup via Supabase",
      "AI responses using Gemini API",
      "Persistent chat history",
      "Supportive conversation UI design",
    ],
    live: false,
  },
  {
    id: "cnn",
    num: "03",
    title: "Real-Time Facial Recognition",
    subtitle: "CNN",
    desc: "Computer vision project detecting and recognising faces in real-time via CNN, processing live webcam input with TensorFlow.",
    tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
    detail:
      "A computer vision project using Convolutional Neural Networks for real-time face detection and recognition from live webcam input — demonstrating practical deep learning in image-based recognition tasks.",
    features: [
      "Real-time face detection",
      "CNN-based recognition model",
      "Live webcam processing via OpenCV",
      "End-to-end deep learning pipeline",
    ],
    live: false,
  },
  {
    id: "portfolio",
    num: "04",
    title: "3D Portfolio Website",
    subtitle: null,
    desc: "Interactive personal portfolio built with React & Three.js — 3D hero section, animated stars, RGB cyberpunk aesthetic, and smooth scroll experience.",
    tech: ["React", "Three.js", "R3F", "CSS"],
    detail:
      "Combines React with animated 3D elements via Three.js for an immersive, premium portfolio. Features a 3D hero section, animated star field, project showcases, skills, blogs, and contact — with a full cyberpunk RGB theme.",
    features: [
      "Interactive 3D hero with animated star field",
      "RGB cycling HUD aesthetic",
      "Project modals with tech stack",
      "Smooth scroll & active nav tracking",
    ],
    live: false,
  },
];

const BLOGS = [
  {
    id: "journey",
    num: "01",
    title: "My Journey to MSc in the UK",
    excerpt:
      "Moving to the UK for my MSc was a life-changing decision — adapting to a new environment, managing studies, and building projects.",
    tags: "#PersonalGrowth #Career #StudentLife",
    full: "This journey taught me independence, adaptability, and the importance of stepping out of my comfort zone. Studying in the UK while managing life and projects has helped me grow both personally and professionally.",
  },
  {
    id: "self",
    num: "02",
    title: "How I Started My Self-Improvement Journey",
    excerpt:
      "The moment I realised the importance of discipline, focus, and consistency — and how it changed my approach to everything.",
    tags: "#SelfGrowth #Discipline #Mindset",
    full: "My self-improvement journey began when I realized the importance of discipline, focus, and consistency. From improving daily habits to learning programming and problem-solving, I work every day to become a better version of myself.",
  },
];

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const moveGlow = (e) => {
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "blogs", "contact"];
      let current = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 180)
          current = section;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Projects", "Skills", "Certifications", "Blogs", "Contact"];

  return (
    <div className="app-root">
      <div id="cursor-glow" className="cursor-glow" />

      {/* ── HERO ── */}
      <section id="home" className="section hero-section">
        <nav className="top-nav">
          <div className="brand-mark">BL_SYS</div>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${
                  activeSection === item.toLowerCase() ? "active" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-kicker">Available for opportunities</p>

            <h1 className="hero-title">
              BHAWANI
              <br />
              LAL
            </h1>

            <div className="hero-subtext">
              <span className="hero-line" />
              <TypeAnimation
                sequence={[
                  "MSc Advanced CS & Data Science",
                  1600,
                  "AI & ML Researcher",
                  1400,
                  "Predictive Maintenance Engineer",
                  1600,
                  "3D Portfolio Builder",
                  1400,
                  "Full Stack Developer",
                  1400,
                ]}
                speed={55}
                repeat={Infinity}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "rgba(200,216,232,0.5)",
                }}
              />
            </div>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
              </button>
              <button className="btn-secondary">Resume</button>
            </div>

            <div className="scroll-label">Scroll ↓</div>
          </div>

          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-frame">
                <img src={avatar} alt="Bhawani Lal" className="avatar-image" />
                <div className="scan-overlay" />
              </div>
              <div className="avatar-tag">
                <span className="avatar-tag-title">MSc Student</span>
                <span className="avatar-tag-sub">Strathclyde University</span>
              </div>
            </div>
          </div>
        </div>

        <Canvas camera={{ position: [2.5, 0, 5] }} className="hero-canvas">
          <ambientLight intensity={0.3} />
          <directionalLight position={[2, 2, 5]} />
          <OrbitControls enableZoom={false} />
          <Stars
            radius={100}
            depth={50}
            count={6000}
            factor={4}
            saturation={0}
            fade
            speed={0.8}
          />
        </Canvas>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section elegant-section">
        <div className="section-topline">01 / 04 — Selected Work</div>
        <div className="section-header split-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-description right-align">
            Research, builds &amp; live
            <br />
            engineering projects
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.id} className="elegant-card">
              <div className="card-corner-br" />

              {/* Number row + live badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div className="card-number">{p.num} //</div>
                {p.live && (
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "8px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#00ff88",
                      border: "1px solid rgba(0,255,136,0.3)",
                      padding: "2px 9px",
                      background: "rgba(0,255,136,0.06)",
                      animation: "pulse 1.6s ease-in-out infinite",
                    }}
                  >
                    Live Research
                  </span>
                )}
              </div>

              <h3 className="card-title">{p.title}</h3>

              {p.subtitle && (
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    color: "rgba(0,136,255,0.55)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    marginTop: "-6px",
                  }}
                >
                  {p.subtitle}
                </p>
              )}

              <p className="card-text">{p.desc}</p>

              <div className="tag-wrap">
                {p.tech.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <button
                  className="btn-primary small"
                  onClick={() => setSelectedProject(p)}
                >
                  Details
                </button>
                <a
                  href="https://github.com/nirbhay29"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary small link-btn"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {selectedProject.live && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#00ff88",
                    animation: "pulse 1.4s ease-in-out infinite",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#00ff88",
                  }}
                >
                  Live Research — MSc Dissertation
                </span>
              </div>
            )}

            <h2 className="modal-title">{selectedProject.title}</h2>

            {selectedProject.subtitle && (
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(0,136,255,0.55)",
                  marginBottom: "16px",
                  marginTop: "-10px",
                }}
              >
                {selectedProject.subtitle}
              </p>
            )}

            <p className="modal-text">{selectedProject.detail}</p>

            <div className="modal-block">
              <h4>// Key Features</h4>
              {selectedProject.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: "#00ff88",
                      flexShrink: 0,
                      fontSize: "11px",
                    }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      color: "rgba(200,216,232,0.5)",
                      fontSize: "13px",
                      lineHeight: "1.7",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-block">
              <h4>// Tech Stack</h4>
              <div className="tag-wrap">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "26px", display: "flex", gap: "10px" }}>
              <button
                className="btn-primary small"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <a
                href="https://github.com/nirbhay29"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary small link-btn"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── SKILLS ── */}
      <section id="skills" className="section elegant-section">
  <div className="section-topline">02 / 04 — Technologies</div>
  <h2 className="section-title">Skills</h2>

  <div className="skills-categories">

    <div className="skill-category">
      <div className="skill-cat-label">// Languages</div>
      <div className="skills-grid">
        {["Python", "JavaScript", "SQL", "R", "HTML", "CSS"].map((s) => (
          <div key={s} className="skill-box">{s}</div>
        ))}
      </div>
    </div>

    <div className="skill-category">
      <div className="skill-cat-label">// Frameworks & Libraries</div>
      <div className="skills-grid">
        {["React", "TensorFlow", "OpenCV", "Three.js", "Node.js", "Spring Boot"].map((s) => (
          <div key={s} className="skill-box">{s}</div>
        ))}
      </div>
    </div>

    <div className="skill-category">
      <div className="skill-cat-label">// ML / AI</div>
      <div className="skills-grid">
        {["LSTM", "Random Forest", "SHAP", "RAG", "CNN", "NLP"].map((s) => (
          <div key={s} className="skill-box skill-box--accent">{s}</div>
        ))}
      </div>
    </div>

    <div className="skill-category">
      <div className="skill-cat-label">// Concepts & Tools</div>
      <div className="skills-grid">
        {["DSA", "Predictive Maintenance", "REST APIs", "Git", "Kafka", "JPA"].map((s) => (
          <div key={s} className="skill-box">{s}</div>
        ))}
      </div>
    </div>

  </div>
</section>

    

{/* ── CERTIFICATIONS ── */}
<section id="certifications" className="section elegant-section">
  <div className="section-topline">03 / 04 — Achievements</div>
  <h2 className="section-title">Certifications</h2>

  <div className="cert-grid">

    <div className="cert-card">
      <div className="cert-card__top">
        <span className="cert-issuer">JPMorgan Chase</span>
        <span className="cert-badge cert-badge--live">Completed</span>
      </div>
      <h3 className="cert-title">Advanced Software Engineering</h3>
      <p className="cert-sub">Forage Virtual Experience Program</p>
      <p className="cert-desc">
        Completed all 5 Midas Core tasks — Kafka event streaming, Spring Data JPA,
        REST APIs, Spring MVC, and advanced engineering patterns. Certificate earned.
      </p>
      <div className="cert-tags">
        {["Kafka", "Spring Boot", "REST", "JPA", "Spring MVC"].map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </div>

    <div className="cert-card">
      <div className="cert-card__top">
        <span className="cert-issuer">Hewlett Packard Enterprise</span>
        <span className="cert-badge cert-badge--live">Completed</span>
      </div>
      <h3 className="cert-title">Software Engineering</h3>
      <p className="cert-sub">Forage Virtual Experience Program</p>
      <p className="cert-desc">
        Built a Spring Boot employee management REST API end-to-end, covering
        design, implementation, and deployment patterns for enterprise systems.
      </p>
      <div className="cert-tags">
        {["Spring Boot", "REST API", "Java"].map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </div>

    <div className="cert-card">
      <div className="cert-card__top">
        <span className="cert-issuer">Anthropic</span>
        <span className="cert-badge cert-badge--live">Completed</span>
      </div>
      <h3 className="cert-title">Claude Platform 101</h3>
      <p className="cert-sub">Anthropic Academy</p>
      <p className="cert-desc">
        Completed Anthropic's official Claude Platform course — prompt engineering,
        API integration, and building AI-powered applications with Claude.
      </p>
      <div className="cert-tags">
        {["Claude API", "Prompt Engineering", "AI"].map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </div>

    <div className="cert-card">
      <div className="cert-card__top">
        <span className="cert-issuer">Anthropic</span>
        <span className="cert-badge cert-badge--live">Completed</span>
      </div>
      <h3 className="cert-title">AI Fluency</h3>
      <p className="cert-sub">Anthropic Academy</p>
      <p className="cert-desc">
        Completed Anthropic's AI Fluency certification — understanding large language
        models, responsible AI use, and practical AI integration strategies.
      </p>
      <div className="cert-tags">
        {["LLMs", "AI Ethics", "Responsible AI"].map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </div>

    <div className="cert-card">
      <div className="cert-card__top">
        <span className="cert-issuer">Google / Coursera</span>
        <span className="cert-badge">In Progress</span>
      </div>
      <h3 className="cert-title">Data Analytics</h3>
      <p className="cert-sub">Google Data Analytics Certificate</p>
      <p className="cert-desc">
        Completed Course 1 of the Google Data Analytics professional certificate,
        covering foundations of data, analytical thinking, and the data lifecycle.
      </p>
      <div className="cert-tags">
        {["Data Analysis", "Analytics", "Google"].map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* ── BLOGS ── */}
      <section id="blogs" className="section elegant-section">
        <div className="section-topline">03 / 04 — Writing</div>
        <h2 className="section-title">
          Thoughts &amp;
          <br />
          Reflections
        </h2>
        <div className="blogs-grid" style={{ marginTop: "44px" }}>
          {BLOGS.map((b) => (
            <div key={b.id} className="elegant-card">
              <div className="card-corner-br" />
              <div className="card-number">{b.num} //</div>
              <h3 className="card-title">{b.title}</h3>
              <p className="card-text">{b.excerpt}</p>
              <p className="blog-hashtags">{b.tags}</p>
              <div style={{ marginTop: "20px" }}>
                <button
                  className="btn-secondary small"
                  onClick={() => setSelectedBlog(b)}
                >
                  Read More ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG MODAL ── */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedBlog.title}</h2>
            <p className="modal-text">{selectedBlog.full}</p>
            <div
              style={{
                marginTop: "14px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                color: "rgba(0,255,136,0.4)",
                letterSpacing: "0.06em",
              }}
            >
              {selectedBlog.tags}
            </div>
            <div style={{ marginTop: "26px" }}>
              <button
                className="btn-primary small"
                onClick={() => setSelectedBlog(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="section elegant-section contact-section">
        <div className="section-topline">04 / 04 — Get in Touch</div>
        <div className="contact-grid">
          <div>
            <h2 className="section-title">
              Let&apos;s
              <br />
              Connect
            </h2>
          </div>
          <div className="contact-right">
            <p className="contact-text">
              If you&apos;d like to collaborate, discuss projects, or just
              connect — feel free to reach out.
            </p>
            <div className="contact-actions">
              <a
                href="mailto:bhawani.lal@hotmail.com"
                className="btn-primary contact-btn link-btn"
              >
                Send an Email
              </a>
              <div className="contact-row">
                <a
                  href="https://github.com/nirbhay29"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary contact-btn link-btn"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/bhawani-lal-883666319/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary contact-btn link-btn"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer-bar">
          <span className="brand-mark" style={{ fontSize: "12px" }}>
            BL_SYS
          </span>
          <span className="footer-copy">
            © 2026 Bhawani Lal — All systems nominal
          </span>
        </footer>
      </section>
    </div>
  );
}
