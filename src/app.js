import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes.js"
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js"
import playerRoutes from "./modules/ipl-ms/routes/player.route.js"
import sponsorRoutes from "./modules/ipl-ms/routes/sponsor.routes.js"
import broadcasterRoutes from "./modules/ipl-ms/routes/broadcaster.routes.js"
import teamBroadcasterRoutes from "./modules/ipl-ms/routes/team-broadcaster.routes.js"
import teamSponsorRoutes from "./modules/ipl-ms/routes/team-sponsor.routes.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/owners", ownerRoutes)
app.use("/api/team", teamRoutes)
app.use("/api/player", playerRoutes)
app.use("/api/sponsor", sponsorRoutes)
app.use("/api/broadcaster", broadcasterRoutes)
app.use("/api/team-broadcaster", teamBroadcasterRoutes)
app.use("/api/team-sponsor", teamSponsorRoutes)

// Catch-all for undefined routes
// app.use("*", (req, res, next) => {
//   next(ApiError.notFound(`Route ${req.originalUrl} not found`));
// });

export default app;