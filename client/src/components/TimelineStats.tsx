interface Props {
  total: number;
}

export default function TimelineStats({
  total,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px 24px",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Total Timeline Entries
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {total}
          </div>
        </div>

        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📈
        </div>
      </div>
    </div>
  );
}