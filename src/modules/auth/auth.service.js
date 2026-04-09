import User from "./auth.model"
import ApiError from "../../common/utils/api.error"

const register = async ({name, email, password, role}) => {

    const existing = await User.findOne({email})
    if(existing) throw ApiError.conflict("Email already exist")
    
    return resObj
}

export {register}