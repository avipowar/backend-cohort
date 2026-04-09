import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type: String,
        trim: true,
        minlength : 2,
        maxlength: 50,
        required : [true, "Name is required"]
    },
    email : {
        type: String,
        trim: true,
        unique: true,
        required : [true, "email is required"]
    }
})

export default mongoose.model("User", userSchema)