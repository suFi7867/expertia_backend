require("dotenv").config();

const express = require("express")
const app = express()

const PORT = process.env.PORT || 3005

app.use("/", (req,res)=>{
    res.status(200).send("Server Started")
})

app.listen(PORT , ()=>{
    console.log(`Server Started on Port ${PORT}`)
})





//npm i argon2 bcrypt cors dotenv express jsonwebtoken mongoose nodemon body-parser