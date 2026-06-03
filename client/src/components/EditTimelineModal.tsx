import { useState } from "react";
import { useUpdateTimeline } from "../hooks/useUpdateTimeline";
import type { Timeline } from "../types/timeline";

interface Props {
timeline: Timeline;
onClose: () => void;
}

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

export default function EditTimelineModal({
timeline,
onClose,
}: Props) {
const updateMutation = useUpdateTimeline();

const [title, setTitle] = useState(timeline.title);
const [description, setDescription] = useState(
timeline.description
);
const [category, setCategory] = useState(
timeline.category
);
const [impactScore, setImpactScore] = useState(
timeline.impactScore
);

const handleSubmit = (
e: React.FormEvent
) => {
e.preventDefault();

updateMutation.mutate(
  {
    id: timeline._id,
    data: {
      title,
      description,
      category,
      impactScore,
    },
  },
  {
    onSuccess: () => {
      onClose();
    },
  }
);
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
<> <style>
{`
.edit-overlay {
position: fixed;
inset: 0;
background: rgba(15, 23, 42, 0.45);
backdrop-filter: blur(4px);
display: flex;
align-items: center;
justify-content: center;
padding: 1rem;
z-index: 9999;
}

.edit-card {
width: 100%;
max-width: 560px;
background: #fff;
border-radius: 14px;
border: 1px solid #e2e8f0;
box-shadow:
0 20px 50px rgba(0,0,0,.15);
overflow: hidden;
}

.edit-header {
padding: 1.5rem;
border-bottom: 1px solid #f1f5f9;
}

.edit-title {
font-size: 1.1rem;
font-weight: 600;
color: #0f172a;
margin-bottom: 4px;
}

.edit-sub {
font-size: 13px;
color: #94a3b8;
}

.edit-body {
padding: 1.5rem;
display: flex;
flex-direction: column;
gap: 1rem;
}

.edit-field {
display: flex;
flex-direction: column;
gap: 6px;
}

.edit-label {
font-size: 12px;
font-weight: 600;
color: #475569;
}

.edit-input,
.edit-textarea {
width: 100%;
border: 1px solid #e2e8f0;
border-radius: 8px;
padding: 10px 12px;
background: #f8fafc;
font-size: 13px;
outline: none;
box-sizing: border-box;
}

.edit-input:focus,
.edit-textarea:focus {
border-color: #94a3b8;
background: #fff;
}

.edit-textarea {
resize: none;
min-height: 90px;
}

.edit-cats {
display: flex;
flex-wrap: wrap;
gap: 6px;
}

.edit-cat {
border: 1px solid #e2e8f0;
background: #f8fafc;
color: #64748b;
border-radius: 6px;
padding: 6px 12px;
font-size: 12px;
cursor: pointer;
}

.edit-cat.active {
color: white;
border-color: transparent;
font-weight: 600;
}

.edit-impact-row {
display: flex;
justify-content: space-between;
margin-bottom: 8px;
}

.edit-impact-value {
font-size: 22px;
font-weight: 700;
color: #0f172a;
}

.edit-impact-tag {
font-size: 11px;
padding: 3px 8px;
background: #f1f5f9;
border-radius: 4px;
color: #64748b;
font-weight: 600;
}

.edit-bars {
display: flex;
gap: 4px;
height: 24px;
align-items: flex-end;
}

.edit-bar {
flex: 1;
border-radius: 3px;
cursor: pointer;
}

.edit-footer {
padding: 1rem 1.5rem;
border-top: 1px solid #f1f5f9;
display: flex;
justify-content: flex-end;
gap: .75rem;
}

.edit-btn {
border: none;
border-radius: 8px;
padding: 9px 18px;
font-size: 13px;
font-weight: 600;
cursor: pointer;
}

.edit-cancel {
background: #f1f5f9;
color: #475569;
}

.edit-save {
background: #0f172a;
color: white;
}

.edit-save:disabled {
opacity: .5;
cursor: not-allowed;
}
`}
</style>

  <div
    className="edit-overlay"
    onClick={onClose}
  >
    <div
      className="edit-card"
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <div className="edit-header">
        <div className="edit-title">
          Edit Timeline Entry
        </div>
        <div className="edit-sub">
          Update your milestone details.
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="edit-body">
          <div className="edit-field">
            <label className="edit-label">
              Title
            </label>
            <input
              className="edit-input"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">
              Description
            </label>
            <textarea
              className="edit-textarea"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">
              Category
            </label>

            <div className="edit-cats">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`edit-cat ${
                    category === cat
                      ? "active"
                      : ""
                  }`}
                  style={
                    category === cat
                      ? {
                          background:
                            CATEGORY_COLORS[
                              cat
                            ],
                        }
                      : {}
                  }
                  onClick={() =>
                    setCategory(cat)
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="edit-field">
            <label className="edit-label">
              Impact Score
            </label>

            <div className="edit-impact-row">
              <span className="edit-impact-value">
                {impactScore}/10
              </span>

              <span className="edit-impact-tag">
                {scoreLabel}
              </span>
            </div>

            <div className="edit-bars">
              {Array.from(
                { length: 10 },
                (_, i) => {
                  const value = i + 1;

                  return (
                    <div
                      key={value}
                      className="edit-bar"
                      style={{
                        height:
                          8 +
                          value * 1.5,
                        background:
                          value <=
                          impactScore
                            ? CATEGORY_COLORS[
                                category
                              ]
                            : "#e2e8f0",
                      }}
                      onClick={() =>
                        setImpactScore(
                          value
                        )
                      }
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div className="edit-footer">
          <button
            type="button"
            className="edit-btn edit-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="edit-btn edit-save"
            disabled={
              updateMutation.isPending
            }
          >
            {updateMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
</>

);
}
