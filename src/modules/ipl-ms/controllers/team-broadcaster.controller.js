// controllers/teamBroadcaster.controller.js

import * as service from "../services/team-broadcaster.services.js";
import ApiError from "../../../common/utils/api.error.js";

// ATTACH
export const attach = async (req, res, next) => {
    try {
        const { teamId, broadcasterId } = req.body;

        const data = await service.attachBroadcasterToTeam(
            teamId,
            broadcasterId
        );

        return ApiResponse.created(res, "Attached successfully", data);
    } catch (error) {
        next(error);
    }
};

// DETACH
export const detach = async (req, res, next) => {
    try {
        const { teamId, broadcasterId } = req.body;

        await service.detachBroadcasterFromTeam(teamId, broadcasterId);

        return ApiResponse.ok(res, "Detached successfully");
    } catch (error) {
        next(error);
    }
};

// GET ALL
export const getAll = async (req, res, next) => {
    try {
        const data = await service.getAllTeamBroadcasters();
        return ApiResponse.ok(res, "Fetched all relations", data);
    } catch (error) {
        next(error);
    }
};

// GET BY TEAM
export const getByTeam = async (req, res, next) => {
    try {
        const data = await service.getBroadcastersByTeam(req.params.teamId);
        return ApiResponse.ok(res, "Fetched broadcasters", data);
    } catch (error) {
        next(error);
    }
};

// GET BY BROADCASTER
export const getByBroadcaster = async (req, res, next) => {
    try {
        const data = await service.getTeamsByBroadcaster(req.params.broadcasterId);
        return ApiResponse.ok(res, "Fetched teams", data);
    } catch (error) {
        next(error);
    }
};