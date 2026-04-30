import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Team name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
        unique : true
    },

    ownerId: {
        type: mongoose.SchemaType.Types.objectId,
        ref: "owner",
        required:[true , "Team Id is required"]
    }

}, {timestamps: true});

teamSchema.index({ name: 1, ownerId: 1 }, { unique: true });

export default mongoose.model("Team", teamSchema)

