import { Link } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { useMe } from "../hooks/useMe";
import { useTimelines } from "../hooks/useTimelines";
import AchievementsCard from "./AchievementsCard";

const CATEGORY_COLORS: Record<string, string> = {
  Development: "#2563eb",
  Fitness:     "#16a34a",
  Education:   "#d97706",
  Career:      "#7c3aed",
  Personal:    "#db2777",
  Other:       "#475569",
};

const CATEGORY_BG: Record<string, string> = {
  Development: "#eff6ff",
  Fitness:     "#ecfdf5",
  Education:   "#fffbeb",
  Career:      "#f5f3ff",
  Personal:    "#fdf2f8",
  Other:       "#f8fafc",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function getScoreLabel(score: number) {
  if (score >= 80) return { label: "Elite", color: "#7c3aed", bg: "#f5f3ff" };
  if (score >= 60) return { label: "Advanced", color: "#2563eb", bg: "#eff6ff" };
  if (score >= 40) return { label: "Growing", color: "#059669", bg: "#ecfdf5" };
  return { label: "Starter", color: "#d97706", bg: "#fffbeb" };
}

export default function ProfilePage() {
  const { data: user, loading } = useMe();
  const { data: timelines = [] } = useTimelines();

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <div style={{
          minHeight: "100vh", background: "#fafafa",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#9ca3af",
        }}>
          Loading profile...
        </div>
      </>
    );
  }

  if (!user) return null;

  const scoreInfo = getScoreLabel(user.growthScore);
  const recentTimelines = [...timelines]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const categoryCounts: Record<string, number> = {};
  timelines.forEach(t => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const avgImpact = timelines.length
    ? (timelines.reduce((s, t) => s + t.impactScore, 0) / timelines.length).toFixed(1)
    : "—";

  const highImpactCount = timelines.filter(t => t.impactScore >= 8).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        .prof-page {
          background: #fafafa;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding: 28px 28px 64px;
        }

        .prof-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          align-items: start;
        }

        /* ── SIDEBAR ── */
        .prof-sidebar {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .prof-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          overflow: hidden;
        }

        .prof-identity {
          padding: 28px 24px 24px;
          text-align: center;
          border-bottom: 1px solid #f5f5f5;
        }

        .prof-avatar-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .prof-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #fff;
          box-shadow: 0 0 0 1px #f0f0f0;
          display: block;
        }

        .prof-avatar-fallback {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -1px;
          border: 3px solid #fff;
          box-shadow: 0 0 0 1px #f0f0f0;
        }

        .prof-score-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prof-score-badge svg {
          width: 10px;
          height: 10px;
        }

        .prof-name {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }

        .prof-username {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 12px;
        }

        .prof-level-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .prof-bio {
          padding: 16px 24px;
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.65;
          border-bottom: 1px solid #f5f5f5;
        }

        .prof-bio-empty {
          color: #d1d5db;
          font-style: italic;
        }

        .prof-meta-list {
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .prof-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #6b7280;
        }

        .prof-meta-icon {
          width: 28px;
          height: 28px;
          background: #f5f5f5;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #9ca3af;
        }

        /* ── MAIN ── */
        .prof-main {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .prof-section-label {
          font-size: 11px;
          font-weight: 600;
          color: #d1d5db;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
          padding: 0 2px;
        }

        /* Stats grid */
        .prof-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .prof-stat-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          padding: 18px 16px;
        }

        .prof-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .prof-stat-label {
          font-size: 11.5px;
          font-weight: 500;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .prof-stat-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prof-stat-value {
          font-family: 'Instrument Serif', serif;
          font-size: 30px;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 4px;
        }

        .prof-stat-sub {
          font-size: 11.5px;
          color: #d1d5db;
          font-weight: 500;
        }

        /* Category breakdown */
        .prof-cats-list {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .prof-cat-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .prof-cat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .prof-cat-name {
          font-size: 13.5px;
          color: #374151;
          font-weight: 500;
          min-width: 90px;
        }

        .prof-cat-bar-wrap {
          flex: 1;
          height: 6px;
          background: #f5f5f5;
          border-radius: 999px;
          overflow: hidden;
        }

        .prof-cat-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.6s ease;
        }

        .prof-cat-count {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          min-width: 24px;
          text-align: right;
        }

        /* Timeline feed */
        .prof-feed {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .prof-feed-item {
          display: flex;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #f5f5f5;
          position: relative;
        }

        .prof-feed-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .prof-feed-item:first-child {
          padding-top: 0;
        }

        .prof-feed-dot {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 12px;
          font-weight: 700;
        }

        .prof-feed-body {
          flex: 1;
          min-width: 0;
        }

        .prof-feed-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .prof-feed-desc {
          font-size: 12.5px;
          color: #9ca3af;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prof-feed-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }

        .prof-feed-time {
          font-size: 11.5px;
          color: #d1d5db;
          font-weight: 500;
        }

        .prof-impact-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 5px;
        }

        .prof-card-header {
          padding: 18px 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .prof-card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .prof-view-all {
          font-size: 12.5px;
          color: #9ca3af;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.12s;
        }

        .prof-view-all:hover { color: #0f172a; }

        .prof-empty {
          padding: 32px 24px;
          text-align: center;
          font-size: 13px;
          color: #d1d5db;
        }

        @media(max-width: 900px) {
          .prof-inner {
            grid-template-columns: 1fr;
          }
          .prof-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .prof-page {
            padding: 20px 16px 48px;
          }
        }
      `}</style>

      <DashboardNavbar />

      <div className="prof-page">
        <div className="prof-inner">

          {/* ── SIDEBAR ── */}
          <div className="prof-sidebar">

            {/* Identity card */}
            <div className="prof-card">
              <div className="prof-identity">
                <div className="prof-avatar-wrap">
                  {user.avatar
                    ? <img src={user.avatar} alt={user.displayName} className="prof-avatar" />
                    : (
                      <div className="prof-avatar-fallback">
                        {user.displayName?.slice(0, 2).toUpperCase() ?? "??"}
                      </div>
                    )
                  }
                  <div
                    className="prof-score-badge"
                    style={{ background: scoreInfo.bg }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke={scoreInfo.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <div className="prof-name">{user.displayName}</div>
                <div className="prof-username">@{user.username}</div>

                <div
                  className="prof-level-pill"
                  style={{ background: scoreInfo.bg, color: scoreInfo.color }}
                >
                  {scoreInfo.label}
                </div>
              </div>

              {/* Bio */}
              <div className="prof-bio">
                {user.bio
                  ? user.bio
                  : <span className="prof-bio-empty">No bio yet.</span>
                }
              </div>

              {/* Meta */}
              <div className="prof-meta-list">
                <div className="prof-meta-item">
                  <div className="prof-meta-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  {user.email}
                </div>

                <div className="prof-meta-item">
                  <div className="prof-meta-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  Joined {formatDate(user.createdAt)}
                </div>

                <div className="prof-meta-item">
                  <div className="prof-meta-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  Last updated {timeAgo(user.updatedAt)}
                </div>
              </div>
            </div>

          </div>

          {/* ── MAIN ── */}
          <div className="prof-main">

            {/* Stats */}
            <div className="prof-section-label">Overview</div>
            <div className="prof-stats-grid">
              {[
                {
                  label: "Growth Score",
                  value: user.growthScore,
                  sub: scoreInfo.label,
                  iconBg: scoreInfo.bg,
                  iconColor: scoreInfo.color,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                  ),
                },
                {
                  label: "Day Streak",
                  value: `${user.streak}d`,
                  sub: user.streak > 0 ? "Keep it up!" : "Start today",
                  iconBg: "#fffbeb",
                  iconColor: "#d97706",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ),
                },
                {
                  label: "Total Entries",
                  value: timelines.length,
                  sub: "Logged milestones",
                  iconBg: "#eff6ff",
                  iconColor: "#2563eb",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  ),
                },
                {
                  label: "Avg Impact",
                  value: avgImpact,
                  sub: `${highImpactCount} high-impact`,
                  iconBg: "#fdf2f8",
                  iconColor: "#db2777",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <div className="prof-stat-card" key={s.label}>
                  <div className="prof-stat-top">
                    <span className="prof-stat-label">{s.label}</span>
                    <div className="prof-stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                      {s.icon}
                    </div>
                  </div>
                  <div className="prof-stat-value">{s.value}</div>
                  <div className="prof-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
            <AchievementsCard />

            {/* Category breakdown */}
            <div className="prof-section-label" style={{ marginTop: 6 }}>Focus Areas</div>
            <div className="prof-card">
              <div className="prof-card-header">
                <span className="prof-card-title">Category Breakdown</span>
                <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500 }}>
                  {Object.keys(categoryCounts).length} active
                </span>
              </div>

              {topCategories.length === 0 ? (
                <div className="prof-empty">No entries yet — start logging!</div>
              ) : (
                <div className="prof-cats-list">
                  {topCategories.map(([cat, count]) => {
                    const pct = Math.round((count / timelines.length) * 100);
                    return (
                      <div className="prof-cat-row" key={cat}>
                        <div
                          className="prof-cat-dot"
                          style={{ background: CATEGORY_COLORS[cat] ?? "#475569" }}
                        />
                        <span className="prof-cat-name">{cat}</span>
                        <div className="prof-cat-bar-wrap">
                          <div
                            className="prof-cat-bar-fill"
                            style={{
                              width: `${pct}%`,
                              background: CATEGORY_COLORS[cat] ?? "#475569",
                              opacity: 0.7,
                            }}
                          />
                        </div>
                        <span className="prof-cat-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent timeline entries */}
            <div className="prof-section-label" style={{ marginTop: 6 }}>Recent Activity</div>
            <div className="prof-card">
              <div className="prof-card-header">
                <span className="prof-card-title">Latest Entries</span>
                <Link to="/timeline" className="prof-view-all">View all →</Link>
              </div>

              {recentTimelines.length === 0 ? (
                <div className="prof-empty">Nothing logged yet.</div>
              ) : (
                <div className="prof-feed">
                  {recentTimelines.map(t => {
                    const color = CATEGORY_COLORS[t.category] ?? "#475569";
                    const bg    = CATEGORY_BG[t.category]    ?? "#f8fafc";
                    return (
                      <div className="prof-feed-item" key={t._id}>
                        <div className="prof-feed-dot" style={{ background: bg, color }}>
                          {t.category?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="prof-feed-body">
                          <div className="prof-feed-title">{t.title}</div>
                          <div className="prof-feed-desc">{t.description}</div>
                        </div>
                        <div className="prof-feed-right">
                          <span className="prof-feed-time">{timeAgo(t.createdAt)}</span>
                          <span
                            className="prof-impact-pill"
                            style={{ background: bg, color }}
                          >
                            {t.impactScore}/10
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}