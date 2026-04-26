import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRoute from "./modules/auth/auth.routes.js"
import multer from "multer";
import ApiResponse from "./common/utils/api.response.js";
import ApiError from "./common/utils/api.error.js";
import path from "path"
import fs from "node:fs/promises"
import { error } from "node:console";

const app = express();
app.use(express.json())
app.use(urlencoded({extended : true}));
app.use(cookieParser())





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

//  this thing is default
// const storage = multer.memoryStorage()


const upload = multer({
  storage,
  limits : {
    fileSize:1024*1024*2
  },
  fileFilter : (req, file, cb) => {
    const allowed = ["image/png",  "image/jpeg" , "application/pdf"]

    if(allowed.includes(file.mimetype)){
      cb(null, true)
    }else {
      cb(ApiError.badRequest("Only PNG, JPEG, and PDF files are allowed"), false)
    }
  }

})


app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("this is my req body : ", req.file);

  // const data = req.file.buffer
  // const fileName = Date.now() + "-" + req.file.originalname;

  // await fs.writeFile(`public/uploads/${fileName}`, data)

  ApiResponse.ok(res, "File uploaded")
})





app.use("/api/auth", authRoute)

// Catch-all for undefined routes
app.use((req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;