import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardNavbar() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "⊞" },
    { label: "Timeline", path: "/timeline", icon: "◎" },
    { label: "Projects", path: "/projects", icon: "◫" },
    { label: "Profile", path: "/profile", icon: "◉" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        .db-nav {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
        }

        .db-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .db-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .db-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.5px;
        }

        .db-logo-text {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .db-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .db-link {
          text-decoration: none;
          color: #6b7280;
          font-size: 13.5px;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 8px;
          transition: all 0.12s ease;
          letter-spacing: -0.01em;
          position: relative;
        }

        .db-link:hover {
          color: #0f172a;
          background: #f5f5f5;
        }

        .db-link.active {
          color: #0f172a;
          background: #f0f0f0;
          font-weight: 600;
        }

        .db-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .db-search-wrap {
          position: relative;
        }

        .db-search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 13px;
          pointer-events: none;
        }

        .db-search {
          width: 220px;
          background: #f8f8f8;
          border: 1px solid #ebebeb;
          border-radius: 9px;
          padding: 8px 12px 8px 32px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          color: #0f172a;
          transition: all 0.15s;
        }

        .db-search::placeholder {
          color: #b0b0b0;
        }

        .db-search:focus {
          border-color: #d1d5db;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.04);
        }

        .db-divider {
          width: 1px;
          height: 24px;
          background: #f0f0f0;
        }

        @media(max-width: 900px) {
          .db-search-wrap { display: none; }
          .db-links { display: none; }
          .db-divider { display: none; }
        }
      `}</style>

      <nav className="db-nav">
        <div className="db-nav-inner">

          <Link to="/dashboard" className="db-logo">
            <div className="db-logo-icon">TF</div>
            <div className="db-logo-text">TimelineForge</div>
          </Link>

          <div className="db-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`db-link ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="db-right">
            <div className="db-search-wrap">
              <span className="db-search-icon">⌕</span>
              <input className="db-search" placeholder="Search..." />
            </div>

            <div className="db-divider" />

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: { width: "34px", height: "34px" },
                },
              }}
            />
          </div>

        </div>
      </nav>
    </>
  );
}