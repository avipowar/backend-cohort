import BaseDto from "../../../common/dto/base.dto.JS"
import Joi from "joi"

class NewPasswordDto extends BaseDto {
    static schema = Joi.object({
        token : Joi.string().required().message({
            "any.required ": "Token is required"
        }),

        password: Joi.string().min(8).required().message({
            "string.min" :  "Password must be at least 8 characters",
        })
    }) 
}

export default NewPasswordDto;