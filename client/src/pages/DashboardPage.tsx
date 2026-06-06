import { useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import StatsCards from "../components/StatsCards";
import EntriesByCategory from "../components/EntriesByCategory";
import ImpactOverTime from "../components/ImpactOverTime";
import TimelineFeed from "../components/TimelineFeed";
import CreateTimelineForm from "../components/CreateTimelineForm";

import { useMe } from "../hooks/useMe";
import { useTimelines } from "../hooks/useTimelines";

export default function Dashboard() {
  const { data: user, loading } = useMe();
  const { data: timelines = [] } = useTimelines();
  const [showCreate, setShowCreate] = useState(false);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        color: "#9ca3af",
      }}>
        Loading...
      </div>
    );
  }

  const firstName = user?.displayName?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        .dash-page {
          background: #fafafa;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .dash-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 28px 60px;
        }

        .dash-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          gap: 16px;
        }

        .dash-greeting {
          font-size: 12.5px;
          font-weight: 500;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .dash-headline {
          font-family: 'Instrument Serif', serif;
          font-size: 26px;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin: 0;
          font-weight: 400;
        }

        .dash-headline em {
          font-style: italic;
          color: #4b5563;
        }

        .dash-create-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .dash-create-btn:hover {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(15,23,42,0.2);
        }

        .dash-create-btn:active {
          transform: translateY(0);
        }

        .dash-create-icon {
          width: 18px;
          height: 18px;
          background: rgba(255,255,255,0.15);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          line-height: 1;
        }

        .dash-section-label {
          font-size: 11px;
          font-weight: 600;
          color: #d1d5db;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 28px 0 14px;
        }

        .dash-charts {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 14px;
          margin-top: 14px;
        }

        .dash-feed {
          margin-top: 14px;
        }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.4);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          animation: fadeIn 0.15s ease;
        }

        .modal-content {
          animation: slideUp 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media(max-width: 768px) {
          .dash-charts { grid-template-columns: 1fr; }
          .dash-hero { flex-direction: column; align-items: flex-start; }
          .dash-inner { padding: 20px 16px 40px; }
        }
      `}</style>

      <DashboardNavbar />

      <div className="dash-page">
        <div className="dash-inner">

          <div className="dash-hero">
            <div>
              <div className="dash-greeting">{greeting}</div>
              <h1 className="dash-headline">
                Welcome back, <em>{firstName}</em>
              </h1>
            </div>

            <button className="dash-create-btn" onClick={() => setShowCreate(true)}>
              <div className="dash-create-icon">+</div>
              New Entry
            </button>
          </div>

          <div className="dash-section-label">Overview</div>
          <StatsCards timelines={timelines} user={user} />

          <div className="dash-section-label">Analytics</div>
          <div className="dash-charts">
            <EntriesByCategory />
            <ImpactOverTime />
          </div>

          <div className="dash-section-label">Recent Activity</div>
          <div className="dash-feed">
            <TimelineFeed />
          </div>

        </div>
      </div>

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CreateTimelineForm onClose={() => setShowCreate(false)} />
          </div>
        </div>
      )}
    </>
  );
}