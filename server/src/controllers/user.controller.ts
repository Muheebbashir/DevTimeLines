import User from "../models/User";
import { Request, Response } from "express";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, username, avatar, displayName } = req.body;

    // This will find a user by clerkId and update it, or create it if it doesn't exist.
    if(!clerkId){
      return res.status(400).json({
        success: false,
        message: "clerkId is required",
      });
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          email,
          username,
          avatar,
          displayName,
        },
      },
      { upsert: true, new: true,runValidators: true } // upsert: true creates if not found, new: true returns the new/updated doc
    );

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in syncUser:", error); // It's good practice to log the error
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.query;

    if (typeof clerkId !== 'string') {
      return res.status(400).json({
        success: false,
        message: "clerkId must be a string",
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};