import { useNavigate } from "react-router-dom";
import type { Project } from "../types/project";

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  Planned: "#64748b",
  "In Progress": "#2563eb",
  Completed: "#16a34a",
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  const color = STATUS_COLORS[project.status];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 22,
        transition: "0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 18,
            color: "#0f172a",
            margin: 0,
          }}
        >
          {project.title}
        </h3>

        <span
          style={{
            background: `${color}15`,
            color,
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {project.status}
        </span>
      </div>

      <p
        style={{
          color: "#64748b",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 18,
        }}
      >
        {project.description || "No description added."}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#64748b",
          marginBottom: 8,
        }}
      >
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>

      <div
        style={{
          height: 8,
          background: "#f1f5f9",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: `${project.progress}%`,
            height: "100%",
            background: color,
            borderRadius: 999,
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}
      >
        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          style={{
            padding: "9px 12px",
            borderRadius: 10,
            border: "none",
            background: "#0f172a",
            cursor: "pointer",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          View
        </button>

        <button
          onClick={() => onEdit(project)}
          style={{
            padding: "9px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#475569",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          style={{
            padding: "9px 12px",
            borderRadius: 10,
            border: "1px solid #fecaca",
            background: "#fff5f5",
            cursor: "pointer",
            fontWeight: 600,
            color: "#ef4444",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}