import mongoose from "mongoose";

const broadcasterSchema  = mongoose.Schema({

    name: {
        type : String,
        required : [true, "broadcaster name is required"],
        trim : true,
        minlength: 2,
        maxlength :100,
    },


},{timestamps: true})

export default mongoose.model("Broadcaster", broadcasterSchema)