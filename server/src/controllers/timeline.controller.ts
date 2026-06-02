import { Request, Response } from "express";
import Timeline from "../models/Timeline";
import User from "../models/User";

export const createTimeline = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      clerkId,
      title,
      description,
      category,
      impactScore,
      imageUrl,
    } = req.body;

    // Check required fields
    if (
      !clerkId ||
      !title ||
      !description ||
      !category ||
      !impactScore
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

export const getUserTimelines = async (
  req: Request,
  res: Response,
) => {
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