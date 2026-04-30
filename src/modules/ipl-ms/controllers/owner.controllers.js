import ApiResponse from "../../../common/utils/api.response.js"
import * as ownerService from  "../services/owner.services.js"

const createOwner = async(req, res) => {
    const owner = await ownerService.createOwner(req.body);
    ApiResponse.ok(res, "Owner created successfully", owner)
}

const getAllOwners = async(req, res) => {
    console.log(req.params)
    const owners = await ownerService.getAllOwners()
    ApiResponse.ok(res, "owners all fetched successfully", owners)
}

const getOwnerById = async(req, res) => {
    const id = req.params.id
    const owner = await ownerService.getOwnerById(id)
    ApiResponse.ok(res, "Owner fetched successfully", owner)
}

const updateOwner = async(req, res) => {
    console.log("updateowner controller:" ,req.body)
    const updateOwner = await ownerService.updateOwner(req.params.id, req.body)
    ApiResponse.ok(res, "owner updated successfully", updateOwner)
}

const deleteOwner = async(req, res) => {
    const deleteOwner = await ownerService.deleteOwner(req.params.id)
    ApiResponse.ok(res, "owner deleted successfully", deleteOwner)
}

export {
    createOwner, 
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner
}

