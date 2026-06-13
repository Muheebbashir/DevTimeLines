import { useState } from "react";
import { useCreateProject } from "../hooks/useCreateProject";

interface Props {
  onClose: () => void;
}

export default function CreateProjectModal({ onClose }: Props) {
  const createProject = useCreateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "Planned" | "In Progress" | "Completed"
  >("Planned");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createProject.mutate(
      {
        title,
        description,
        status,
        progress,
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
        <h2>Create Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
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
            }}
          >
            <option>Planned</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label>Progress: {progress}%</label>
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
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" disabled={createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}