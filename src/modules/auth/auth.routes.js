import { Router } from "express";
import * as controller from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js"
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import ForgotPasswordDto from "./dto/forgotPassword.dto.js";
import NewPasswordDto from "./dto/newPassword.dto.js";
import RefreshTokenDto from "./dto/refreshToken.dto.js";
import { authenticate } from "./auth.middleware.js";

const router = Router()

router.post("/register", validate(RegisterDto),  controller.register)
router.post("/login", validate(LoginDto),  controller.login)
router.post("/logout", authenticate, controller.logout)
router.post("/refresh", validate(RefreshTokenDto), controller.refresh)
router.post("/forgotPassword", validate(ForgotPasswordDto), controller.forgotPassword)
router.post("/newPassword", validate(NewPasswordDto), controller.newPassword)


export default router