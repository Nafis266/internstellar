import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
 
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
    :root {
    --void: #05070F;
    --deep: #0C0F1E;
    --indigo: #1B1F4A;
    --dim: #2E3363;
    --muted: #6B729C;
    --star: #C8D0F0;
    --white: #E8EDF5;
    --cyan: #00FFD1;
    --cyan-dim: rgba(0,255,209,0.12);
    --accent: #7B8CFF;
  }
 
  html, body, #root {
    background: var(--void);
    color: var(--white);
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }
 
  .st-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: linear-gradient(to bottom, rgba(5,7,15,0.95) 0%, transparent 100%);
  }
  .st-logo { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; letter-spacing: -0.3px; color: var(--white); text-decoration: none; cursor: pointer; }
  .st-logo-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--cyan); display: flex; align-items: center; justify-content: center; }
  .st-nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
  .st-nav-links a { font-size: 14px; font-weight: 400; color: var(--muted); text-decoration: none; letter-spacing: 0.02em; transition: color 0.2s; cursor: pointer; }
  .st-nav-links a:hover, .st-nav-links a.active { color: var(--white); }
  .st-nav-cta { font-size: 13px; font-weight: 600; background: var(--cyan); color: #05070F; padding: 8px 20px; border-radius: 6px; border: none; cursor: pointer; letter-spacing: 0.02em; transition: opacity 0.2s; }
  .st-nav-cta:hover { opacity: 0.85; }
 
  .st-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
 
  .st-btn-primary { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; background: var(--cyan); color: #05070F; padding: 14px 32px; border-radius: 8px; border: none; cursor: pointer; letter-spacing: 0.01em; transition: opacity 0.2s, transform 0.15s; }
  .st-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .st-btn-ghost { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 500; background: transparent; color: var(--star); padding: 14px 28px; border-radius: 8px; border: 1px solid var(--dim); cursor: pointer; letter-spacing: 0.01em; transition: border-color 0.2s, color 0.2s; }
  .st-btn-ghost:hover { border-color: var(--muted); color: var(--white); }
 
  .st-section { position: relative; z-index: 1; padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
  .st-section-title { font-size: 40px; font-weight: 700; letter-spacing: -1.2px; color: var(--white); margin-bottom: 56px; max-width: 480px; line-height: 1.15; }
  .st-features-grid { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid var(--indigo); border-radius: 12px; overflow: hidden; }
  .st-feature-card { background: var(--deep); padding: 32px 28px; display: flex; flex-direction: column; gap: 16px; transition: background 0.25s; cursor: default; border-right: 1px solid var(--indigo); }
  .st-feature-card:last-child { border-right: none; }
  .st-feature-card:hover { background: #0F1324; }
  

  .st-feature-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--cyan-dim); display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
  .st-feature-h3 { font-size: 15px; font-weight: 600; color: var(--white); letter-spacing: -0.2px; line-height: 1.3; }
  .st-feature-p { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.65; }
  .st-feature-tag { margin-top: auto; display: inline-flex; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--cyan); letter-spacing: 0.08em; text-transform: uppercase; gap: 6px; }
  .st-feature-tag::before { content:''; display:block; width:16px; height:1px; background:var(--cyan); }
 
  .st-cta-section { position: relative; z-index: 1; padding: 120px 48px; text-align: center; max-width: 700px; margin: 0 auto; }
  .st-cta-h2 { font-size: clamp(36px,5vw,58px); font-weight: 700; letter-spacing: -2px; line-height: 1.1; color: var(--white); margin-bottom: 20px; }
  .st-cta-h2 span { color: var(--cyan); }
  .st-cta-p { font-size: 16px; font-weight: 300; color: var(--muted); margin-bottom: 40px; line-height: 1.7; }
  .st-cta-actions { display: flex; justify-content: center; align-items: center; gap: 14px; }

  .st-footer { position: relative; z-index: 1; border-top: 1px solid var(--indigo); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; }
  .st-footer-logo { font-size: 14px; font-weight: 600; color: var(--star); letter-spacing: 0.03em; }
  .st-footer-links { display: flex; gap: 28px; list-style: none; }
  .st-footer-links a { font-size: 12px; color: var(--dim); text-decoration: none; letter-spacing: 0.03em; transition: color 0.2s; cursor: pointer; }
  .st-footer-links a:hover { color: var(--star); }
  .st-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--star); letter-spacing: 0.06em; }
  
  @media (max-width: 900px) {
    .st-nav { padding: 16px 24px; }
    .st-nav-links { display: none; }
    .st-features-grid { grid-template-columns: repeat(2,1fr); }
    .st-section { padding: 60px 24px; }
    .st-cta-section { padding: 80px 24px; }
    .st-footer { flex-direction: column; gap: 20px; text-align: center; padding: 24px; }
    .st-footer-links { flex-wrap: wrap; justify-content: center; }
  }
  @media (max-width: 560px) {
    .st-features-grid { grid-template-columns: 1fr; }
    .st-cta-actions { flex-direction: column; }
  }
`;
const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "ISS Tracker", path: "/issTracker" },
  { label: "Sky Map", path: "/skymap" },
  { label: "Events", path: "/events" },
];
const FEATURES = [
  {
    tag: "Real-time",
    title: "Live ISS Tracker",
    desc: "Real-time orbital position updated every second. Know exactly when it'll pass over your rooftop.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M19 12a7 7 0 0 0-7-7" />
      </svg>
    ),
  },
  {
    tag: "Augmented",
    title: "Sky Maps",
    desc: "Point your cursor up and see every constellation, planet, and deep-sky object overlaid in AR.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tag: "Personalised",
    title: "Celestial Alerts",
    desc: "Meteor showers, eclipses, planetary conjunctions — notified the night before, not the morning after.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    tag: "Live data",
    title: "Solar Dashboard",
    desc: "Live sunspot data, solar wind speeds, and geomagnetic storm warnings. Know before the aurora comes.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
];

function Starfield() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const issRef = useRef({ x: -60, y: 0, trail: [] });
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.7 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.003,
      }));
      issRef.current = { x: -60, y: canvas.height * 0.28, trail: [] };
    };
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dx = (mouseRef.current.x / canvas.width - 0.5) * 12;
      const dy = (mouseRef.current.y / canvas.height - 0.5) * 6;

      starsRef.current.forEach((s) => {
        s.twinkle += s.speed;
        const opacity = s.o * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x + dx * (s.r / 1.6), s.y + dy * (s.r / 1.6), s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,208,240,${opacity})`;
        ctx.fill();
      });

      const iss = issRef.current;
      iss.x += 1.2;
      if (iss.x > canvas.width + 80) {
        iss.x = -60;
        iss.y = canvas.height * (0.15 + Math.random() * 0.3);
      }
      iss.trail.push({ x: iss.x, y: iss.y });
      if (iss.trail.length > 60) iss.trail.shift();

      iss.trail.forEach((pt, i) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,209,${(i / iss.trail.length) * 0.45})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(iss.x, iss.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#00FFD1";
      ctx.fill();

      ctx.strokeStyle = "rgba(0,255,209,0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(iss.x - 8, iss.y);
      ctx.lineTo(iss.x + 8, iss.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(iss.x, iss.y - 5);
      ctx.lineTo(iss.x, iss.y + 5);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="st-canvas" />;
}


export default function Home() {
  return (
    <>
      <style>{styles}</style>

      <Starfield />

      <nav className="st-nav">
        <div className="st-logo">
          <div className="st-logo-icon">
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="#05070F" strokeWidth="2" strokeLinecap="round">
              <circle cx="9" cy="9" r="3" />
              <path d="M9 2v2M9 14v2M2 9h2M14 9h2" />
              <path d="M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" />
            </svg>
          </div>
          INTERNSTELLAR
        </div>
        <ul className="st-nav-links">
            {NAV_LINKS.map((l) => (
                <li key={l.label}>
                    <Link to={l.path}>
                    {l.label}
                    </Link>
                </li>
            ))}
        </ul>
      </nav>


      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="st-section">
          <div className="st-section-title">Space made immediate.</div>
          <div className="st-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="st-feature-card">
                <div className="st-feature-icon">{f.icon}</div>
                <div className="st-feature-h3">{f.title}</div>
                <p className="st-feature-p">{f.desc}</p>
                <div className="st-feature-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="st-cta-section">
        <h2 className="st-cta-h2">
          Your next view is
          <br />
          <span>overhead.</span>
        </h2>
        <p className="st-cta-p">
          Join thousands of people who've started seeing the night sky differently.
          Start with live ISS tracking — free, no account needed.
        </p>
        <div className="st-cta-actions">
          <button className="st-btn-primary">Start tracking now</button>
          <button className="st-btn-ghost">View the sky map</button>
        </div>
      </div>

      <footer className="st-footer">
        <div className="st-footer-logo">INTERNSTELLAR <br></br> - By VIBE CODERS</div>
        <ul className="st-footer-links">
          {["ISS Tracker", "Sky Map", "Events", "Visualise", "About"].map((l) => (
            <li key={l}>
              <a>{l}</a>
            </li>
          ))}
        </ul>
        <div className="st-footer-copy">&copy; 2026 INTERNSTELLAR</div>
      </footer>
    </>
  );
}