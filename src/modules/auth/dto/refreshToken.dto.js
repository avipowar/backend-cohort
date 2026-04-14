class RefreshTokenDto extends BaseDto {
  static schema = Joi.object({
    refreshToken: Joi.string().required(),
  });
}

export default RefreshTokenDto