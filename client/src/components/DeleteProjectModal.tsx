import type { Project } from "../types/project";
import { useDeleteProject } from "../hooks/useDeleteProject";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function DeleteProjectModal({
  project,
  onClose,
}: Props) {
  const deleteProject = useDeleteProject();

  const handleDelete = () => {
    deleteProject.mutate(project._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
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
          maxWidth: 440,
          background: "#fff",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.18)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "#fff5f5",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            marginBottom: 18,
          }}
        >
          🗑️
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: 22,
            color: "#0f172a",
          }}
        >
          Delete Project?
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#64748b",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          Are you sure you want to delete{" "}
          <strong>{project.title}</strong>? This action cannot be undone.
        </p>

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
              color: "#475569",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteProject.isPending}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              background: "#ef4444",
              color: "#fff",
              cursor: deleteProject.isPending ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: deleteProject.isPending ? 0.6 : 1,
            }}
          >
            {deleteProject.isPending ? "Deleting..." : "Delete Project"}
          </button>
        </div>
      </div>
    </div>
  );
}