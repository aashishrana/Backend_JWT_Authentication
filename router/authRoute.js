const express = require("express");

const { signup , signin , getUser} = require("../controller/authController");
const jwtAuth = require("../middleware/jwtAuth");

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post("/signin" , signin)
authRouter.get("/getuser", jwtAuth , getUser)
// authRouter.post('/router', controller);

module.exports = authRouter; 
