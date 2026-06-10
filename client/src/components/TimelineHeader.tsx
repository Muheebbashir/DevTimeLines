interface Props {
  totalEntries: number;
  onCreate: () => void;
}

export default function TimelineHeader({
  totalEntries,
  onCreate,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Timeline
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Track every milestone and achievement.
          </p>
        </div>

        <button
          onClick={onCreate}
          style={{
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "12px 18px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.18)",
          }}
        >
          + New Entry
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#64748b",
          }}
        >
          Showing Entries
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          {totalEntries}
        </div>
      </div>
    </div>
  );
}