import Broadcaster from "../models/broadcaster.model.js"
import ApiError from "../../../common/utils/api.error.js"

// CREATE
export const createBroadcaster = async (data) => {
    const existing = await Broadcaster.findOne({ name: data.name });

    if (existing) {
        throw ApiError.conflict("Broadcaster already exists");
    }

    return await Broadcaster.create(data);
};

// GET ALL (simple — no query)
export const getAllBroadcasters = async () => {
    const broadcasters = await Broadcaster.find().sort({ createdAt: -1 });

    if (broadcasters.length === 0) {
        throw ApiError.notFound("No broadcasters found");
    }

    return broadcasters;
};

// GET ONE
export const getBroadcasterById = async (id) => {
    const broadcaster = await Broadcaster.findById(id);

    if (!broadcaster) {
        throw ApiError.notFound("Broadcaster not found");
    }

    return broadcaster;
};

// UPDATE
export const updateBroadcaster = async (id, data) => {
    const updated = await Broadcaster.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updated) {
        throw ApiError.notFound("Broadcaster not found");
    }

    return updated;
};

// DELETE
export const deleteBroadcaster = async (id) => {
    const deleted = await Broadcaster.findByIdAndDelete(id);

    if (!deleted) {
        throw ApiError.notFound("Broadcaster not found");
    }

    return deleted;
};