import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTimelines } from "../hooks/useTimelines";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}>
        <div style={{ color: "#9ca3af", marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 600, color: "#0f172a" }}>
          {payload[0].value} pts
        </div>
      </div>
    );
  }
  return null;
};

export default function ImpactOverTime() {
  const { data: timelines = [] } = useTimelines();

  const chartData = timelines
    .slice()
    .reverse()
    .map((t) => ({
      date: new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      impact: t.impactScore,
    }));

  const latest = chartData[chartData.length - 1]?.impact ?? 0;
  const prev = chartData[chartData.length - 2]?.impact ?? 0;
  const delta = latest - prev;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .impact-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .impact-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .impact-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }

        .impact-meta {
          font-size: 12px;
          color: #9ca3af;
        }

        .impact-delta {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .impact-delta.up {
          background: #ecfdf5;
          color: #059669;
        }

        .impact-delta.down {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>

      <div className="impact-card">
        <div className="impact-header">
          <div>
            <h3 className="impact-title">Impact Over Time</h3>
            <div className="impact-meta">Cumulative growth score</div>
          </div>
          {delta !== 0 && (
            <span className={`impact-delta ${delta >= 0 ? "up" : "down"}`}>
              {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)} pts
            </span>
          )}
        </div>

        <div style={{ height: 230 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#f5f5f5" strokeDasharray="0" />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }} />

              <Area
                type="monotone"
                dataKey="impact"
                stroke="#2563eb"
                strokeWidth={2}
                fill="url(#impactGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}