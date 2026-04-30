import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes.js"
import multer from "multer";
import ApiResponse from "./common/utils/api.response.js";
import ApiError from "./common/utils/api.error.js";
import path from "path"
import fs from "node:fs/promises"
import { error } from "node:console";
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js"

const app = express();
app.use(express.json())
app.use(urlencoded({extended : true}));
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/owners", ownerRoutes)
app.use("/api/owners", teamRoutes)


// Catch-all for undefined routes
app.use("{*path}",(req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;