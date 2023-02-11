require("dotenv").config();

const { Router } = require("express");
const { registerUser, loginUser, GetUsers, TaskPost } = require("../../controllers/user.controller");
const { privateRoute } = require("../../middleware/authMiddleware");
const app = Router();



app.get("/",  GetUsers);

// Login Route
app.post("/register" , registerUser)

// Signup Route
app.post("/login", loginUser)

// Task Route
// protected with Private Routes
app.post("/task", privateRoute, TaskPost)

app.get("/task", privateRoute, GetUsers)
app.get("/task/:id", privateRoute, GetUsers)

module.exports = app;