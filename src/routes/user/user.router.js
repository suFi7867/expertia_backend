require("dotenv").config();

const { Router } = require("express");
const { registerUser, loginUser, GetUsers, TaskPost } = require("../../controllers/user.controller");
const { privateRoute } = require("../../middleware/authMiddleware");
const app = Router();


// protected with Private Routes
app.get("/", privateRoute, GetUsers);

// Login Route
app.post("/register" , registerUser)

// Signup Route
app.post("/login", loginUser)

// Task Route
app.post("/task", privateRoute, TaskPost)

module.exports = app;