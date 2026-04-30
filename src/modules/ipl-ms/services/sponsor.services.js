import Sponsor from "../models/sponsor-model.js"
import ApiError from "../../../common/utils/api.error.js"

export const createSponsor = async (data) => {
    const existing = await Sponsor.findOne({ name: data.name });

    if (existing) {
        throw ApiError.conflict("Sponsor already exists");
    }

    const sponsor = await Sponsor.create(data);
    return sponsor;
};

export const getAllSponsors = async () => {

    const sponsors = await Sponsor.find()

    if (sponsors.length === 0) {
        throw ApiError.notFound("No sponsors found");
    }

    return sponsors;
};

export const getSponsorById = async (id) => {
    const sponsor = await Sponsor.findById(id);

    if (!sponsor) {
        throw ApiError.notFound("Sponsor not found");
    }

    return sponsor;
};

export const updateSponsor = async (id, data) => {
    const updated = await Sponsor.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updated) {
        throw ApiError.notFound("Sponsor not found");
    }

    return updated;
};

export const deleteSponsor = async (id) => {
    const deleted = await Sponsor.findByIdAndDelete(id);

    if (!deleted) {
        throw ApiError.notFound("Sponsor not found");
    }

    return deleted;
};