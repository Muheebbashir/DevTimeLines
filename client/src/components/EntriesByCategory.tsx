import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTimelines } from "../hooks/useTimelines";

const COLORS = ["#2563eb", "#059669", "#d97706", "#7c3aed", "#db2777", "#64748b"];

const CustomTooltip = ({ active, payload }: any) => {
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
        <div style={{ fontWeight: 600, color: "#0f172a" }}>{payload[0].name}</div>
        <div style={{ color: "#6b7280", marginTop: 2 }}>{payload[0].value} entries</div>
      </div>
    );
  }
  return null;
};

export default function EntriesByCategory() {
  const { data: timelines = [] } = useTimelines();

  const counts: Record<string, number> = {};
  timelines.forEach((t) => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .chart-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .chart-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .chart-badge {
          font-size: 12px;
          color: #9ca3af;
          background: #f8f8f8;
          border: 1px solid #f0f0f0;
          border-radius: 6px;
          padding: 3px 9px;
          font-weight: 500;
        }

        .chart-legend {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }

        .legend-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4b5563;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legend-pct {
          font-weight: 600;
          color: #0f172a;
          font-size: 13px;
        }
      `}</style>

      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Entries by Category</h3>
          <span className="chart-badge">{total} total</span>
        </div>

        <div style={{ height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-legend">
          {data.slice(0, 4).map((d, i) => (
            <div className="legend-item" key={d.name}>
              <div className="legend-left">
                <div className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{d.name}</span>
              </div>
              <span className="legend-pct">
                {total ? Math.round((d.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}