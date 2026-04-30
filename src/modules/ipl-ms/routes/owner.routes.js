import { Router } from "express";
import * as controller from "../controllers/owner.controllers.js"

const router = Router();


// create new owner
router.post("/", controller.createOwner)

// get all owners
router.get("/", controller.getAllOwners)

// get owner by id
router.get("/:id", controller.getOwnerById)

// update owner 
router.put("/:id", controller.updateOwner)

//  delete owner
router.delete("/:id",controller.deleteOwner)

export default router;