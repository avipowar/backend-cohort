import ApiError from "../../common/utils/api.error.js";
import { verifyAccessToken } from "../../common/utils/jwt-utils.js";
import User from "./auth.model.js";

const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw ApiError.unauthorized("Not Authenticated");

  const decode = verifyAccessToken(token);

  const user = await User.findById(decode.id);

  req.user = {
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
  };
  next();
};

const authorize = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw ApiError.forbidden(
        "You do not have permission to perform this action",
      );
    }
    next()
  };
};

export {authenticate, authorize}
