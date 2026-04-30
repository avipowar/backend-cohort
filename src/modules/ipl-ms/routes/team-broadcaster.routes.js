import express from "express";
import * as controller from "../controllers/team-broadcaster.controller";

const router = express.Router();

router.post("/attach", controller.attach);
router.post("/detach", controller.detach);

router.get("/", controller.getAll);
router.get("/team/:teamId", controller.getByTeam);
router.get("/broadcaster/:broadcasterId", controller.getByBroadcaster);

export default router;