import ApiError from "../../../common/utils/api.error.js"
import Player from "../models/player.model.js"
import Team from "../models/team.model.js"


const addNewPlayer = async ({name, role, teamId}) => {

    const PlayerExist = await Player.findOne({
        name,
        role,
        teamId
    }).populate("teamId", "name")


    if(PlayerExist){
        throw ApiError.conflict(`Player already exist in this ${PlayerExist.teamId.name}`)
    }

    const player = await Player.create({
        name,
        role,
        teamId
    })

    return player;
}

const getAllPlayers = async() => {
    const players = await Player.find().populate("teamId");
    return players;
}

const getPlayer = async(id) => {
    const player = await Player.findById(id)
    if(!player) {
        throw ApiError.notFound("Player Not Found")
    }

    return player;
}

const updatePlayer = async(id, {name, role, teamId}) => {

    const player = await Player.findById(id)
    if(!player) {
        throw ApiError.notFound("Player Not Found")
    }

    if(name) {
        player.name = name
    }

    if(role) {
        player.role = role
    }

    if(teamId) {
        const team = await Team.findById(teamId);
        if(!team) {
            throw ApiError.notFound("Team not found");
        }
        player.teamId = teamId
    }

    await player.save()

    return player;
}

const deletePlayer = async(id) => {
    
    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
        throw ApiError.notFound("Player not found");
    }

    return deletedPlayer;
}

export {
    addNewPlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer, 
    deletePlayer
}