import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api.response.js";

const register = async (req, res) => {
  // something
  const user = await authService.register(req.body);

  ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
  const { user, refreshToken, accessToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "Login successfully", { user, accessToken });
};

const verifyEmail = async(req, res) => {
  const {token} = req.query;
  
  const user = await authService.verifyEmail(req.params.token)

  ApiResponse.ok(res, "Email verified successfully", user)
}

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "Logout successfully");
};

const refreshToken = async (req, res) => {
  // const token = req.body.refreshToken
  const token = req.cookies.refreshToken
  // const token = req.headers.authorization;

  const { refreshToken, accessToken } = await authService.refresh(token);

  ApiResponse.created(res, "New token generated", {
    accessToken,
  });
};

const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email)

  ApiResponse.ok(res, "send the verification code ")
}

const resetPassword  = async (req, res) => {
   await authService.resetPassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "Password update successfully")
}

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "User profile", user);
};

export {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
};
