import { Router } from "express";
import * as controller from "../controllers/team-sponsor.controller";

const router = Router();

router.post("/attach", controller.attach);
router.post("/detach", controller.detach);

router.get("/", controller.getAll);
router.get("/team/:teamId", controller.getByTeam);
router.get("/sponsor/:sponsorId", controller.getBySponsor);

export default router;