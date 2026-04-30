import TeamBroadcaster from "../models/broadcaster.model.js";
import ApiError from "../../../common/utils/api.error.js";


export const attachBroadcasterToTeam = async (teamId, broadcasterId) => {
    try {
        const relation = await TeamBroadcaster.create({
            teamId,
            broadcasterId
        });

        return relation;
    } catch (error) {
        if (error.code === 11000) {
            throw ApiError.conflict("Broadcaster already attached to this team");
        }
        throw error;
    }
};


export const detachBroadcasterFromTeam = async (teamId, broadcasterId) => {
    const relation = await TeamBroadcaster.findOneAndDelete({
        teamId,
        broadcasterId
    });

    if (!relation) {
        throw ApiError.notFound("Relation not found");
    }

    return relation;
};


export const getAllTeamBroadcasters = async () => {
    const data = await TeamBroadcaster.find()
        .populate("teamId")
        .populate("broadcasterId");

    if (data.length === 0) {
        throw ApiError.notFound("No relations found");
    }

    return data;
};


export const getBroadcastersByTeam = async (teamId) => {
    const data = await TeamBroadcaster.find({ teamId })
        .populate("broadcasterId");

    if (data.length === 0) {
        throw ApiError.notFound("No broadcasters for this team");
    }

    return data;
};


export const getTeamsByBroadcaster = async (broadcasterId) => {
    const data = await TeamBroadcaster.find({ broadcasterId })
        .populate("teamId");

    if (data.length === 0) {
        throw ApiError.notFound("No teams for this broadcaster");
    }

    return data;
};