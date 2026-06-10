const CATEGORIES = [
  "All",
  "Development",
  "Fitness",
  "Education",
  "Career",
  "Personal",
  "Other",
];

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

export default function TimelineCategoryFilter({
  category,
  setCategory,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px 24px",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            padding: "9px 15px",
            borderRadius: 999,
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 13,
            background: category === cat ? "#0f172a" : "#fff",
            color: category === cat ? "#fff" : "#64748b",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}