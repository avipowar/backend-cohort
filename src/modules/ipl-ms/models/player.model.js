import mongoose from "mongoose";

const playerSchema = mongoose.Schema({

    name: {
        type : String,
        trim: true,
        minlength: 2,
        maxlength : 100,
        required: [true, "Player name is required"],

    },
    role : {
        type: String,
        required: [true, "Player role is required"],
        enum : {
            value : ["batsman", "bowler", "all-rounder", "wicket-keeper"],
            message: 'Role must be: "batsman" , "bowler" , "all-rounder" , "wicket-keeper"',
        }
    },
    teamId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: [true, "Team Id is required"],
    }

}, {timestamps: true})

export default mongoose.model("Player", playerSchema)