require("dotenv").config();

const { Router } = require("express");
const { registerUser, loginUser, AllUsers, TaskPost } = require("../../controllers/user.controller");
const { privateRoute } = require("../../middleware/authMiddleware");
const app = Router();


app.get("/", privateRoute,AllUsers);

// Login Route
app.post("/register" ,privateRoute, registerUser)

// Signup Route
app.post("/login",privateRoute, loginUser)

// Task Route
app.post("/task",privateRoute, TaskPost)

module.exports = app;