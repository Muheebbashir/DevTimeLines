import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        .auth-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #fafafa;
        }

        /* RIGHT becomes the signup form side */
        .auth-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          background: #fff;
          order: 1;
        }

        .auth-right-inner {
          width: 100%;
          max-width: 400px;
        }

        .auth-right-top {
          margin-bottom: 32px;
        }

        .auth-right-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #d1d5db;
          margin-bottom: 10px;
        }

        .auth-right-title {
          font-family: 'Instrument Serif', serif;
          font-size: 28px;
          font-weight: 400;
          color: #0f172a;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .auth-right-sub {
          font-size: 13.5px;
          color: #9ca3af;
        }

        .auth-right-sub a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-right-sub a:hover {
          text-decoration: underline;
        }

        /* LEFT becomes the decorative panel */
        .auth-left {
          background: #0f172a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
          order: 2;
        }

        .auth-left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .auth-brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .auth-brand-name {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .auth-left-body {
          position: relative;
          z-index: 1;
        }

        .auth-left-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4b5563;
          margin-bottom: 16px;
        }

        .auth-left-headline {
          font-family: 'Instrument Serif', serif;
          font-size: 38px;
          line-height: 1.15;
          color: #fff;
          margin: 0 0 20px;
          font-weight: 400;
          max-width: 340px;
        }

        .auth-left-headline em {
          font-style: italic;
          color: #94a3b8;
        }

        .auth-left-desc {
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          max-width: 320px;
        }

        /* Feature list */
        .auth-features {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .auth-feature-dot {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .auth-feature-check {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #475569;
        }

        .auth-feature-text {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.5;
        }

        .auth-feature-text strong {
          color: #94a3b8;
          font-weight: 500;
        }

        @media(max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 40px 24px; order: 1; }
        }
      `}</style>

      <div className="auth-page">

        {/* Form panel — left on sign-up */}
        <div className="auth-right">
          <div className="auth-right-inner">
            <div className="auth-right-top">
              <div className="auth-right-eyebrow">Free forever</div>
              <h1 className="auth-right-title">Create your account</h1>
              <p className="auth-right-sub">
                Already have one?{" "}
                <a href="/sign-in">Sign in</a>
              </p>
            </div>

            <SignUp
              forceRedirectUrl="/dashboard"
              appearance={{
                variables: {
                  colorPrimary: "#0f172a",
                  colorBackground: "#ffffff",
                  colorText: "#0f172a",
                  colorTextSecondary: "#6b7280",
                  colorInputBackground: "#fafafa",
                  colorInputText: "#0f172a",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                },
                elements: {
                  rootBox: { width: "100%" },
                  card: {
                    boxShadow: "none",
                    border: "none",
                    padding: "0",
                    background: "transparent",
                  },
                  headerTitle: { display: "none" },
                  headerSubtitle: { display: "none" },
                },
              }}
            />
          </div>
        </div>

        {/* Decorative panel — right on sign-up */}
        <div className="auth-left">
          <div className="auth-left-grid" />

          <div className="auth-brand">
            <div className="auth-brand-icon">TF</div>
            <div className="auth-brand-name">TimelineForge</div>
          </div>

          <div className="auth-left-body">
            <div className="auth-left-eyebrow">Start your journey</div>
            <h2 className="auth-left-headline">
              Build the life you want to <em>remember</em>
            </h2>
            <p className="auth-left-desc">
              Join thousands of people tracking their growth, habits, and milestones every day.
            </p>
          </div>

          <div className="auth-features">
            {[
              { title: "Timeline entries", desc: "Log projects, wins, and milestones as they happen." },
              { title: "Growth analytics", desc: "Charts and scores that show your real progress." },
              { title: "Streak tracking", desc: "Stay consistent with daily habit streaks." },
              { title: "Always free", desc: "Core features are free. No credit card needed." },
            ].map((f) => (
              <div className="auth-feature" key={f.title}>
                <div className="auth-feature-dot">
                  <div className="auth-feature-check" />
                </div>
                <div className="auth-feature-text">
                  <strong>{f.title}</strong> — {f.desc}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}