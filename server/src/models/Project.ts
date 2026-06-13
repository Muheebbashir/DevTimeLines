import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
  clerkId: string;
  title: string;
  description: string;
  status: "Planned" | "In Progress" | "Completed";
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    clerkId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "Planned",
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema
);

export default Project;