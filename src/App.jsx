import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import avatar from "./assets/avatar.png";

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
        if (element) {
          const top = element.offsetTop - 180;
          if (window.scrollY >= top) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const elegantCardEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.border = "1px solid rgba(201,168,91,0.32)";
  };

  const elegantCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.border = "1px solid rgba(201,168,91,0.12)";
  };

  const navItems = ["Home", "Projects", "Skills", "Blogs", "Contact"];

  return (
    <div className="app-root">
      <div id="cursor-glow" className="cursor-glow" />

      {/* HERO SECTION */}
      <section id="home" className="section hero-section">
        <nav className="top-nav">
          <div className="brand-mark">BL</div>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-kicker">— Available for opportunities</p>

            <h1 className="hero-title">
              Bhawani
              <br />
              Lal
            </h1>

            <div className="hero-subtext">
              <span className="hero-line" />
              <TypeAnimation
                sequence={["MSc Student", 1500, "AI Enthusiast", 1500, "3D Portfolio Builder", 1500]}
                speed={50}
                repeat={Infinity}
                style={{
                  fontSize: "22px",
                  lineHeight: 1.6,
                  color: "#b7b0a0",
                  display: "block",
                }}
              />
            </div>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => {
                  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
              </button>

              <button className="btn-secondary">Resume</button>
            </div>

            <div className="scroll-label">Scroll</div>
          </div>

          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-glow" />
              <div className="avatar-frame">
                <img src={avatar} alt="Bhawani Lal avatar" className="avatar-image" />
              </div>

              <div className="avatar-tag">
                <span className="avatar-tag-title">MSc Student</span>
                <span className="avatar-tag-sub">Strathclyde University</span>
              </div>
            </div>
          </div>
        </div>

        <Canvas camera={{ position: [2.5, 0, 5] }} className="hero-canvas">
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} />
          <OrbitControls enableZoom={false} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section elegant-section">
        <div className="section-topline">01 / 04 — Selected Work</div>

        <div className="section-header split-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-description right-align">
            Built while learning software
            <br />
            dev &amp; data science
          </p>
        </div>

        <div className="projects-grid">
          <div className="elegant-card" onMouseEnter={elegantCardEnter} onMouseLeave={elegantCardLeave}>
            <div className="card-number">01</div>
            <h3 className="card-title">Mental Health Chatbot</h3>
            <p className="card-text">
              AI-powered chatbot for supportive conversations, using Gemini API with Supabase
              authentication and persistent chat history.
            </p>

            <div className="tag-wrap">
              {["HTML", "CSS", "JS", "Supabase", "Gemini API"].map((tech) => (
                <span key={tech} className="tag-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn-primary small" onClick={() => setSelectedProject("chatbot")}>
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

          <div className="elegant-card" onMouseEnter={elegantCardEnter} onMouseLeave={elegantCardLeave}>
            <div className="card-number">02</div>
            <h3 className="card-title">Real-Time Facial Recognition</h3>
            <p className="card-text">
              Computer vision project detecting and recognising faces in real-time via CNN,
              processing live webcam input with TensorFlow.
            </p>

            <div className="tag-wrap">
              {["Python", "OpenCV", "TensorFlow", "CNN"].map((tech) => (
                <span key={tech} className="tag-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn-primary small" onClick={() => setSelectedProject("cnn")}>
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

          <div className="elegant-card" onMouseEnter={elegantCardEnter} onMouseLeave={elegantCardLeave}>
            <div className="card-number">03</div>
            <h3 className="card-title">3D Portfolio Website</h3>
            <p className="card-text">
              Interactive personal portfolio built with React &amp; Three.js — 3D hero section,
              animated stars, and smooth scroll experience.
            </p>

            <div className="tag-wrap">
              {["React", "Three.js", "R3F", "CSS"].map((tech) => (
                <span key={tech} className="tag-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn-primary small" onClick={() => setSelectedProject("portfolio")}>
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
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {selectedProject === "chatbot" && "Mental Health Chatbot"}
              {selectedProject === "cnn" && "Real-Time Facial Recognition using CNN"}
              {selectedProject === "portfolio" && "3D Portfolio Website"}
            </h2>

            <p className="modal-text">
              {selectedProject === "chatbot" &&
                "An AI-powered mental health chatbot designed to provide supportive conversations and emotional guidance. This project focuses on creating a safe and calming chat experience with authentication, chat interface design, and intelligent AI-based responses."}

              {selectedProject === "cnn" &&
                "A computer vision project focused on real-time facial recognition using Convolutional Neural Networks. It aims to detect and recognize faces from webcam input and demonstrates practical use of deep learning in image-based recognition tasks."}

              {selectedProject === "portfolio" &&
                "An interactive 3D portfolio website built to showcase projects, skills, blogs, and contact information in a modern and visually engaging way. It combines React with animated 3D elements for a premium user experience."}
            </p>

            <div className="modal-block">
              <h4>Tech Stack</h4>
              <p>
                {selectedProject === "chatbot" && "HTML, CSS, JavaScript, Supabase, Gemini API"}
                {selectedProject === "cnn" && "Python, OpenCV, TensorFlow, CNN"}
                {selectedProject === "portfolio" && "React, JavaScript, React Three Fiber, Three.js, CSS"}
              </p>
            </div>

            <div className="modal-block">
              <h4>Key Features</h4>

              {selectedProject === "chatbot" && (
                <ul>
                  <li>User login and signup</li>
                  <li>Secure authentication with Supabase</li>
                  <li>Supportive chatbot conversation UI</li>
                  <li>AI-generated responses using Gemini API</li>
                </ul>
              )}

              {selectedProject === "cnn" && (
                <ul>
                  <li>Real-time face detection and recognition</li>
                  <li>Deep learning with CNN concepts</li>
                  <li>Webcam-based image input processing</li>
                  <li>Practical computer vision workflow</li>
                </ul>
              )}

              {selectedProject === "portfolio" && (
                <ul>
                  <li>Elegant hero section</li>
                  <li>Animated stars background</li>
                  <li>Project, skills, blog, and contact sections</li>
                  <li>Smooth modern portfolio experience</li>
                </ul>
              )}
            </div>

            <button className="btn-primary small" onClick={() => setSelectedProject(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* SKILLS SECTION */}
      <section id="skills" className="section elegant-section">
        <div className="section-topline">02 / 04 — Technologies</div>
        <h2 className="section-title">Skills</h2>

        <div className="skills-grid">
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "SQL",
            "R",
            "DSA",
            "React",
            "TensorFlow",
            "OpenCV",
            "Three.js",
            "Node.js",
          ].map((skill) => (
            <div key={skill} className="skill-box">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section id="blogs" className="section elegant-section">
        <div className="section-topline">03 / 04 — Writing</div>
        <h2 className="section-title">
          Thoughts &amp;
          <br />
          Reflections
        </h2>

        <div className="blogs-grid">
          <div className="elegant-card" onMouseEnter={elegantCardEnter} onMouseLeave={elegantCardLeave}>
            <div className="card-number">01</div>
            <h3 className="card-title">My Journey to MSc in the UK</h3>
            <p className="card-text">
              Moving to the UK for my MSc was a life-changing decision — adapting to a new
              environment, managing studies, and building projects.
            </p>
            <p className="blog-hashtags">#PersonalGrowth #Career #StudentLife</p>

            <button className="btn-secondary small" onClick={() => setSelectedBlog("journey")}>
              Read More ↗
            </button>
          </div>

          <div className="elegant-card" onMouseEnter={elegantCardEnter} onMouseLeave={elegantCardLeave}>
            <div className="card-number">02</div>
            <h3 className="card-title">How I Started My Self-Improvement Journey</h3>
            <p className="card-text">
              The moment I realised the importance of discipline, focus, and consistency — and how
              it changed my approach to everything.
            </p>
            <p className="blog-hashtags">#SelfGrowth #Discipline #Mindset</p>

            <button className="btn-secondary small" onClick={() => setSelectedBlog("self")}>
              Read More ↗
            </button>
          </div>
        </div>
      </section>

      {/* BLOG MODAL */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {selectedBlog === "journey"
                ? "My Journey to MSc in the UK"
                : "How I Started My Self-Improvement Journey"}
            </h2>

            <p className="modal-text">
              {selectedBlog === "journey"
                ? "This journey taught me independence, adaptability, and the importance of stepping out of my comfort zone. Studying in the UK while managing life and projects has helped me grow both personally and professionally."
                : "My self-improvement journey began when I realized the importance of discipline, focus, and consistency. From improving daily habits to learning new skills like programming and problem-solving, I started working on becoming a better version of myself every day."}
            </p>

            <button className="btn-primary small" onClick={() => setSelectedBlog(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* CONTACT SECTION */}
      <section id="contact" className="section elegant-section contact-section">
        <div className="section-topline">04 / 04 — Get in touch</div>

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
              If you&apos;d like to collaborate, discuss projects, or just connect — feel free to
              reach out.
            </p>

            <div className="contact-actions">
              <a href="mailto:bhawani.lal@hotmail.com" className="btn-primary contact-btn link-btn">
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
          <span className="brand-mark">BL</span>
          <span className="footer-copy">© 2026 Bhawani Lal</span>
        </footer>
      </section>
    </div>
  );
}