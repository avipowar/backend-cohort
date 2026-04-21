import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes.js"

const app = express();
app.use(express.json())
app.use(urlencoded({extended : true}));
app.use(cookieParser())

app.use("/api/auth", authRoute)

// Catch-all for undefined routes
app.use((req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;