import { Request, Response } from "express";
import Project from "../models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { clerkId, title, description, status, progress } = req.body;

    if (!clerkId || !title) {
      return res.status(400).json({
        success: false,
        message: "clerkId and title are required",
      });
    }

    const project = await Project.create({
      clerkId,
      title,
      description,
      status,
      progress,
    });

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserProjects = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const projects = await Project.find({ clerkId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};