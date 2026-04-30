import * as broadcasterService from "../services/broadcaster.services.js";
import ApiResponse from "../utils/api.response.js";

// CREATE
export const createBroadcaster = async (req, res, next) => {
    try {
        const data = await broadcasterService.createBroadcaster(req.body);
        return ApiResponse.created(res, "Broadcaster created", data);
    } catch (error) {
        next(error);
    }
};

// GET ALL
export const getAllBroadcasters = async (req, res, next) => {
    try {
        const data = await broadcasterService.getAllBroadcasters();
        return ApiResponse.ok(res, "Broadcasters fetched", data);
    } catch (error) {
        next(error);
    }
};

// GET ONE
export const getBroadcasterById = async (req, res, next) => {
    try {
        const data = await broadcasterService.getBroadcasterById(req.params.id);
        return ApiResponse.ok(res, "Broadcaster fetched", data);
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const updateBroadcaster = async (req, res, next) => {
    try {
        const data = await broadcasterService.updateBroadcaster(
            req.params.id,
            req.body
        );
        return ApiResponse.ok(res, "Broadcaster updated", data);
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleteBroadcaster = async (req, res, next) => {
    try {
        await broadcasterService.deleteBroadcaster(req.params.id);
        return ApiResponse.noContent(res);
    } catch (error) {
        next(error);
    }
};