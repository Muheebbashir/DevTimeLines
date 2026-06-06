import { useTimelines } from "../hooks/useTimelines";
import { useMe } from "../hooks/useMe";

export default function AchievementsCard() {
  const { data: user } = useMe();
  const { data: timelines = [] } = useTimelines();

  const achievements = [
    {
      title: "First Step",
      icon: "🚀",
      unlocked: timelines.length >= 1,
      desc: "Create your first timeline entry",
    },
    {
      title: "Consistent",
      icon: "🔥",
      unlocked: (user?.streak ?? 0) >= 7,
      desc: "Maintain a 7 day streak",
    },
    {
      title: "Growth Mindset",
      icon: "📈",
      unlocked: (user?.growthScore ?? 0) >= 50,
      desc: "Reach 50 growth score",
    },
    {
      title: "Timeline Master",
      icon: "🏆",
      unlocked: timelines.length >= 25,
      desc: "Create 25 timeline entries",
    },
  ];

  return (
    <>
      <style>{`
        .ach-card{
          background:#fff;
          border:1px solid #f0f0f0;
          border-radius:16px;
          overflow:hidden;
        }

        .ach-header{
          padding:18px 24px;
          border-bottom:1px solid #f5f5f5;
          font-size:14px;
          font-weight:600;
          color:#0f172a;
        }

        .ach-grid{
          padding:20px;
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:12px;
        }

        .ach-item{
          border:1px solid #f3f4f6;
          border-radius:12px;
          padding:14px;
          display:flex;
          gap:12px;
          align-items:flex-start;
        }

        .ach-item.locked{
          opacity:.45;
        }

        .ach-icon{
          font-size:24px;
        }

        .ach-title{
          font-size:13px;
          font-weight:600;
          color:#0f172a;
          margin-bottom:2px;
        }

        .ach-desc{
          font-size:12px;
          color:#94a3b8;
          line-height:1.5;
        }

        @media(max-width:700px){
          .ach-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <div className="ach-card">
        <div className="ach-header">
          Achievements
        </div>

        <div className="ach-grid">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`ach-item ${!a.unlocked ? "locked" : ""}`}
            >
              <div className="ach-icon">{a.icon}</div>

              <div>
                <div className="ach-title">
                  {a.title}
                </div>

                <div className="ach-desc">
                  {a.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}