import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import DashboardNavbar from "../components/DashboardNavbar";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";

import { useProjects } from "../hooks/useProjects";
import { useTimelines } from "../hooks/useTimelines";

import type { Project } from "../types/project";

const STATUS_COLORS: Record<string, string> = {
  Planned: "#64748b",
  "In Progress": "#2563eb",
  Completed: "#16a34a",
};

const CATEGORY_COLORS: Record<string, string> = {
  Development: "#2563eb",
  Fitness: "#16a34a",
  Education: "#d97706",
  Career: "#7c3aed",
  Personal: "#db2777",
  Other: "#475569",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data: projects = [], isLoading } = useProjects();
  const { data: timelines = [] } = useTimelines();

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [deletingProject, setDeletingProject] =
    useState<Project | null>(null);

  const project = projects.find((p) => p._id === projectId);

  const linkedTimelines = timelines.filter(
    (timeline) => timeline.projectId === projectId
  );

  if (isLoading) {
    return (
      <>
        <DashboardNavbar />

        <div
          style={{
            minHeight: "100vh",
            background: "#f8f9fb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
          }}
        >
          Loading project...
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <DashboardNavbar />

        <div
          style={{
            minHeight: "100vh",
            background: "#f8f9fb",
            padding: "40px 20px",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              padding: 32,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#0f172a", marginBottom: 8 }}>
              Project not found
            </h2>

            <p style={{ color: "#64748b", marginBottom: 20 }}>
              This project may have been deleted.
            </p>

            <Link
              to="/projects"
              style={{
                background: "#0f172a",
                color: "#fff",
                textDecoration: "none",
                padding: "11px 16px",
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </>
    );
  }

  const color = STATUS_COLORS[project.status];

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
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button
            onClick={() => navigate("/projects")}
            style={{
              border: "none",
              background: "transparent",
              color: "#64748b",
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            ← Back to Projects
          </button>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 22,
              padding: 32,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
                marginBottom: 24,
              }}
            >
              <div>
                <span
                  style={{
                    background: `${color}15`,
                    color,
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "inline-block",
                    marginBottom: 14,
                  }}
                >
                  {project.status}
                </span>

                <h1
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: "0 0 10px",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {project.title}
                </h1>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: 15,
                    lineHeight: 1.7,
                    maxWidth: 680,
                    margin: 0,
                  }}
                >
                  {project.description ||
                    "No description added for this project."}
                </p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setEditingProject(project)}
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
                  Edit
                </button>

                <button
                  onClick={() => setDeletingProject(project)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: "1px solid #fecaca",
                    background: "#fff5f5",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                color: "#64748b",
                fontSize: 14,
              }}
            >
              <span>Project Progress</span>
              <span>{project.progress}%</span>
            </div>

            <div
              style={{
                height: 10,
                background: "#f1f5f9",
                borderRadius: 999,
                overflow: "hidden",
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
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
                Linked Entries
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                {linkedTimelines.length}
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
                Progress
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                {project.progress}%
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
                Created
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {formatDate(project.createdAt)}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 22,
                    color: "#0f172a",
                    margin: "0 0 6px",
                  }}
                >
                  Linked Timeline Entries
                </h2>

                <p style={{ color: "#64748b", margin: 0 }}>
                  Milestones connected to this project.
                </p>
              </div>

              <Link
                to="/timeline"
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                + Add Entry
              </Link>
            </div>

            {linkedTimelines.length === 0 ? (
              <div
                style={{
                  border: "1px dashed #cbd5e1",
                  borderRadius: 14,
                  padding: 30,
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No timeline entries linked yet. Create or edit a timeline entry
                and select this project.
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {linkedTimelines.map((timeline) => {
                  const catColor =
                    CATEGORY_COLORS[timeline.category] || "#475569";

                  return (
                    <div
                      key={timeline._id}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 14,
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: "0 0 6px",
                            color: "#0f172a",
                            fontSize: 15,
                          }}
                        >
                          {timeline.title}
                        </h3>

                        <p
                          style={{
                            margin: "0 0 10px",
                            color: "#64748b",
                            fontSize: 13,
                            lineHeight: 1.6,
                          }}
                        >
                          {timeline.description}
                        </p>

                        <span
                          style={{
                            background: `${catColor}15`,
                            color: catColor,
                            padding: "3px 9px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {timeline.category}
                        </span>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            color: "#0f172a",
                            fontWeight: 800,
                            fontSize: 18,
                          }}
                        >
                          {timeline.impactScore}/10
                        </div>

                        <div
                          style={{
                            color: "#94a3b8",
                            fontSize: 12,
                            marginTop: 6,
                          }}
                        >
                          {formatDistanceToNow(new Date(timeline.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onClose={() => {
            setDeletingProject(null);
            navigate("/projects");
          }}
        />
      )}
    </>
  );
}