import TeamSponsor from "../models/team-sponsor.model.js";
import ApiError from "../../../common/utils/api.error.js";


export const attachSponsorToTeam = async (teamId, sponsorId) => {
    try {
        const relation = await TeamSponsor.create({
            teamId,
            sponsorId
        });

        return relation;
    } catch (error) {
        if (error.code === 11000) {
            throw ApiError.conflict("Sponsor already attached to this team");
        }
        throw error;
    }
};


export const detachSponsorFromTeam = async (teamId, sponsorId) => {
    const relation = await TeamSponsor.findOneAndDelete({
        teamId,
        sponsorId
    });

    if (!relation) {
        throw ApiError.notFound("Relation not found");
    }

    return relation;
};


export const getAllTeamSponsors = async () => {
    const data = await TeamSponsor.find()
        .populate("teamId")
        .populate("sponsorId");

    if (data.length === 0) {
        throw ApiError.notFound("No relations found");
    }

    return data;
};


export const getSponsorsByTeam = async (teamId) => {
    const data = await TeamSponsor.find({ teamId })
        .populate("sponsorId");

    if (data.length === 0) {
        throw ApiError.notFound("No sponsors for this team");
    }

    return data;
};


export const getTeamsBySponsor = async (sponsorId) => {
    const data = await TeamSponsor.find({ sponsorId })
        .populate("teamId");

    if (data.length === 0) {
        throw ApiError.notFound("No teams for this sponsor");
    }

    return data;
};