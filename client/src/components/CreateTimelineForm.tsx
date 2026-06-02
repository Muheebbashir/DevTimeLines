import { useState } from "react";
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

export default function CreateTimelineForm() {
  const { data: currentUser } = useMe();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      toast.success("Entry added to your timeline.");
      setTitle(""); setDescription(""); setCategory("Development");
      setImpactScore(5); setImage(null); setImageName("");
    },
    onError: () => toast.error("Failed to create entry."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) { toast.error("Title and description are required."); return; }
    try {
      let imageUrl = "";
      if (image) {
        const fd = new FormData();
        fd.append("image", image);
        const r = await api.post("/upload", fd);
        imageUrl = r.data.imageUrl;
      }
      mutation.mutate({ imageUrl });
    } catch { toast.error("Upload failed."); }
  };

  const scoreLabel = impactScore <= 3 ? "Low" : impactScore <= 6 ? "Medium" : impactScore <= 8 ? "High" : "Critical";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .ctf-root {
          font-family: 'Sora', sans-serif;
          background: #f8f9fb;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 3rem 1.25rem;
        }

        .ctf-shell {
          width: 100%;
          max-width: 560px;
        }

        /* Page label */
        .ctf-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 1.75rem;
        }
        .ctf-eyebrow-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* Card */
        .ctf-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
        }

        .ctf-card-header {
          padding: 1.75rem 1.75rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .ctf-card-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .ctf-card-sub {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 400;
        }

        .ctf-card-body {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Field */
        .ctf-field { display: flex; flex-direction: column; gap: 5px; }

        .ctf-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #475569;
        }

        .ctf-input, .ctf-textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          box-sizing: border-box;
        }
        .ctf-input::placeholder, .ctf-textarea::placeholder { color: #cbd5e1; }
        .ctf-input:focus, .ctf-textarea:focus {
          border-color: #94a3b8;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(148,163,184,0.15);
        }
        .ctf-textarea { resize: none; min-height: 88px; line-height: 1.6; }

        /* Category */
        .ctf-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ctf-cat-btn {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 5px 13px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          transition: all 0.13s;
          letter-spacing: 0.01em;
        }
        .ctf-cat-btn:hover { border-color: #cbd5e1; color: #334155; background: #f1f5f9; }
        .ctf-cat-btn.active {
          border-color: transparent;
          color: #fff;
          font-weight: 600;
        }

        /* Impact */
        .ctf-impact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .ctf-impact-val {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .ctf-impact-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 8px;
          border-radius: 4px;
          background: #f1f5f9;
          color: #64748b;
        }
        .ctf-bars {
          display: flex;
          gap: 4px;
          align-items: flex-end;
          height: 24px;
        }
        .ctf-bar {
          flex: 1;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.12s, transform 0.1s;
        }
        .ctf-bar:hover { transform: scaleY(1.1); }

        /* Upload */
        .ctf-upload {
          position: relative;
          border: 1.5px dashed #e2e8f0;
          border-radius: 8px;
          padding: 1.25rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: #f8fafc;
        }
        .ctf-upload.drag, .ctf-upload:hover {
          border-color: #94a3b8;
          background: #f1f5f9;
        }
        .ctf-upload input {
          position: absolute; inset: 0;
          opacity: 0; cursor: pointer;
          width: 100%; height: 100%;
        }
        .ctf-upload-icon {
          width: 32px; height: 32px;
          margin: 0 auto 8px;
          display: flex; align-items: center; justify-content: center;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #64748b;
        }
        .ctf-upload-text { font-size: 13px; color: #94a3b8; }
        .ctf-upload-text b { color: #475569; font-weight: 600; }
        .ctf-upload-name {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 500; color: #475569;
          background: #f1f5f9; border-radius: 5px;
          padding: 3px 10px; margin-top: 4px;
        }

        /* Divider */
        .ctf-divider { height: 1px; background: #f1f5f9; margin: 0 -1.75rem; }

        /* Footer */
        .ctf-footer {
          padding: 1.25rem 1.75rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .ctf-footer-hint { font-size: 12px; color: #cbd5e1; }

        .ctf-btn {
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          padding: 9px 22px;
          border-radius: 8px;
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
          box-shadow: 0 1px 2px rgba(0,0,0,0.12);
        }
        .ctf-btn-primary:hover:not(:disabled) {
          background: #1e293b;
          box-shadow: 0 4px 12px rgba(15,23,42,0.2);
          transform: translateY(-1px);
        }
        .ctf-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

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

          <div className="ctf-eyebrow">
            <span>New Entry</span>
            <div className="ctf-eyebrow-line" />
          </div>

          <div className="ctf-card">
            <div className="ctf-card-header">
              <div className="ctf-card-title">Log a milestone</div>
              <div className="ctf-card-sub">Document what you built, achieved, or learned.</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ctf-card-body">

                {/* Title */}
                <div className="ctf-field">
                  <label className="ctf-label">Title</label>
                  <input
                    className="ctf-input"
                    placeholder="e.g. Shipped user authentication"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="ctf-field">
                  <label className="ctf-label">Description</label>
                  <textarea
                    className="ctf-textarea"
                    placeholder="What did you do, and why does it matter?"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                {/* Category */}
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

                {/* Impact Score */}
                <div className="ctf-field">
                  <label className="ctf-label">Impact Score</label>
                  <div className="ctf-impact-row">
                    <span className="ctf-impact-val">{impactScore}<span style={{ fontSize: 13, fontWeight: 400, color: "#94a3b8" }}>/10</span></span>
                    <span className="ctf-impact-tag">{scoreLabel}</span>
                  </div>
                  <div className="ctf-bars">
                    {Array.from({ length: 10 }, (_, i) => {
                      const n = i + 1;
                      const active = n <= impactScore;
                      const h = 8 + (n / 10) * 16;
                      return (
                        <div
                          key={n}
                          className="ctf-bar"
                          style={{
                            height: h,
                            background: active ? CATEGORY_COLORS[category] : "#e2e8f0",
                          }}
                          onClick={() => setImpactScore(n)}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="ctf-field">
                  <label className="ctf-label">
                    Attachment <span style={{ fontWeight: 400, color: "#cbd5e1", textTransform: "none", letterSpacing: 0 }}>— optional</span>
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
                      type="file" accept="image/*"
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) { setImage(f); setImageName(f.name); }
                      }}
                    />
                    <div className="ctf-upload-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    {imageName
                      ? <div className="ctf-upload-name">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          {imageName}
                        </div>
                      : <div className="ctf-upload-text"><b>Click to upload</b> or drag & drop</div>
                    }
                  </div>
                </div>

              </div>

              <div className="ctf-divider" />

              <div className="ctf-footer">
                <span className="ctf-footer-hint">All fields marked are required</span>
                <button
                  type="submit"
                  className="ctf-btn ctf-btn-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? <><span className="ctf-spinner" /> Saving…</>
                    : <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
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