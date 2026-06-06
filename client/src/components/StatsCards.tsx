import { useMe } from "../hooks/useMe";
import { useTimelines } from "../hooks/useTimelines";

export default function StatsCards() {
  const { data: user } = useMe();
  const { data: timelines = [] } = useTimelines();

  const categories = new Set(timelines.map((t) => t.category)).size;

  const cards = [
    {
      title: "Total Entries",
      value: timelines.length,
      change: "+3 this week",
      positive: true,
      accent: "#2563eb",
      bg: "#eff6ff",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
    },
    {
      title: "Growth Score",
      value: user?.growthScore ?? 0,
      change: "+12 pts",
      positive: true,
      accent: "#059669",
      bg: "#ecfdf5",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
    },
    {
      title: "Current Streak",
      value: `${user?.streak ?? 0}d`,
      change: "Personal best!",
      positive: true,
      accent: "#d97706",
      bg: "#fffbeb",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    },
    {
      title: "Categories",
      value: categories,
      change: "Active areas",
      positive: null,
      accent: "#7c3aed",
      bg: "#f5f3ff",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .stats-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          padding: 20px;
          font-family: 'DM Sans', sans-serif;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          cursor: default;
        }

        .stats-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }

        .stats-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .stats-label {
          font-size: 12.5px;
          font-weight: 500;
          color: #9ca3af;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .stats-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-value {
          font-size: 28px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stats-change {
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stats-change.positive { color: #059669; }
        .stats-change.neutral { color: #9ca3af; }

        @media(max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media(max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stats-card" key={card.title}>
            <div className="stats-top">
              <span className="stats-label">{card.title}</span>
              <div
                className="stats-icon-wrap"
                style={{ background: card.bg, color: card.accent }}
              >
                {card.icon}
              </div>
            </div>

            <div className="stats-value">{card.value}</div>

            <div className={`stats-change ${card.positive ? "positive" : "neutral"}`}>
              {card.positive && <span>↑</span>}
              <span>{card.change}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}