import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  growthScore: number;
  streak: number;
  displayName: string;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      default: "",
    },
    displayName: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    growthScore: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
