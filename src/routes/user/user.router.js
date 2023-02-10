require("dotenv").config();

const { Router } = require("express");
const { registerUser, loginUser, AllUsers, TaskPost } = require("../../controllers/user.controller");
const app = Router();

app.get("/", AllUsers);

// Login Route
app.post("/register" , registerUser)

// Signup Route
app.post("/login", loginUser)

// Task Route
app.post("/task", TaskPost)

module.exports = app;