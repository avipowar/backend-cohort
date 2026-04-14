import { Router } from "express";
import * as controller from "./auth.controller"
import validate from "../../common/middleware/validate.middleware"
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";
import ForgotPasswordDto from "./dto/forgotPassword.dto";
import NewPasswordDto from "./dto/newPassword.dto";
import RefreshTokenDto from "./dto/refreshToken.dto";
import { authenticate } from "./auth.middleware";

const router = Router()

router.post("/register", validate(RegisterDto),  controller.register)
router.post("/login", validate(LoginDto),  controller.login)
router.post("/logout", authenticate, controller.logout)
router.post("/refresh", validate(RefreshTokenDto), controller.refresh)
router.post("/forgotPassword", validate(ForgotPasswordDto), controller.forgotPassword)
router.post("/newPassword", validate(NewPasswordDto), controller.newPassword)


export default router