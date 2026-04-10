import User from "./auth.model"
import ApiError from "../../common/utils/api.error"
import { generateResetToken } from "../../common/utils/jwt-utils"

const register = async ({name, email, password, role}) => {

    const existing = await User.findOne({email})
    if(existing) throw ApiError.conflict("Email already exist")

    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name, 
        email,
        password,
        role,
        verificationToken: hashedToken
    })


    
    // TODO: send an email to user with token: rawToken

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken
    
    return userObj
}

register("avi", "powravinash@123", "pass@123", "admin")

export {register}