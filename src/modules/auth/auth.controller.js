import * as authService from "./auth.service"
import ApiResponse from "../../common/utils/api.response"

const register = async (req, res) => {
    // something
    const user = await authService.register(req.body)

    ApiResponse.created(res, "Registration success", user)
}

export {register}