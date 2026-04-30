import { Router } from "express";
import * as broadcasterController from "../controllers/broadcaster.controller.js";

const router = Router();

router.post("/", broadcasterController.createBroadcaster);
router.get("/", broadcasterController.getAllBroadcasters);
router.get("/:id", broadcasterController.getBroadcasterById);
router.put("/:id", broadcasterController.updateBroadcaster);
router.delete("/:id", broadcasterController.deleteBroadcaster);

export default router;