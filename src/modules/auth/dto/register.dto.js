import BaseDto from "../../../common/dto/base.dto.JS"
import Joi from "joi"

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50).required(),
        email : Joi.string().email().lowercase().required(),
        password: Joi.string().message("Password must contains 8 chars minimum").min(8).required(),
        role: Joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto;