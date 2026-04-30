import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes.js"
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/owners", ownerRoutes)
app.use("/api/team", teamRoutes)


// Catch-all for undefined routes
// app.use("*", (req, res, next) => {
//   next(ApiError.notFound(`Route ${req.originalUrl} not found`));
// });

export default app;