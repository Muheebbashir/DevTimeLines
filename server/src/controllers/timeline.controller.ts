import { Request, Response } from "express";
import Timeline from "../models/Timeline";
import User from "../models/User";

export const createTimeline = async (req: Request, res: Response) => {
  try {
    const { clerkId, title, description, category, impactScore, imageUrl } =
      req.body;

    // Check required fields
    if (
      !clerkId ||
      !title ||
      !description ||
      !category ||
      impactScore === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find user
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create timeline entry
    const timeline = await Timeline.create({
      userId: user._id,
      title,
      description,
      category,
      impactScore,
      imageUrl: imageUrl || "",
    });

    // Growth score
    user.growthScore += Number(impactScore);

    // Streak calculation
    const today = new Date();

    if (!user.lastActivityDate) {
      user.streak = 1;
    } else {
      const lastDate = new Date(user.lastActivityDate);

      const lastDay = new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate(),
      );

      const currentDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      const diffTime = currentDay.getTime() - lastDay.getTime();

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
      // diffDays === 0
      // same day → keep streak unchanged
    }

    user.lastActivityDate = today;

    await user.save();

    return res.status(201).json({
      success: true,
      timeline,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserTimelines = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const timelines = await Timeline.find({
      userId: user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      timelines,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
