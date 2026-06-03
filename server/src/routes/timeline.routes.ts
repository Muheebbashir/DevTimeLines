import { Router } from "express";
import { createTimeline, deleteTimeline, getUserTimelines,updateTimeline } from "../controllers/timeline.controller";

const router = Router();

router.post("/", createTimeline);
router.get("/:clerkId", getUserTimelines);
router.delete("/:id", deleteTimeline);
router.put("/:id", updateTimeline); 
export default router;