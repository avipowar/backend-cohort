import ApiResponse from "../../../common/utils/api.response"
import * as teamServices from "../services/team.services.js"

const createTeam = async (req, res) => {
    const team = await teamServices.createTeam(req.body)
    ApiResponse.ok(res, "team is created successfully", team)
}

const getAllTeams = async(req, res) => {
    const teams = await teamServices.getAllTeams()
    ApiResponse.ok(res, "teams fetch successfully", teams)
}

const getTeamById = async(req, res) => {
    const team = await teamServices.getTeamById(req.params.id)
    ApiResponse.ok(res,"team fetch successfully", team )
}

const updateTeam = async(req, res) => {
    const updateTeam = await teamServices.updateTeam(req.params.id, req.body)
    ApiResponse.ok(res, "team updated successfully", updateTeam)
}

const deleteTeam = async () => {
    const deleteTeam = await teamServices.deleteTeam(req.params.id)
    ApiResponse.ok(res, "team deleted successfully", deleteTeam)
}

export {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam, 
    deleteTeam
}