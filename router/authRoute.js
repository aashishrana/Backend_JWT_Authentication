const express = require("express");

const { signup , signin , getUser , logout} = require("../controller/authController");
const jwtAuth = require("../middleware/jwtAuth");

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post("/signin" , signin)
// authRouter.get("/getuser", jwtAuth , getUser)
// authRouter.post('/router', controller);

authRouter.get("/logout", jwtAuth , logout)

module.exports = authRouter; 
