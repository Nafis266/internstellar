import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "ISS Tracker", path: "/issTracker" },
  { label: "Sky Map", path: "/skymap" },
  { label: "Events", path: "/events" },
];

export default function Navbar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .st-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: linear-gradient(to bottom, rgba(5,7,15,0.95) 0%, transparent 100%);
          font-family: 'Space Grotesk', sans-serif;
        }
        .st-logo { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; color: #E8EDF5; text-decoration: none; }
        .st-logo-icon { width: 32px; height: 32px; border-radius: 8px; background: #00FFD1; display: flex; align-items: center; justify-content: center; }
        .st-nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .st-nav-links a { font-size: 14px; color: #6B729C; text-decoration: none; transition: color 0.2s; }
        .st-nav-links a:hover { color: #E8EDF5; }
        @media (max-width: 900px) { .st-nav { padding: 16px 24px; } .st-nav-links { display: none; } }
      `}</style>

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
              <Link to={l.path}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
