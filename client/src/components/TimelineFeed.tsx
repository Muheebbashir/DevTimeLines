import { useState } from "react";
import { useTimelines } from "../hooks/useTimelines";
import { formatDistanceToNow } from "date-fns";
import { useDeleteTimeline } from "../hooks/useDeleteTimeline";
import type { Timeline } from "../types/timeline";
import EditTimelineModal from "./EditTimelineModal";

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
  Fitness:     "#f0fdf4",
  Education:   "#fffbeb",
  Career:      "#f5f3ff",
  Personal:    "#fdf2f8",
  Other:       "#f8fafc",
};

function ScoreBars({ score, color }: { score: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 18 }}>
      {Array.from({ length: 10 }, (_, i) => {
        const n = i + 1;
        const h = 6 + (n / 10) * 12;
        return (
          <div
            key={n}
            style={{
              width: 12, height: h, borderRadius: 2,
              background: n <= score ? color : "#e2e8f0",
              transition: "background 0.2s",
            }}
          />
        );
      })}
      <span style={{ marginLeft: 6, fontSize: 11.5, fontWeight: 600, color: "#94a3b8", lineHeight: 1, alignSelf: "center" }}>
        {score}/10
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
      padding: "1.25rem 1.5rem", display: "flex", gap: "1rem",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f1f5f9", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 14, borderRadius: 4, background: "#f1f5f9", width: "55%" }} />
        <div style={{ height: 12, borderRadius: 4, background: "#f8fafc", width: "80%" }} />
        <div style={{ height: 12, borderRadius: 4, background: "#f8fafc", width: "65%" }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        animation: "tf-shimmer 1.4s infinite",
      }} />
    </div>
  );
}

export default function TimelineFeed() {
  const { data: timelines = [], isLoading } = useTimelines();
  const { mutate: deleteTimeline, isPending: isDeleting } = useDeleteTimeline();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<Timeline | null>(null);

  const handleDelete = (id: string) => {
    if (confirmId === id) {
      deleteTimeline(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
      // auto-reset confirm state after 3s if user doesn't click again
      setTimeout(() => setConfirmId(c => c === id ? null : c), 3000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .tf-root {
          font-family: 'Sora', sans-serif;
          background: #f8f9fb;
          min-height: 100vh;
          padding: 3rem 1.25rem;
        }
        .tf-container { max-width: 680px; margin: 0 auto; }
        .tf-page-header { margin-bottom: 2.5rem; }

        .tf-eyebrow {
          display: flex; align-items: center; gap: 8px;
          font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: #94a3b8; margin-bottom: 0.75rem;
        }
        .tf-eyebrow-line { flex: 1; height: 1px; background: #e2e8f0; }

        .tf-page-title {
          font-size: 1.5rem; font-weight: 700; color: #0f172a;
          letter-spacing: -0.025em; margin: 0 0 4px;
        }
        .tf-page-sub { font-size: 13.5px; color: #94a3b8; font-weight: 400; }

        .tf-stats {
          display: flex; gap: 1px; background: #e2e8f0;
          border-radius: 10px; overflow: hidden; margin-bottom: 2rem;
        }
        .tf-stat {
          flex: 1; background: #fff; padding: 0.875rem 1rem;
          display: flex; flex-direction: column; gap: 2px;
        }
        .tf-stat:first-child { border-radius: 10px 0 0 10px; }
        .tf-stat:last-child  { border-radius: 0 10px 10px 0; }
        .tf-stat-val {
          font-size: 1.35rem; font-weight: 700; color: #0f172a;
          letter-spacing: -0.03em; line-height: 1;
        }
        .tf-stat-label { font-size: 11.5px; color: #94a3b8; font-weight: 500; }

        .tf-feed { display: flex; flex-direction: column; gap: 0; }

        .tf-row { display: flex; gap: 0; animation: tf-up 0.3s ease both; }
        @keyframes tf-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tf-track {
          width: 48px; flex-shrink: 0;
          display: flex; flex-direction: column; align-items: center;
        }
        .tf-track-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid #fff; box-shadow: 0 0 0 1.5px #e2e8f0;
          background: #fff; margin-top: 20px; z-index: 1;
          transition: transform 0.15s; flex-shrink: 0;
        }
        .tf-row:hover .tf-track-dot { transform: scale(1.3); }
        .tf-track-line { width: 1px; flex: 1; background: #e2e8f0; margin-top: 4px; }
        .tf-row:last-child .tf-track-line { display: none; }

        .tf-card-wrap { flex: 1; padding: 0 0 1.25rem; }

        .tf-card {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          overflow: hidden; transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: default;
        }
        .tf-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }

        .tf-card-image {
          width: 100%; height: 160px; object-fit: cover;
          display: block; border-bottom: 1px solid #f1f5f9;
        }
        .tf-card-body { padding: 1.1rem 1.25rem; }

        .tf-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem; margin-bottom: 0.35rem;
        }
        .tf-card-title {
          font-size: 14.5px; font-weight: 600; color: #0f172a;
          margin: 0; letter-spacing: -0.01em; line-height: 1.35;
        }
        .tf-cat-tag {
          font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
          padding: 3px 8px; border-radius: 5px; white-space: nowrap; flex-shrink: 0;
        }

        .tf-time {
          display: flex; align-items: center; gap: 4px;
          font-size: 11.5px; color: #cbd5e1; font-weight: 500; margin-bottom: 0.6rem;
        }
        .tf-time svg { flex-shrink: 0; }

        .tf-card-desc {
          font-size: 13px; color: #64748b; line-height: 1.65;
          margin: 0 0 0.875rem; font-weight: 400;
        }

        .tf-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 0.75rem; border-top: 1px solid #f1f5f9; gap: 1rem;
        }
        .tf-impact-group { display: flex; flex-direction: column; gap: 5px; }
        .tf-actions { display: flex; gap: 6px; }
        .tf-action-btn {
          width: 28px; height: 28px; border-radius: 6px;
          background: #f8fafc; border: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #94a3b8; transition: all 0.15s;
        }
        .tf-action-btn:hover { background: #f1f5f9; color: #64748b; border-color: #e2e8f0; }
        .tf-action-btn.delete:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; }
        .tf-action-btn.delete.confirm { background: #ef4444; color: #fff; border-color: #ef4444; }

        @keyframes tf-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="tf-root">
        <div className="tf-container">

          <div className="tf-page-header">
            <div className="tf-eyebrow">
              <span>Timeline</span>
              <div className="tf-eyebrow-line" />
            </div>
            <h1 className="tf-page-title">Your progress feed</h1>
            <p className="tf-page-sub">Every milestone you've logged, in order.</p>
          </div>

          {!isLoading && timelines.length > 0 && (() => {
            const avg = (timelines.reduce((s, t) => s + t.impactScore, 0) / timelines.length).toFixed(1);
            const cats = new Set(timelines.map(t => t.category)).size;
            return (
              <div className="tf-stats">
                <div className="tf-stat">
                  <span className="tf-stat-val">{timelines.length}</span>
                  <span className="tf-stat-label">Entries</span>
                </div>
                <div className="tf-stat">
                  <span className="tf-stat-val">{avg}</span>
                  <span className="tf-stat-label">Avg. Impact</span>
                </div>
                <div className="tf-stat">
                  <span className="tf-stat-val">{cats}</span>
                  <span className="tf-stat-label">Categories</span>
                </div>
              </div>
            );
          })()}

          {isLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {!isLoading && timelines.length === 0 && (
            <div className="tf-empty">
              <div className="tf-empty-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="tf-empty-title">No entries yet</div>
              <p className="tf-empty-sub">Start logging milestones to build your timeline.</p>
            </div>
          )}

          {!isLoading && timelines.length > 0 && (
            <div className="tf-feed">
              {timelines.map((tl, idx) => {
                const color = CATEGORY_COLORS[tl.category] ?? CATEGORY_COLORS["Other"];
                const bg    = CATEGORY_BG[tl.category]    ?? CATEGORY_BG["Other"];
                const relativeTime = tl.createdAt
                  ? formatDistanceToNow(new Date(tl.createdAt), { addSuffix: true })
                  : null;
                return (
                  <div key={tl._id} className="tf-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="tf-track">
                      <div className="tf-track-dot" style={{ borderColor: color, background: color }} />
                      <div className="tf-track-line" />
                    </div>

                    <div className="tf-card-wrap">
                      <div className="tf-card">
                        {tl.imageUrl && (
                          <img className="tf-card-image" src={tl.imageUrl} alt={tl.title} />
                        )}
                        <div className="tf-card-body">
                          <div className="tf-card-top">
                            <h3 className="tf-card-title">{tl.title}</h3>
                            <span className="tf-cat-tag" style={{ background: bg, color }}>
                              {tl.category}
                            </span>
                          </div>

                          {relativeTime && (
                            <div className="tf-time">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                              </svg>
                              {relativeTime}
                            </div>
                          )}

                          <p className="tf-card-desc">{tl.description}</p>

                          <div className="tf-card-footer">
                            <div className="tf-impact-group">
                              <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>Impact Score</span>
                              <ScoreBars score={tl.impactScore} color={CATEGORY_COLORS[tl.category]} />
                            </div>
                            <div className="tf-actions">
                              <button className="tf-action-btn" onClick={() => setEditingTimeline(tl)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                              </button>
                              <button
                                className={`tf-action-btn delete ${confirmId === tl._id ? 'confirm' : ''}`}
                                onClick={() => handleDelete(tl._id)}
                                disabled={isDeleting && confirmId === tl._id}
                              >
                                {confirmId === tl._id ? (
                                  <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                  </>
                                ) : (
                                  <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {editingTimeline && (
        <EditTimelineModal
          timeline={editingTimeline}
          onClose={() => setEditingTimeline(null)}
        />
      )}
    </>
  );
}