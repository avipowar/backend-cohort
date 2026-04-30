import ApiResponse from "../../../common/utils/api.response.js";
import * as playerServices from "../services/player.services.js"

const addNewPlayer = async(req, res) => {
    const player = await playerServices.addNewPlayer(req.body)
    ApiResponse.ok(res, "Player added successfully", player)
}

const getAllPlayers = async(req, res) => {
    const players = await playerServices.getAllPlayers()
    ApiResponse.ok(res, "Players fetch successfully", players)
}

const getPlayer = async(req, res) => {
    const player = await playerServices.getPlayer(req.params.id)
    ApiResponse.ok(res, "Player fetch successfully", player)
}

const updatePlayer = async(req, res) => {
    console.log("update body:", req.body)
    const updatePlayer = await playerServices.updatePlayer(req.params.id, req.body)
    ApiResponse.ok(res, "Player updated successfully", updatePlayer)
}

const deletePlayer = async(req, res) => {
    const deletePlayer = await playerServices.deletePlayer(req.params.id)
    ApiResponse.ok(res, "Player deleted successfully", deletePlayer)
}

export {
    addNewPlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer,
    deletePlayer
}