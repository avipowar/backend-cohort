import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes"

const app = express();
app.use(express.json())
app.use(urlencoded({extended : true}));
app.use(cookieParser())

app.use("/api/auth", authRoute)

export default app;