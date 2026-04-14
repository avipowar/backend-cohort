import * as authService from "./auth.service";
import ApiResponse from "../../common/utils/api.response";

const register = async (req, res) => {
  // something
  const user = await authService.register(req.body);

  ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
  const { user, refreshToken, accessToken } = await authService.login(req.body);

  res.cookies("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "Login successfully", {user, accessToken});
};

const logout = async (req, res) => {
  await authService.logout(req.user.id)
  res.clearCookie("refreshToken")
  ApiResponse.ok(res, "Logout successfully");
}

export { register, login };
