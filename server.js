import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/common/config.js/db.js";

const PORT = process.env.PORT || 5000;

const start = async () => {

    // connect to db
    await connectDB()
    
    app.listen(PORT, () => {
        console.log(`server running on ${PORT} in ${process.env.NODE_ENV}`)
    })
}

start().catch((err)=>{
    console.error("server running to failed")
    process.exit(1)
})