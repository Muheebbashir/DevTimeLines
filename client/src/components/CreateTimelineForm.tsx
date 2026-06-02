import { useState } from "react";
import { useMe } from "../hooks/useMe";
import { api } from "../services/api";
import { toast } from "sonner";

export default function CreateTimelineForm() {
  const { data: currentUser } = useMe();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [impactScore, setImpactScore] = useState(5);
  const [image, setImage] = useState<File | null>(null);

  const categories = [
    "Development",
    "Fitness",
    "Education",
    "Career",
    "Personal",
    "Other",
  ];

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        const uploadRes = await api.post(
          "/upload",
          formData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      // Create timeline entry
      const timelineRes = await api.post(
        "/timeline",
        {
          clerkId: currentUser?.clerkId,
          title,
          description,
          category,
          impactScore,
          imageUrl,
        }
      );

      console.log(
        "Timeline Created:",
        timelineRes.data
      );

      toast.success("Timeline created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("Development");
      setImpactScore(5);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create timeline");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Timeline Entry</h2>

      <div>
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder="Built Authentication System"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>Description</label>
        <br />
        <textarea
          placeholder="Describe what you achieved..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>Category</label>
        <br />
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>
          Impact Score (1-10)
        </label>
        <br />
        <input
          type="number"
          min={1}
          max={10}
          value={impactScore}
          onChange={(e) =>
            setImpactScore(
              Number(e.target.value)
            )
          }
        />
      </div>

      <br />

      <div>
        <label>Image</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(
                e.target.files[0]
              );
            }
          }}
        />
      </div>

      <br />

      <button type="submit">
        Create Entry
      </button>
    </form>
  );
}