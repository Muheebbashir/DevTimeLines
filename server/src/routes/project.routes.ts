import { Router } from "express";
import {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

const router = Router();

router.post("/", createProject);
router.get("/:clerkId", getUserProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;