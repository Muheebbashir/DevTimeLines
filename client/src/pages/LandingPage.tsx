import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #fff;
          color: #0f172a;
        }

        .lp-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 28px;
        }

        /* ── NAVBAR ── */
        .lp-nav {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f3f4f6;
          position: sticky;
          top: 0;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          z-index: 50;
        }

        .lp-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }

        .lp-logo-icon {
          width: 30px;
          height: 30px;
          background: #0f172a;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .lp-logo-text {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .lp-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-btn-ghost {
          padding: 8px 16px;
          border-radius: 9px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.12s;
        }

        .lp-btn-ghost:hover {
          color: #0f172a;
          background: #f5f5f5;
        }

        .lp-btn-solid {
          padding: 8px 18px;
          border-radius: 9px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          background: #0f172a;
          color: #fff;
          transition: all 0.15s;
          letter-spacing: -0.01em;
        }

        .lp-btn-solid:hover {
          background: #1e293b;
          box-shadow: 0 4px 14px rgba(15,23,42,0.2);
          transform: translateY(-1px);
        }

        /* ── HERO ── */
        .lp-hero {
          padding: 100px 0 80px;
          text-align: center;
        }

        .lp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #f8f8f8;
          border: 1px solid #ebebeb;
          border-radius: 999px;
          font-size: 12.5px;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 28px;
          letter-spacing: 0.01em;
        }

        .lp-hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }

        .lp-hero-title {
          font-family: 'Instrument Serif', serif;
          font-size: 68px;
          line-height: 1.08;
          font-weight: 400;
          max-width: 780px;
          margin: 0 auto 6px;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .lp-hero-title em {
          font-style: italic;
          color: #94a3b8;
        }

        .lp-hero-sub {
          max-width: 520px;
          margin: 20px auto 0;
          color: #9ca3af;
          font-size: 16px;
          line-height: 1.75;
          font-weight: 400;
        }

        .lp-hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 36px;
        }

        .lp-btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 11px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          background: #0f172a;
          color: #fff;
          transition: all 0.15s;
          letter-spacing: -0.01em;
        }

        .lp-btn-cta:hover {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(15,23,42,0.22);
        }

        .lp-btn-text {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 20px;
          border-radius: 11px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          border: 1px solid #f0f0f0;
          transition: all 0.12s;
        }

        .lp-btn-text:hover {
          color: #0f172a;
          border-color: #e5e7eb;
          background: #fafafa;
        }

        .lp-hero-note {
          margin-top: 16px;
          font-size: 12px;
          color: #d1d5db;
          font-weight: 500;
        }

        /* ── STATS ROW ── */
        .lp-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #f3f4f6;
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          overflow: hidden;
          margin-top: 64px;
        }

        .lp-stat {
          background: #fff;
          padding: 28px 32px;
          text-align: center;
        }

        .lp-stat-val {
          font-family: 'Instrument Serif', serif;
          font-size: 40px;
          font-weight: 400;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .lp-stat-lbl {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
          font-weight: 500;
        }

        /* ── PREVIEW ── */
        .lp-preview {
          margin-top: 80px;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 1px 40px rgba(0,0,0,0.04);
        }

        .lp-preview-bar {
          background: #f8f8f8;
          border-bottom: 1px solid #f0f0f0;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lp-preview-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e5e7eb;
        }

        .lp-preview-url {
          flex: 1;
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 12px;
          color: #9ca3af;
          font-family: 'DM Sans', sans-serif;
          margin: 0 8px;
        }

        .lp-preview-body {
          background: #fafafa;
          padding: 24px;
        }

        .lp-preview-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .lp-preview-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 16px;
          height: 80px;
          position: relative;
          overflow: hidden;
        }

        .lp-preview-card::after {
          content: '';
          position: absolute;
          bottom: 12px;
          left: 16px;
          right: 16px;
          height: 6px;
          background: #f3f4f6;
          border-radius: 4px;
        }

        .lp-preview-card-dot {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .lp-preview-chart {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          height: 180px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          gap: 6px;
        }

        .lp-chart-bar {
          flex: 1;
          border-radius: 4px 4px 0 0;
          background: #f3f4f6;
          transition: background 0.2s;
        }

        .lp-chart-bar.hi { background: #dbeafe; }

        /* ── FEATURES ── */
        .lp-features {
          padding: 100px 0;
        }

        .lp-section-eyebrow {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #d1d5db;
          margin-bottom: 14px;
        }

        .lp-section-title {
          font-family: 'Instrument Serif', serif;
          text-align: center;
          font-size: 44px;
          font-weight: 400;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin-bottom: 56px;
          line-height: 1.1;
        }

        .lp-section-title em {
          font-style: italic;
          color: #94a3b8;
        }

        .lp-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .lp-feat-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 28px;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .lp-feat-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .lp-feat-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .lp-feat-title {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .lp-feat-desc {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 1.7;
        }

        /* ── CTA BANNER ── */
        .lp-cta {
          background: #0f172a;
          border-radius: 20px;
          padding: 64px 48px;
          text-align: center;
          margin-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .lp-cta-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .lp-cta-title {
          font-family: 'Instrument Serif', serif;
          font-size: 42px;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .lp-cta-title em {
          font-style: italic;
          color: #64748b;
        }

        .lp-cta-sub {
          font-size: 15px;
          color: #475569;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .lp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 11px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          background: #fff;
          color: #0f172a;
          transition: all 0.15s;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
        }

        .lp-cta-btn:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* ── FOOTER ── */
        .lp-footer {
          border-top: 1px solid #f3f4f6;
          padding: 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lp-footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lp-footer-logo {
          width: 24px;
          height: 24px;
          background: #0f172a;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
        }

        .lp-footer-name {
          font-size: 13px;
          font-weight: 500;
          color: #9ca3af;
        }

        .lp-footer-right {
          font-size: 12px;
          color: #d1d5db;
        }

        @media(max-width: 900px) {
          .lp-hero-title { font-size: 42px; }
          .lp-section-title { font-size: 32px; }
          .lp-stats { grid-template-columns: 1fr; }
          .lp-feat-grid { grid-template-columns: 1fr; }
          .lp-preview-cards { grid-template-columns: repeat(2, 1fr); }
          .lp-hero-actions { flex-direction: column; }
          .lp-cta { padding: 48px 24px; }
          .lp-cta-title { font-size: 30px; }
          .lp-footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <div className="lp">
        <div className="lp-container">

          {/* NAVBAR */}
          <nav className="lp-nav">
            <Link to="/" className="lp-logo">
              <div className="lp-logo-icon">TF</div>
              <div className="lp-logo-text">TimelineForge</div>
            </Link>

            <div className="lp-nav-right">
              <Link to="/sign-in" className="lp-btn-ghost">Sign in</Link>
              <Link to="/sign-up" className="lp-btn-solid">Get started →</Link>
            </div>
          </nav>

          {/* HERO */}
          <section className="lp-hero">
            <div className="lp-hero-badge">
              <div className="lp-hero-badge-dot" />
              Now in public beta
            </div>

            <h1 className="lp-hero-title">
              Your growth story,<br /><em>beautifully</em> documented
            </h1>

            <p className="lp-hero-sub">
              Log milestones, track streaks, and visualize your progress — all in one focused dashboard built for personal growth.
            </p>

            <div className="lp-hero-actions">
              <Link to="/sign-up" className="lp-btn-cta">
                Start for free →
              </Link>
              <Link to="/sign-in" className="lp-btn-text">
                View dashboard
              </Link>
            </div>

            <div className="lp-hero-note">No credit card required · Free forever</div>

            {/* STATS */}
            <div className="lp-stats">
              <div className="lp-stat">
                <div className="lp-stat-val">24k</div>
                <div className="lp-stat-lbl">Timeline entries logged</div>
              </div>
              <div className="lp-stat">
                <div className="lp-stat-val">87</div>
                <div className="lp-stat-lbl">Average growth score</div>
              </div>
              <div className="lp-stat">
                <div className="lp-stat-val">12d</div>
                <div className="lp-stat-lbl">Average streak length</div>
              </div>
            </div>
          </section>

          {/* DASHBOARD PREVIEW */}
          <div className="lp-preview">
            <div className="lp-preview-bar">
              <div className="lp-preview-dot" />
              <div className="lp-preview-dot" />
              <div className="lp-preview-dot" />
              <div className="lp-preview-url">app.timelineforge.com/dashboard</div>
            </div>
            <div className="lp-preview-body">
              <div className="lp-preview-cards">
                {[
                  { color: "#dbeafe" },
                  { color: "#dcfce7" },
                  { color: "#fef9c3" },
                  { color: "#f3e8ff" },
                ].map((c, i) => (
                  <div className="lp-preview-card" key={i}>
                    <div className="lp-preview-card-dot" style={{ background: c.color }} />
                  </div>
                ))}
              </div>
              <div className="lp-preview-chart">
                {[30, 50, 40, 70, 55, 90, 75, 85, 60, 95, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className={`lp-chart-bar${h > 70 ? " hi" : ""}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <section className="lp-features">
            <div className="lp-section-eyebrow">Everything you need</div>
            <h2 className="lp-section-title">
              Built for people who take<br /><em>growth seriously</em>
            </h2>

            <div className="lp-feat-grid">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                    </svg>
                  ),
                  bg: "#eff6ff",
                  title: "Growth Analytics",
                  desc: "Powerful charts and scores that reflect your real improvement over time — not vanity metrics.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ),
                  bg: "#fffbeb",
                  title: "Streak Tracking",
                  desc: "Build daily consistency with streaks that keep you accountable and motivated.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  bg: "#f5f3ff",
                  title: "Timeline Feed",
                  desc: "Every milestone, project, and win logged in chronological order — your story, always at hand.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  ),
                  bg: "#ecfdf5",
                  title: "Milestone Management",
                  desc: "Capture achievements with categories, impact scores, and rich notes.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  ),
                  bg: "#fdf2f8",
                  title: "Category Breakdown",
                  desc: "See which areas of your life you're investing in — and where there's room to grow.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  bg: "#f0f9ff",
                  title: "Private & Secure",
                  desc: "Your growth data belongs to you. Always private, always protected.",
                },
              ].map((f) => (
                <div className="lp-feat-card" key={f.title}>
                  <div className="lp-feat-icon" style={{ background: f.bg }}>
                    {f.icon}
                  </div>
                  <div className="lp-feat-title">{f.title}</div>
                  <div className="lp-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BANNER */}
          <div className="lp-cta">
            <div className="lp-cta-grid" />
            <h2 className="lp-cta-title">
              Start building your<br /><em>timeline today</em>
            </h2>
            <p className="lp-cta-sub">Free to use. No credit card. Takes 30 seconds.</p>
            <Link to="/sign-up" className="lp-cta-btn">
              Create your account →
            </Link>
          </div>

          {/* FOOTER */}
          <footer className="lp-footer">
            <div className="lp-footer-left">
              <div className="lp-footer-logo">TF</div>
              <span className="lp-footer-name">TimelineForge</span>
            </div>
            <div className="lp-footer-right">© {new Date().getFullYear()} TimelineForge. All rights reserved.</div>
          </footer>

        </div>
      </div>
    </>
  );
}