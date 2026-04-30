import * as service from "../services/team-sponsor.services.js";
import ApiResponse from "../../../common/utils/api.response.js";


export const attach = async (req, res, next) => {
    try {
        const { teamId, sponsorId } = req.body;

        const data = await service.attachSponsorToTeam(teamId, sponsorId);

        return ApiResponse.created(res, "Sponsor attached successfully", data);
    } catch (error) {
        next(error);
    }
};


export const detach = async (req, res, next) => {
    try {
        const { teamId, sponsorId } = req.body;

        await service.detachSponsorFromTeam(teamId, sponsorId);

        return ApiResponse.ok(res, "Sponsor detached successfully");
    } catch (error) {
        next(error);
    }
};


export const getAll = async (req, res, next) => {
    try {
        const data = await service.getAllTeamSponsors();
        return ApiResponse.ok(res, "All relations fetched", data);
    } catch (error) {
        next(error);
    }
};


export const getByTeam = async (req, res, next) => {
    try {
        const data = await service.getSponsorsByTeam(req.params.teamId);
        return ApiResponse.ok(res, "Sponsors fetched", data);
    } catch (error) {
        next(error);
    }
};


export const getBySponsor = async (req, res, next) => {
    try {
        const data = await service.getTeamsBySponsor(req.params.sponsorId);
        return ApiResponse.ok(res, "Teams fetched", data);
    } catch (error) {
        next(error);
    }
};