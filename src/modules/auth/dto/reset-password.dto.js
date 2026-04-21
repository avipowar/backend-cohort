import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class NewPasswordDto extends BaseDto {
  static schema = Joi.object({
    token: Joi.string().required().messages({
      "any.required ": "Token is required",
    }),

    password: Joi.string()
      .min(8)
      .pattern(/(?=.*[A-Z])(?=.*\d)/)
      .message(
        "Password must contain at least one uppercase letter and one digit",
      )
      .required(),
  });
}

export default NewPasswordDto;
