import { useState } from "react";
import type { Project } from "../types/project";
import { useUpdateProject } from "../hooks/useUpdateProject";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function EditProjectModal({
  project,
  onClose,
}: Props) {
  const updateProject = useUpdateProject();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(
    project.description
  );
  const [status, setStatus] = useState<
    "Planned" | "In Progress" | "Completed"
  >(project.status);
  const [progress, setProgress] = useState(project.progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProject.mutate(
      {
        id: project._id,
        data: {
          title,
          description,
          status,
          progress,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.4)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Edit Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 10,
              border: "1px solid #e2e8f0",
            }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              minHeight: 100,
              padding: 12,
              marginBottom: 12,
              borderRadius: 10,
              border: "1px solid #e2e8f0",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "Planned"
                  | "In Progress"
                  | "Completed"
              )
            }
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 10,
              border: "1px solid #e2e8f0",
            }}
          >
            <option>Planned</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label
            style={{
              display: "block",
              marginBottom: 8,
              color: "#475569",
            }}
          >
            Progress: {progress}%
          </label>

          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{
              width: "100%",
              marginBottom: 18,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateProject.isPending}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "none",
                background: "#0f172a",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {updateProject.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}