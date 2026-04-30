import { Router } from "express";
import * as controller from "../controllers/player.controllers.js" 

const router = Router()

// create player
router.post("/", controller.addNewPlayer)

// read all player 
router.get("/", controller.getAllPlayers)

// read one player
router.get("/:id", controller.getPlayer)

// update player
router.patch("/:id", controller.updatePlayer)


// delete player
router.delete("/:id", controller.deletePlayer)

export default router;