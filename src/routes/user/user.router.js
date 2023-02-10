require("dotenv").config();

const { Router } = require("express");
const { registerUser, loginUser, AllUsers } = require("../../controllers/user.controller");
const app = Router();

app.get("/", AllUsers);
app.post("/register" , registerUser)
app.post("/login", loginUser)

module.exports = app;