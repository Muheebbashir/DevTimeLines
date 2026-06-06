import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
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

        /* LEFT PANEL */
        .auth-left {
          background: #0f172a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .auth-left-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          opacity: 0.4;
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

        .auth-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .auth-stat {
          background: rgba(255,255,255,0.03);
          padding: 18px 20px;
          text-align: center;
        }

        .auth-stat-val {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
        }

        .auth-stat-lbl {
          font-size: 11px;
          color: #475569;
          margin-top: 3px;
          font-weight: 500;
        }

        /* RIGHT PANEL */
        .auth-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          background: #fff;
        }

        .auth-right-inner {
          width: 100%;
          max-width: 400px;
        }

        .auth-right-top {
          margin-bottom: 32px;
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

        /* Clerk component override */
        .auth-right .cl-rootBox {
          width: 100%;
        }

        .auth-right .cl-card {
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
          background: transparent !important;
        }

        .auth-right .cl-headerTitle,
        .auth-right .cl-headerSubtitle {
          display: none !important;
        }

        .auth-right .cl-socialButtonsBlockButton {
          border-radius: 10px !important;
          border: 1px solid #f0f0f0 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13.5px !important;
          font-weight: 500 !important;
          height: 42px !important;
          transition: all 0.15s !important;
        }

        .auth-right .cl-socialButtonsBlockButton:hover {
          background: #f8f8f8 !important;
          border-color: #e5e7eb !important;
        }

        .auth-right .cl-formFieldInput {
          border-radius: 10px !important;
          border: 1px solid #f0f0f0 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          height: 42px !important;
          background: #fafafa !important;
        }

        .auth-right .cl-formFieldInput:focus {
          background: #fff !important;
          border-color: #d1d5db !important;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.05) !important;
        }

        .auth-right .cl-formButtonPrimary {
          border-radius: 10px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          height: 42px !important;
          letter-spacing: -0.01em !important;
        }

        .auth-right .cl-dividerLine {
          background: #f0f0f0 !important;
        }

        .auth-right .cl-dividerText {
          font-family: 'DM Sans', sans-serif !important;
          font-size: 12px !important;
          color: #d1d5db !important;
        }

        .auth-right .cl-footerActionText,
        .auth-right .cl-footerActionLink {
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
        }

        @media(max-width: 768px) {
          .auth-page {
            grid-template-columns: 1fr;
          }
          .auth-left {
            display: none;
          }
          .auth-right {
            padding: 40px 24px;
          }
        }
      `}</style>

      <div className="auth-page">

        {/* Left decorative panel */}
        <div className="auth-left">
          <div className="auth-left-noise" />
          <div className="auth-left-grid" />

          <div className="auth-brand">
            <div className="auth-brand-icon">TF</div>
            <div className="auth-brand-name">TimelineForge</div>
          </div>

          <div className="auth-left-body">
            <div className="auth-left-eyebrow">Personal Growth OS</div>
            <h2 className="auth-left-headline">
              Track every step of your <em>journey</em>
            </h2>
            <p className="auth-left-desc">
              Log milestones, visualize progress, and build lasting habits — all in one focused dashboard.
            </p>
          </div>

          <div className="auth-stats">
            <div className="auth-stat">
              <div className="auth-stat-val">24k</div>
              <div className="auth-stat-lbl">Entries logged</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-val">87%</div>
              <div className="auth-stat-lbl">Avg. growth score</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat-val">12d</div>
              <div className="auth-stat-lbl">Avg. streak</div>
            </div>
          </div>
        </div>

        {/* Right auth panel */}
        <div className="auth-right">
          <div className="auth-right-inner">
            <div className="auth-right-top">
              <h1 className="auth-right-title">Welcome back</h1>
              <p className="auth-right-sub">
                Don't have an account?{" "}
                <a href="/sign-up">Sign up free</a>
              </p>
            </div>

            <SignIn
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

      </div>
    </>
  );
}