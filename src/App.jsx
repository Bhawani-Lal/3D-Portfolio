import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import avatar from "./assets/avatar.png";

const PROJECTS = [
  {
    id: "scanguard",
    num: "01",
    title: "ScanGuard",
    subtitle: "AI Quality Inspection · Computer Vision",
    desc: "Computer vision system that inspects industrial metal castings and flags defects. ResNet18 transfer learning with a decision threshold tuned to halve missed defects, served through Streamlit, FastAPI and Docker.",
    tech: ["Python", "PyTorch", "ResNet18", "FastAPI", "Streamlit", "Docker"],
    detail:
      "End-to-end inspection system trained on 7,348 real casting images. A pretrained ResNet18 with a new 2-class output layer was trained in PyTorch. Because a missed defect is the costly error in inspection, the decision threshold was tuned on a held-out validation set (never the test set), cutting missed defects from 8 to 4 on 715 unseen test images. The model is served through a Streamlit inspection app with a manual-review band and a FastAPI service with input validation, packaged in a Docker container.",
    features: [
      "99.2% test accuracy · 99.6% precision · 99.1% recall",
      "Threshold tuned on validation data: missed defects halved (8 → 4)",
      "Rejects non-casting images (HTTP 422) instead of guessing",
      "Streamlit app with a manual-review band for borderline cases",
      "FastAPI REST endpoint, containerised with Docker",
    ],
    github: "https://github.com/Bhawani-Lal/scanguard",
    badge: "Completed",
    liveLink: null,
  },
  {
    id: "smartmaintain",
    num: "02",
    title: "SmartMaintain",
    subtitle: "Predictive Maintenance · MSc Dissertation",
    desc: "MSc dissertation: predictive maintenance on NASA C-MAPSS jet-engine sensor data, combining LSTM remaining-useful-life prediction with Random Forest failure classification and SHAP explainability.",
    tech: ["Python", "LSTM", "Random Forest", "SHAP", "scikit-learn", "NASA C-MAPSS"],
    detail:
      "Predictive maintenance for turbofan engines using NASA C-MAPSS data: 21 sensors, 3 operating settings and 51 engineered features, with engine-level splits to avoid leakage. An LSTM (128/64 units) predicts Remaining Useful Life with MAE 11.01 and RMSE 14.85 cycles, and a Random Forest classifies engines nearing failure at 95.7% accuracy (F1 0.868). SHAP identifies the most influential sensors, and the results feed a four-status maintenance decision framework.",
    features: [
      "LSTM RUL prediction: MAE 11.01 · RMSE 14.85 cycles",
      "Random Forest failure classification: 95.7% accuracy, F1 0.868",
      "51 engineered features with engine-level splits",
      "SHAP: top sensors mean_s3, mean_s21, last_s11",
      "Four-status maintenance decision framework",
    ],
    github: "https://github.com/Bhawani-Lal/Smartmaintain_Dissertation",
    badge: "MSc Dissertation",
    liveLink: null,
  },
  {
    id: "aidoc",
    num: "03",
    title: "AI Document Intelligence Tool",
    subtitle: "RAG & Generative AI",
    desc: "RAG-powered document Q&A system that ingests business documents and answers questions in plain English, citing the source passage. Built with the Claude API, LangChain, FastAPI and React.",
    tech: ["Python", "Claude API", "LangChain", "RAG", "FastAPI", "React"],
    detail:
      "A tool that ingests business documents (PDFs, reports) and answers natural-language questions with citations to the source passage. It uses document chunking, vector embeddings and retrieval-augmented generation with the Claude API and LangChain, with a FastAPI backend and a React frontend for upload and querying. Currently in development.",
    features: [
      "Document ingestion: PDF and report parsing",
      "Chunking and vector embeddings for semantic search",
      "RAG pipeline using the Claude API and LangChain",
      "Answers cited to the source passage",
      "FastAPI backend and React frontend",
    ],
    github: "https://github.com/Bhawani-Lal/ai-document-intelligence",
    badge: "In Progress",
    liveLink: null,
  },
  {
    id: "finrisk",
    num: "04",
    title: "Financial Risk Analytics Dashboard",
    subtitle: "Data Science & Financial Analytics",
    desc: "Interactive risk dashboard pulling equity data with yfinance: rolling volatility, an asset correlation heatmap and 95% historical Value at Risk, deployed on Streamlit Cloud.",
    tech: ["Python", "Streamlit", "Plotly", "Pandas", "yfinance"],
    detail:
      "Interactive financial risk dashboard covering 10 stocks with filtering by ticker and date range. It computes 30-day rolling annualised volatility, a correlation heatmap and 95% historical Value at Risk, chosen over parametric VaR so the estimate reflects real fat-tailed returns. Pandas handles the data pipeline and Plotly the interactive charts, deployed on Streamlit Cloud.",
    features: [
      "Equity data via yfinance: 10 stocks",
      "30-day rolling volatility analysis",
      "Asset correlation heatmap",
      "95% historical Value at Risk",
      "Deployed on Streamlit Cloud",
    ],
    github: "https://github.com/Bhawani-Lal/financial-risk-analytics",
    badge: "Live",
    liveLink: "https://financial-risk-analytics-gnwpm6esocx32qmxwthtmn.streamlit.app/",
  },
  {
    id: "portfolio",
    num: "05",
    title: "3D Portfolio Website",
    subtitle: "React · Three.js",
    desc: "This site: a React and Three.js portfolio with a 3D star-field hero, RGB cyberpunk styling and project and blog modals, deployed on Vercel.",
    tech: ["React", "Three.js", "R3F", "CSS"],
    detail:
      "Combines React with animated 3D elements through React Three Fiber. Features a 3D hero section, animated star field, project showcases, skills, certifications, blogs and contact, with a cyberpunk RGB theme deployed on Vercel.",
    features: [
      "Interactive 3D hero with animated star field",
      "RGB cycling HUD aesthetic",
      "Project modals with tech stack details",
      "Certifications and blogs sections",
      "Deployed on Vercel from GitHub",
    ],
    github: "https://github.com/Bhawani-Lal/3D-Portfolio",
    badge: null,
    liveLink: "https://3-d-portfolio-ten-jet.vercel.app/",
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

const STATS = [
  { value: 99.2, decimals: 1, suffix: "%", label: "ScanGuard test accuracy" },
  { value: 95.7, decimals: 1, suffix: "%", label: "SmartMaintain failure classification" },
  { value: 4, decimals: 0, suffix: "", label: "Projects shipped" },
  { value: 60, decimals: 0, suffix: "+", label: "LeetCode problems solved" },
];

function CountUp({ value, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay((value * eased).toFixed(decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// Soft 3D tilt + cursor glow for the front project card
const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function handleTilt(e) {
  if (!canTilt()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.dataset.tilt = "1";
}

function resetTilt(e) {
  const el = e.currentTarget;
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--rx", "0deg");
  el.dataset.tilt = "0";
}

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const [stackPaused, setStackPaused] = useState(false);

  const nProjects = PROJECTS.length;
  const nextProject = () => setActiveProject((i) => (i + 1) % nProjects);
  const prevProject = () => setActiveProject((i) => (i - 1 + nProjects) % nProjects);

  // Auto-advance the project stack (pauses on hover or when a modal is open)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || stackPaused || selectedProject) return;
    const t = setTimeout(() => setActiveProject((i) => (i + 1) % nProjects), 6000);
    return () => clearTimeout(t);
  }, [activeProject, stackPaused, selectedProject, nProjects]);

  // Reveal sections as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
      const sections = ["home", "projects", "skills", "certifications", "blogs", "contact"];
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
        <div className="hero-aurora" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
        </div>
        <nav className="top-nav">
          <div className="brand-mark">Bhawani Lal</div>
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
            <p className="hero-kicker">Open to 2027 graduate roles · Glasgow, UK</p>

            <h1 className="hero-title" aria-label="Bhawani Lal">
              {"Bhawani Lal".split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  aria-hidden="true"
                  style={{ animationDelay: `${0.25 + i * 0.045}s` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>

            <p className="hero-summary">
              MSc Advanced Computer Science with Data Science at the University of
              Strathclyde. I build machine learning systems end to end, from data
              and models to tested, deployed APIs.
            </p>

            <div className="hero-subtext">
              <span className="hero-line" />
              <TypeAnimation
                sequence={[
                  "Machine Learning Engineer",
                  1400,
                  "Computer Vision · Predictive Maintenance",
                  1600,
                  "Driverless Software · Strathclyde Motorsport",
                  1600,
                  "Python · PyTorch · FastAPI · Docker",
                  1400,
                ]}
                speed={55}
                repeat={Infinity}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "15px",
                  color: "#a6b0c3",
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
                View my work
              </button>
              <a
                href="/Bhawani_lal_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary link-btn"
                style={{ padding: "13px 26px" }}
              >
                Download CV
              </a>
            </div>

            <div className="hero-stats">
              {STATS.map((st) => (
                <div key={st.label} className="hero-stat">
                  <div className="hero-stat-value">
                    <CountUp value={st.value} decimals={st.decimals} suffix={st.suffix} />
                  </div>
                  <div className="hero-stat-label">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-frame">
                <img src={avatar} alt="Bhawani Lal" className="avatar-image" />
                <div className="scan-overlay" />
              </div>
              <div className="avatar-tag">
                <span className="avatar-tag-title">MSc Data Science</span>
                <span className="avatar-tag-sub">University of Strathclyde</span>
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
            count={2500}
            factor={3}
            saturation={0}
            fade
            speed={0.4}
          />
        </Canvas>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section elegant-section">
        <div className="section-topline">01 — Selected work</div>
        <div className="section-header split-header reveal">
          <h2 className="section-title">Projects</h2>
          <p className="section-description right-align">
            From MSc research to tested,
            deployed tools.
          </p>
        </div>

        <div className="reveal">
        <div
          className={`stack-wrap ${stackPaused ? "paused" : ""}`}
          onMouseEnter={() => setStackPaused(true)}
          onMouseLeave={() => setStackPaused(false)}
        >
          <div className="stack">
            {PROJECTS.map((p, i) => {
              const pos = (i - activeProject + nProjects) % nProjects;
              const inProgress = p.badge === "In Progress";
              return (
                <article
                  key={p.id}
                  className={`stack-card pos-${Math.min(pos, 4)}`}
                  style={{ zIndex: nProjects - pos }}
                  onClick={() => pos !== 0 && setActiveProject(i)}
                  onMouseMove={pos === 0 ? handleTilt : undefined}
                  onMouseLeave={resetTilt}
                  aria-hidden={pos !== 0}
                >
                  <div className="stack-inner">
                    <div className="stack-main">
                      <div className="stack-head">
                        <span className="card-number">{p.num} / {String(nProjects).padStart(2, "0")}</span>
                        {p.badge && (
                          <span className={`stack-badge ${inProgress ? "amber" : ""}`}>{p.badge}</span>
                        )}
                      </div>
                      <h3 className="stack-title">{p.title}</h3>
                      {p.subtitle && <p className="stack-sub">{p.subtitle}</p>}
                      <p className="card-text">{p.desc}</p>
                      <div className="tag-wrap">
                        {p.tech.map((t) => (
                          <span key={t} className="tag-chip">{t}</span>
                        ))}
                      </div>
                      <div className="card-actions">
                        <button className="btn-primary small" onClick={() => setSelectedProject(p)} tabIndex={pos === 0 ? 0 : -1}>
                          Details
                        </button>
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn-secondary small link-btn" tabIndex={pos === 0 ? 0 : -1}>
                          GitHub ↗
                        </a>
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn-primary small link-btn" tabIndex={pos === 0 ? 0 : -1}>
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="stack-results">
                      <h4>Key results</h4>
                      <ul>
                        {p.features.map((f) => (
                          <li key={f}><span>→</span>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {pos === 0 && <div key={activeProject} className="stack-progress" />}
                </article>
              );
            })}
          </div>

          <div className="stack-controls">
            <button className="stack-arrow" onClick={prevProject} aria-label="Previous project">←</button>
            <div className="stack-tabs">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  className={`stack-tab ${i === activeProject ? "active" : ""}`}
                  onClick={() => setActiveProject(i)}
                >
                  {p.num} {p.title}
                </button>
              ))}
            </div>
            <button className="stack-arrow" onClick={nextProject} aria-label="Next project">→</button>
          </div>
        </div>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {selectedProject.badge && (
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
                    background: selectedProject.badge === "In Progress" ? "#f5b545" : "#3ecf9b",
                    animation: "pulse 1.4s ease-in-out infinite",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: selectedProject.badge === "In Progress" ? "#f5b545" : "#3ecf9b",
                  }}
                >
                  {selectedProject.badge}
                </span>
              </div>
            )}

            <h2 className="modal-title">{selectedProject.title}</h2>

            {selectedProject.subtitle && (
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#5b8cff",
                  marginBottom: "16px",
                  marginTop: "-6px",
                }}
              >
                {selectedProject.subtitle}
              </p>
            )}

            <p className="modal-text">{selectedProject.detail}</p>

            <div className="modal-block">
              <h4>Key results</h4>
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
                      color: "#3ecf9b",
                      flexShrink: 0,
                      fontWeight: 700,
                    }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      color: "#a6b0c3",
                      fontSize: "15px",
                      lineHeight: "1.6",
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-block">
              <h4>Tech stack</h4>
              <div className="tag-wrap">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "26px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="btn-primary small"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary small link-btn"
              >
                GitHub ↗
              </a>
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary small link-btn"
                  style={{ fontSize: "8px" }}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SKILLS ── */}
      <section id="skills" className="section elegant-section">
        <div className="section-topline">02 — Technologies</div>
        <h2 className="section-title reveal">Skills</h2>

        <div className="skills-categories">

          <div className="skill-category reveal">
            <div className="skill-cat-label">Languages</div>
            <div className="skills-grid">
              {["Python", "Java", "SQL", "JavaScript", "R", "HTML", "CSS"].map((s) => (
                <div key={s} className="skill-box">{s}</div>
              ))}
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-cat-label">Frameworks & Libraries</div>
            <div className="skills-grid">
              {["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "FastAPI", "Streamlit", "React", "Three.js", "Node.js", "Spring Boot"].map((s) => (
                <div key={s} className="skill-box">{s}</div>
              ))}
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-cat-label">Machine Learning & AI</div>
            <div className="skills-grid">
              {["Computer Vision", "Transfer Learning", "CNN", "LSTM", "Random Forest", "SHAP", "RAG", "NLP"].map((s) => (
                <div key={s} className="skill-box skill-box--accent">{s}</div>
              ))}
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-cat-label">Tools & Concepts</div>
            <div className="skills-grid">
              {["Docker", "REST APIs", "Git", "GitLab", "DSA", "Predictive Maintenance", "Kafka", "JPA"].map((s) => (
                <div key={s} className="skill-box">{s}</div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="section elegant-section">
        <div className="section-topline">03 — Achievements</div>
        <h2 className="section-title reveal">Certifications</h2>

        <div className="cert-grid">

          <div className="cert-card reveal">
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

          <div className="cert-card reveal">
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

          <div className="cert-card reveal">
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

          <div className="cert-card reveal">
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

          <div className="cert-card reveal">
            <div className="cert-card__top">
              <span className="cert-issuer">Anthropic</span>
              <span className="cert-badge cert-badge--live">Completed</span>
            </div>
            <h3 className="cert-title">Building with the Claude API</h3>
            <p className="cert-sub">Anthropic Academy</p>
            <p className="cert-desc">
              Building applications on the Claude API: messages, tool use,
              retrieval and structuring outputs for real products.
            </p>
            <div className="cert-tags">
              {["Claude API", "Tool Use", "RAG"].map((t) => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="cert-card reveal">
            <div className="cert-card__top">
              <span className="cert-issuer">IBM</span>
              <span className="cert-badge cert-badge--live">Completed</span>
            </div>
            <h3 className="cert-title">Python for Data Science, AI &amp; Development</h3>
            <p className="cert-sub">IBM / Coursera</p>
            <p className="cert-desc">
              Python fundamentals for data work: data structures, Pandas, NumPy,
              working with APIs and data collection.
            </p>
            <div className="cert-tags">
              {["Python", "Pandas", "NumPy"].map((t) => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="cert-card reveal">
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
        <div className="section-topline">04 — Writing</div>
        <h2 className="section-title reveal">
          Thoughts &amp;
          <br />
          Reflections
        </h2>
        <div className="blogs-grid" style={{ marginTop: "44px" }}>
          {BLOGS.map((b) => (
            <div key={b.id} className="elegant-card reveal">
              <div className="card-corner-br" />
              <div className="card-number">{b.num}</div>
              <h3 className="card-title">{b.title}</h3>
              <p className="card-text">{b.excerpt}</p>
              <p className="blog-hashtags">{b.tags}</p>
              <div style={{ marginTop: "20px" }}>
                <button
                  className="btn-secondary small"
                  onClick={() => setSelectedBlog(b)}
                >
                  Read more
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
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#6f7b91",
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
        <div className="section-topline">05 — Get in touch</div>
        <div className="contact-grid reveal">
          <div>
            <h2 className="section-title">
              Let&apos;s
              <br />
              Connect
            </h2>
          </div>
          <div className="contact-right">
            <p className="contact-text">
              I&apos;m looking for graduate roles in machine learning, data
              science and software engineering from 2027. If you&apos;re hiring
              or want to talk about a project, get in touch.
            </p>
            <div className="contact-actions">
              <a
                href="mailto:bhawanilal@hotmail.com"
                className="btn-primary contact-btn link-btn"
              >
                Email me
              </a>
              <div className="contact-row">
                <a
                  href="https://github.com/Bhawani-Lal"
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
          <span className="brand-mark" style={{ fontSize: "14px" }}>
            Bhawani Lal
          </span>
          <span className="footer-copy">
            © 2026 Bhawani Lal · Glasgow, UK
          </span>
        </footer>
      </section>
    </div>
  );
}
