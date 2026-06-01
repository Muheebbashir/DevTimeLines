import { Router } from "express";
import { getMe, syncUser } from "../controllers/user.controller";

const router = Router();

router.post("/sync", syncUser);
router.get("/me", getMe);
export default router;