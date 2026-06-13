import { useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";

import { useProjects } from "../hooks/useProjects";

import type { Project } from "../types/project";

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [deletingProject, setDeletingProject] =
    useState<Project | null>(null);

  const { data: projects = [], isLoading } = useProjects();

  return (
    <>
      <DashboardNavbar />

      <div
        style={{
          background: "#f8f9fb",
          minHeight: "100vh",
          padding: "32px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                Projects
              </h1>

              <p
                style={{
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Organize your long-term work, goals, and milestones.
              </p>
            </div>

            <button
              onClick={() => setShowCreate(true)}
              style={{
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 18px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Create Project
            </button>
          </div>

          {isLoading ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 40,
                textAlign: "center",
                color: "#64748b",
              }}
            >
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 40,
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                }}
              >
                No projects yet
              </h2>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: 20,
                }}
              >
                Create your first project and start organizing your work.
              </p>

              <button
                onClick={() => setShowCreate(true)}
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 18px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Create Project
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={setEditingProject}
                  onDelete={() => setDeletingProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
        />
      )}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onClose={() => setDeletingProject(null)}
        />
      )}
    </>
  );
}