interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function TimelineSort({
  sortBy,
  setSortBy,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px 24px",
      }}
    >
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          background: "#fff",
          fontSize: 14,
          minWidth: 180,
        }}
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
        <option value="HighestImpact">
          Highest Impact
        </option>
        <option value="LowestImpact">
          Lowest Impact
        </option>
      </select>
    </div>
  );
}