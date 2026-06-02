import mongoose, { Document, Model } from "mongoose";

export interface ITimeline extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  impactScore: number;

  createdAt: Date;
  updatedAt: Date;
}

const timelineSchema = new mongoose.Schema<ITimeline>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Development",
        "Fitness",
        "Education",
        "Career",
        "Personal",
        "Other",
      ],
      default: "Other",
    },

    impactScore: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline: Model<ITimeline> = mongoose.model<ITimeline>(
  "Timeline",
  timelineSchema
);

export default Timeline;