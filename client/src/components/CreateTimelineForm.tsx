import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMe } from "../hooks/useMe";
import { useProjects } from "../hooks/useProjects";
import { api } from "../services/api";

const CATEGORIES = [
  "Development",
  "Fitness",
  "Education",
  "Career",
  "Personal",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Development: "#2563eb",
  Fitness: "#16a34a",
  Education: "#d97706",
  Career: "#7c3aed",
  Personal: "#db2777",
  Other: "#475569",
};

interface Props {
  onClose?: () => void;
}

export default function CreateTimelineForm({ onClose }: Props) {
  const { data: currentUser } = useMe();
  const { data: projects = [] } = useProjects();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [projectId, setProjectId] = useState("");
  const [impactScore, setImpactScore] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [dragging, setDragging] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ imageUrl }: { imageUrl: string }) => {
      const res = await api.post("/timeline", {
        clerkId: currentUser?.clerkId,
        title,
        description,
        category,
        impactScore,
        imageUrl,
        projectId: projectId || null,
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Entry added to your timeline.");

      setTitle("");
      setDescription("");
      setCategory("Development");
      setProjectId("");
      setImpactScore(5);
      setImage(null);
      setImageName("");

      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard");
      }
    },

    onError: () => {
      toast.error("Failed to create entry.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        const fd = new FormData();
        fd.append("image", image);

        const uploadRes = await api.post("/upload", fd);
        imageUrl = uploadRes.data.imageUrl;
      }

      mutation.mutate({ imageUrl });
    } catch {
      toast.error("Upload failed.");
    }
  };

  const scoreLabel =
    impactScore <= 3
      ? "Low"
      : impactScore <= 6
      ? "Medium"
      : impactScore <= 8
      ? "High"
      : "Critical";

  return (
    <>
      <style>{`
        .ctf-root {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .ctf-shell {
          width: 100%;
          max-width: 520px;
        }

        .ctf-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .ctf-card-header {
          padding: 24px 24px 20px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .ctf-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 3px;
        }

        .ctf-card-sub {
          font-size: 13px;
          color: #9ca3af;
        }

        .ctf-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          background: #fafafa;
          cursor: pointer;
          color: #9ca3af;
          font-size: 16px;
          line-height: 1;
        }

        .ctf-close-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .ctf-card-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ctf-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ctf-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #6b7280;
          text-transform: uppercase;
        }

        .ctf-input,
        .ctf-textarea {
          width: 100%;
          border: 1px solid #f0f0f0;
          border-radius: 9px;
          background: #fafafa;
          color: #0f172a;
          font-family: inherit;
          font-size: 14px;
          padding: 10px 12px;
          outline: none;
          box-sizing: border-box;
        }

        .ctf-input:focus,
        .ctf-textarea:focus {
          border-color: #cbd5e1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.05);
        }

        .ctf-textarea {
          resize: none;
          min-height: 82px;
          line-height: 1.65;
        }

        .ctf-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ctf-cat-btn {
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 500;
          padding: 6px 13px;
          border-radius: 7px;
          border: 1px solid #f0f0f0;
          background: #fafafa;
          color: #6b7280;
          cursor: pointer;
        }

        .ctf-cat-btn.active {
          border-color: transparent;
          color: #fff;
          font-weight: 600;
        }

        .ctf-impact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .ctf-impact-val {
          font-size: 24px;
          font-weight: 600;
          color: #0f172a;
        }

        .ctf-impact-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 9px;
          border-radius: 5px;
          background: #f5f5f5;
          color: #6b7280;
        }

        .ctf-bars {
          display: flex;
          gap: 4px;
          align-items: flex-end;
          height: 28px;
        }

        .ctf-bar {
          flex: 1;
          border-radius: 3px;
          cursor: pointer;
          transition: opacity 0.12s;
        }

        .ctf-bar:hover {
          opacity: 0.7;
        }

        .ctf-upload {
          position: relative;
          border: 1.5px dashed #f0f0f0;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          background: #fafafa;
        }

        .ctf-upload.drag,
        .ctf-upload:hover {
          border-color: #d1d5db;
          background: #f5f5f5;
        }

        .ctf-upload input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .ctf-upload-text {
          font-size: 13px;
          color: #9ca3af;
        }

        .ctf-upload-text b {
          color: #6b7280;
          font-weight: 600;
        }

        .ctf-upload-name {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 500;
          color: #374151;
          background: #f0f0f0;
          border-radius: 6px;
          padding: 4px 10px;
        }

        .ctf-footer {
          padding: 16px 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #f5f5f5;
        }

        .ctf-footer-hint {
          font-size: 12px;
          color: #d1d5db;
        }

        .ctf-btn {
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          padding: 9px 20px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .ctf-btn-primary {
          background: #0f172a;
          color: #fff;
        }

        .ctf-btn-primary:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ctf-spinner {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ctf-spin 0.7s linear infinite;
        }

        @keyframes ctf-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="ctf-root">
        <div className="ctf-shell">
          <div className="ctf-card">
            <div className="ctf-card-header">
              <div>
                <div className="ctf-card-title">Log a milestone</div>
                <div className="ctf-card-sub">
                  Document what you built, achieved, or learned.
                </div>
              </div>

              {onClose && (
                <button
                  type="button"
                  className="ctf-close-btn"
                  onClick={onClose}
                >
                  ×
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ctf-card-body">
                <div className="ctf-field">
                  <label className="ctf-label">Title</label>
                  <input
                    className="ctf-input"
                    placeholder="e.g. Shipped user authentication"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Description</label>
                  <textarea
                    className="ctf-textarea"
                    placeholder="What did you do, and why does it matter?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Category</label>

                  <div className="ctf-cats">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`ctf-cat-btn${
                          category === cat ? " active" : ""
                        }`}
                        style={
                          category === cat
                            ? { backgroundColor: CATEGORY_COLORS[cat] }
                            : {}
                        }
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">
                    Project{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#d1d5db",
                        textTransform: "none",
                        letterSpacing: 0,
                      }}
                    >
                      — optional
                    </span>
                  </label>

                  <select
                    className="ctf-input"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">No project</option>

                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Impact Score</label>

                  <div className="ctf-impact-row">
                    <span className="ctf-impact-val">
                      {impactScore}
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 400,
                          color: "#9ca3af",
                        }}
                      >
                        /10
                      </span>
                    </span>

                    <span className="ctf-impact-tag">{scoreLabel}</span>
                  </div>

                  <div className="ctf-bars">
                    {Array.from({ length: 10 }, (_, i) => {
                      const n = i + 1;
                      const active = n <= impactScore;
                      const h = 8 + (n / 10) * 20;

                      return (
                        <div
                          key={n}
                          className="ctf-bar"
                          style={{
                            height: h,
                            background: active
                              ? CATEGORY_COLORS[category]
                              : "#f0f0f0",
                          }}
                          onClick={() => setImpactScore(n)}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">
                    Attachment{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#d1d5db",
                        textTransform: "none",
                        letterSpacing: 0,
                      }}
                    >
                      — optional
                    </span>
                  </label>

                  <div
                    className={`ctf-upload${dragging ? " drag" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);

                      const f = e.dataTransfer.files?.[0];

                      if (f) {
                        setImage(f);
                        setImageName(f.name);
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];

                        if (f) {
                          setImage(f);
                          setImageName(f.name);
                        }
                      }}
                    />

                    {imageName ? (
                      <div className="ctf-upload-name">✓ {imageName}</div>
                    ) : (
                      <div className="ctf-upload-text">
                        <b>Click to upload</b> or drag & drop
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ctf-footer">
                <span className="ctf-footer-hint">
                  Title and description required
                </span>

                <button
                  type="submit"
                  className="ctf-btn ctf-btn-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <span className="ctf-spinner" />
                      Saving…
                    </>
                  ) : (
                    <>+ Add Entry</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}