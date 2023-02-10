require("dotenv").config();

const express = require("express")
const connectDatabase = require("./database/db")  // to connect MongoDB

const userRouter = require("./routes/user/user.router");  // All Routers 

const PORT = process.env.PORT || 3005

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/user", userRouter)

app.use("/", (req,res)=>{
    res.status(200).send("Server Started")
})

app.listen(PORT , async ()=>{
    await connectDatabase() // connnection Database
    console.log(`Server Started on Port ${PORT}`)
})





//npm i argon2 bcrypt cors dotenv express jsonwebtoken mongoose nodemon body-parser