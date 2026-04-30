import mongoose from "mongoose";

const teamBroadcasterSchema = mongoose.Schema({

    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: [true, "Team is required"],
    },
    broadcasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Broadcaster",
        required: [true, "Broadcaster is required"],
    }

},{timestamps: true})

teamBroadcasterSchema.index({teamId: 1, broadCasterId: 1}, {unique: true})

export default mongoose.model("TeamBroadcaster", teamBroadcasterSchema)