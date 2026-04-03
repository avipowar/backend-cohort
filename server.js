import "dotenv/config"
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

const start = async () => {

    app.listen(PORT, () => {
        console.log(`server running on ${PORT} in ${process.env.NODE_ENV}`)
    })
}

start()