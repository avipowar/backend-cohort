import User from "./auth.model.js";
import ApiError from "../../common/utils/api.error.js";
import {
  generateResetToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt-utils.js";
import crypto from "crypto";
import { sendVerificationEmail, sendResetPasswordEmail } from "../../common/config/email.js";
import fs from "node:fs"
import imagekit from "../../common/config/imagekit.js";

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
  try {
    await sendVerificationEmail(email, rawToken)
  } catch (error) {
    console.error(error)
  }

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


  // if (!user.isVerified) {
  //   throw ApiError.forbidden("Please Verify your email before login");
  // }

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
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  user.refreshToken = hashed(refreshToken);

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.unauthorized("User Not Found");

  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  // await User.findByIdAndUpdate(userId, {refreshToken: null})
};

const verifyEmail = async(token) => {

   const trimmed = String(token).trim();
  if (!trimmed) {
    throw ApiError.badRequest("Invalid or expired verification token");
  }

  const hashToken =  hashed(trimmed)

  const user = await User.findOne({verificationToken : hashToken}).select("+verificationToken");

  if(!user) throw ApiError.badRequest("Invalid or expired verification token");

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return user;

}

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound("No account with that email");

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // i don't know how to send mail to the user
   try {
    await sendResetPasswordEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send reset email:", err.message);
  }
};

const resetPassword = async (token, newPassword) => {
  //  step 1
  const hashedToken = hashed(token);

  //    step 2
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }, //  $gt = greater than {resetPasswordExpires > right time}
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) throw ApiError.badRequest("Token is Invalid Or expired");

  //  step 3
  user.password = newPassword;

  //   step 4
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return {message : "Password reset successful"}
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

const uploadAvatar = async (userId , file) => {
  try {
    console.log(file)
    const fileStream = fs.createReadStream(file.path)

    const uploadResponse = await imagekit.files.upload({
      file: fileStream,
      filename: file.filename,
      folder: "/users-avatar"
    })

    await User.findByIdAndUpdate(userId, {avatar: uploadResponse.url}, {new: true})

    fs.unlinkSync(file.path)

    return {
      url:uploadResponse.url,
      fileId:uploadResponse.fileId
    }

  } catch (error) {
    try {
      if(file.path && fs.existsSync(file.path)){
        fs.unlinkSync(file.path);
      }
    } catch (error) {
       console.error("Error deleting temp file:", error);
    }

    throw error;
  }
}

export {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
  uploadAvatar
};

