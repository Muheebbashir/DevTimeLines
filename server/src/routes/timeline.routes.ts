import { Router } from "express";
import { createTimeline, getUserTimelines } from "../controllers/timeline.controller";

const router = Router();

router.post("/", createTimeline);
router.get("/:clerkId", getUserTimelines);

export default router;