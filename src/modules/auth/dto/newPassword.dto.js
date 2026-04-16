import BaseDto from "../../../common/dto/base.dto.js"
import Joi from "joi"

class NewPasswordDto extends BaseDto {
    static schema = Joi.object({
        token : Joi.string().required().messages({
            "any.required ": "Token is required"
        }),

        password: Joi.string().min(8).required().messages({
            "string.min" :  "Password must be at least 8 characters",
        })
    }) 
}

export default NewPasswordDto;