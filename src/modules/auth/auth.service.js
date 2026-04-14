import User from "./auth.model";
import ApiError from "../../common/utils/api.error";
import {
  generateResetToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt-utils";
import crypto from "crypto";

const register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("Email already exist");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  // TODO: send an email to user with token: rawToken

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

const hashed = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const login = async ({ email, password }) => {
  // take email and find user in db
  // then check password is correct
  // check if verified or not

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw ApiError.unauthorized("Invalid Email or Password");

  // some how i will check Password
  const isMatch = user.comparePassword(password);
  if(!isMatch) throw ApiError.unauthorized("Invalid Email or Password");


  if (!user.isVerified) {
    throw ApiError.forbidden("Please Verify your email before login");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashed(refreshToken);

  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, refreshToken, accessToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token is missing");

  const decode = verifyRefreshToken(token);

  const user = await User.findById(decode.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("User Not Found");

  if (user.refreshToken !== hashed(token)) {
    throw ApiError("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  user.refreshToken = hashed(refreshToken);

  await user.save({ validateBeforeSave: false });

  return { accessToken };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.unauthorized("User Not Found");

  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  // await User.findByIdAndUpdate(userId, {refreshToken: null})
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound("No account with that email");

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // i don't know how to send mail to the user
};

const newPassword = async (token, newPassword) => {
  //  step 1
  const hashedToken = hashed(token);

  //    step 2
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }, //  $gt = greater than {resetPasswordExpires > right time}
  }).select("+password");

  if (!user) throw ApiError.badRequest("Token is Invalid Or expired");

  //  step 3
  user.password = newPassword;

  //   step 4
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return {message : "Password reset successful"}
};

export { register, login, refresh, logout, forgotPassword, newPassword };
