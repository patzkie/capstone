import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import infoRouter from "./routes/infoRoutes.js"


// app config 
const app = express()
const port = 4000 

// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // <-- parse form data

//db connection 
connectDB();

// API endpoints

app.use("/api/user",userRouter)
app.use("/api/info",infoRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server Started on http://localhost:${port}`)
})

