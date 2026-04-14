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

  ApiResponse.ok(res, "Login successfully", { user, accessToken });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "Logout successfully");
};

const refresh = async (req, res) => {
  // const token = req.body.refreshToken
  // const token = req.cookies.refreshToken
  const token = req.headers.authorization;

  const { refreshToken, accessToken } = await authService.refresh(token);

  res.cookies("refreshToken ", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  ApiResponse.created(res, "New token generated", {
    accessToken,
  });
};

const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email)

  ApiResponse.ok(res, "send the verification code ")
}

const newPassword  = async (req, res) => {
  const {token, password} = req.body;
  await authService.newPassword(token , password)

  ApiResponse.ok(res, "Password update successfully")
}

export { register, login, refresh, forgotPassword , newPassword};
