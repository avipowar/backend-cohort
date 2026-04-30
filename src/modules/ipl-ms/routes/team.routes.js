import { Router } from "express";
import * as controller from "../controllers/team.controllers.js"

const router = Router()

router.post("/", controller.createTeam)
router.get("/", controller.getAllTeams)
router.get("/:id", controller.getTeamById)
router.patch("/:id", controller.updateTeam)
router.delete("/:id", controller.deleteTeam)

export default router