import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { api } from "../services/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CATEGORIES = ["Development", "Fitness", "Education", "Career", "Personal", "Other"];

const CATEGORY_COLORS: Record<string, string> = {
  Development: "#2563eb",
  Fitness:     "#16a34a",
  Education:   "#d97706",
  Career:      "#7c3aed",
  Personal:    "#db2777",
  Other:       "#475569",
};

interface Props {
  // Called when the form is inside a modal — closes it after success.
  // If not provided, the form navigates to /dashboard instead.
  onClose?: () => void;
}

export default function CreateTimelineForm({ onClose }: Props) {
  const { data: currentUser } = useMe();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]       = useState("Development");
  const [impactScore, setImpactScore] = useState(5);
  const [image, setImage]             = useState<File | null>(null);
  const [imageName, setImageName]     = useState("");
  const [dragging, setDragging]       = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ imageUrl }: { imageUrl: string }) => {
      const res = await api.post("/timeline", {
        clerkId: currentUser?.clerkId,
        title, description, category, impactScore, imageUrl,
      });
      return res.data;
    },
    onSuccess: () => {
      // Refetch both timelines AND user (so growthScore updates instantly)
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Entry added to your timeline.");

      // Reset form state
      setTitle(""); setDescription(""); setCategory("Development");
      setImpactScore(5); setImage(null); setImageName("");

      // Close modal or navigate to dashboard
      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard");
      }
    },
    onError: () => toast.error("Failed to create entry."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }
    try {
      let imageUrl = "";
      if (image) {
        const fd = new FormData();
        fd.append("image", image);
        const r = await api.post("/upload", fd);
        imageUrl = r.data.imageUrl;
      }
      mutation.mutate({ imageUrl });
    } catch {
      toast.error("Upload failed.");
    }
  };

  const scoreLabel = impactScore <= 3 ? "Low" : impactScore <= 6 ? "Medium" : impactScore <= 8 ? "High" : "Critical";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .ctf-root {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
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
          margin: 0 0 3px;
          letter-spacing: -0.01em;
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
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          flex-shrink: 0;
          transition: all 0.12s;
          font-size: 16px;
          line-height: 1;
        }

        .ctf-close-btn:hover {
          background: #f0f0f0;
          color: #0f172a;
        }

        .ctf-card-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ctf-field { display: flex; flex-direction: column; gap: 6px; }

        .ctf-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #6b7280;
          text-transform: uppercase;
        }

        .ctf-input, .ctf-textarea {
          width: 100%;
          border: 1px solid #f0f0f0;
          border-radius: 9px;
          background: #fafafa;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          box-sizing: border-box;
        }

        .ctf-input::placeholder, .ctf-textarea::placeholder { color: #d1d5db; }

        .ctf-input:focus, .ctf-textarea:focus {
          border-color: #e5e7eb;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.05);
        }

        .ctf-textarea { resize: none; min-height: 80px; line-height: 1.65; }

        .ctf-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ctf-cat-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          padding: 5px 13px;
          border-radius: 7px;
          border: 1px solid #f0f0f0;
          background: #fafafa;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.12s;
        }

        .ctf-cat-btn:hover { border-color: #e5e7eb; color: #374151; }

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
          letter-spacing: -0.03em;
          line-height: 1;
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
          transition: opacity 0.1s, transform 0.1s;
        }

        .ctf-bar:hover { opacity: 0.75; }

        .ctf-upload {
          position: relative;
          border: 1.5px dashed #f0f0f0;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: #fafafa;
        }

        .ctf-upload.drag, .ctf-upload:hover {
          border-color: #d1d5db;
          background: #f5f5f5;
        }

        .ctf-upload input {
          position: absolute; inset: 0;
          opacity: 0; cursor: pointer;
          width: 100%; height: 100%;
        }

        .ctf-upload-icon {
          width: 30px; height: 30px;
          margin: 0 auto 8px;
          display: flex; align-items: center; justify-content: center;
          background: #f0f0f0;
          border-radius: 8px;
          color: #9ca3af;
        }

        .ctf-upload-text { font-size: 13px; color: #9ca3af; }
        .ctf-upload-text b { color: #6b7280; font-weight: 600; }

        .ctf-upload-name {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 500; color: #374151;
          background: #f0f0f0; border-radius: 6px;
          padding: 3px 10px; margin-top: 4px;
        }

        .ctf-footer {
          padding: 16px 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #f5f5f5;
        }

        .ctf-footer-hint { font-size: 12px; color: #d1d5db; }

        .ctf-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          padding: 9px 20px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          letter-spacing: -0.01em;
        }

        .ctf-btn-primary {
          background: #0f172a;
          color: #fff;
        }

        .ctf-btn-primary:hover:not(:disabled) {
          background: #1e293b;
          box-shadow: 0 4px 14px rgba(15,23,42,0.2);
          transform: translateY(-1px);
        }

        .ctf-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .ctf-spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ctf-spin 0.7s linear infinite;
        }

        @keyframes ctf-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ctf-root">
        <div className="ctf-shell">
          <div className="ctf-card">

            <div className="ctf-card-header">
              <div>
                <div className="ctf-card-title">Log a milestone</div>
                <div className="ctf-card-sub">Document what you built, achieved, or learned.</div>
              </div>
              {onClose && (
                <button type="button" className="ctf-close-btn" onClick={onClose}>
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
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Description</label>
                  <textarea
                    className="ctf-textarea"
                    placeholder="What did you do, and why does it matter?"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Category</label>
                  <div className="ctf-cats">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`ctf-cat-btn${category === cat ? " active" : ""}`}
                        style={category === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : {}}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ctf-field">
                  <label className="ctf-label">Impact Score</label>
                  <div className="ctf-impact-row">
                    <span className="ctf-impact-val">
                      {impactScore}
                      <span style={{ fontSize: 13, fontWeight: 400, color: "#9ca3af" }}>/10</span>
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
                            background: active ? CATEGORY_COLORS[category] : "#f0f0f0",
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
                    <span style={{ fontWeight: 400, color: "#d1d5db", textTransform: "none", letterSpacing: 0 }}>
                      — optional
                    </span>
                  </label>
                  <div
                    className={`ctf-upload${dragging ? " drag" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => {
                      e.preventDefault(); setDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) { setImage(f); setImageName(f.name); }
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) { setImage(f); setImageName(f.name); }
                      }}
                    />
                    <div className="ctf-upload-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    {imageName
                      ? <div className="ctf-upload-name">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          {imageName}
                        </div>
                      : <div className="ctf-upload-text"><b>Click to upload</b> or drag & drop</div>
                    }
                  </div>
                </div>

              </div>

              <div className="ctf-footer">
                <span className="ctf-footer-hint">Title and description required</span>
                <button
                  type="submit"
                  className="ctf-btn ctf-btn-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? <><span className="ctf-spinner" /> Saving…</>
                    : <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add Entry
                      </>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}