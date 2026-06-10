interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function TimelineSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px 24px",
      }}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search timeline entries..."
        style={{
          width: "100%",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "14px 16px",
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );
}