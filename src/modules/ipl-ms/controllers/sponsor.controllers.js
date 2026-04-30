import * as sponsorService from "../services/sponsor.services.js"
import ApiResponse from "../../../common/utils/api.response.js";

export const createSponsor = async (req, res, next) => {
    try {
        const sponsor = await sponsorService.createSponsor(req.body);
        return ApiResponse.created(res, "Sponsor created successfully", sponsor);
    } catch (error) {
        next(error);
    }
};

export const getAllSponsors = async (req, res, next) => {
    try {
        const sponsors = await sponsorService.getAllSponsors();
        return ApiResponse.ok(res, "Sponsors fetched successfully", sponsors);
    } catch (error) {
        next(error);
    }
};

export const getSponsorById = async (req, res, next) => {
    try {
        const sponsor = await sponsorService.getSponsorById(req.params.id);
        return ApiResponse.ok(res, "Sponsor fetched successfully", sponsor);
    } catch (error) {
        next(error);
    }
};

export const updateSponsor = async (req, res, next) => {
    try {
        const updated = await sponsorService.updateSponsor(
            req.params.id,
            req.body
        );
        return ApiResponse.ok(res, "Sponsor updated successfully", updated);
    } catch (error) {
        next(error);
    }
};

export const deleteSponsor = async (req, res, next) => {
    try {
        await sponsorService.deleteSponsor(req.params.id);
        return ApiResponse.noContent(res);
    } catch (error) {
        next(error);
    }
};