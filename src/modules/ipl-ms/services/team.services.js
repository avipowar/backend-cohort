import ApiError from "../../../common/utils/api.error";
import Team from "../models/team.model.js"
import Owner from "../models/owner-model.js"

const createTeam = async ({name, ownerId})=> {

    const owner = Owner.findById(ownerId)
    if(!owner) {
        throw ApiError.notFound("Owner Not found")
    }

    const team = await Team.findOne({name, ownerId})
    if(team) {
        throw ApiError.conflict("Team already exist")
    }

    const newTeam = await Team.create({
        name ,
        ownerId
    })

    return newTeam;
}

const getAllTeams = async () => {

    const teams = await Team.find()

    if(teams.length === 0) {
        throw ApiError.notFound("Teams not found")
    }

    return teams;
}

const getTeamById = async (id) => {


    const team = await Team.findById(id)
    if(!team) {
        throw ApiError.notFound("Teams not found")
    }

    return team;
}

const updateTeam = async (id, {name, ownerId}) =>   {

    const team = await Team.findById(id);
    if(!team) {
        throw ApiError.notFound("Teams not found")
    }

    if(name) {

        const existing = await Team.findOne({ name });

        if (existing && existing._id.toString() !== id) {
            throw ApiError.conflict("Team name already exists");
        }

        team.name = name;
    }

    if(ownerId) {

        const owner = await Owner.findById(ownerId);

        if (!owner) {
            throw ApiError.notFound("Owner not found");
        }

        team.ownerId = ownerId;
    }

    await team.save()

    return team;
}

const deleteTeam = async (id) => {

     const team = await Team.findById(id)
    
        if(!team) {
            return ApiError.notFound("owner not found")
        }

    const deleteTeam = await Team.findByIdAndDelete(id)
    return deleteTeam
}