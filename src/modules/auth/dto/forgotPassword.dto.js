import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class forgotPasswordDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string().email().lowercase().required().message({
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),
  });
}

export default forgotPasswordDto;