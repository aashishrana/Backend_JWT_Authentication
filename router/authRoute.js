const express = require("express");

const { signup , signin , getUser} = require("../controller/authController");

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post("/signin" , signin)
authRouter.get("/getuser", getUser)
// authRouter.post('/router', controller);

module.exports = authRouter; 
