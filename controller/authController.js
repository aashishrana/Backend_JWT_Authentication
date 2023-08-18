const userModel = require("../model/userSchema");

const emailValidator = require("email-validator");

const signup = async(req, res, next) => {

    const { name, email, password, confirmPassword} = req.body;
    console.log(name, email , password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }


    const validEmail = emailValidator.validate(email);

    if(!validEmail) {
        return res.status(400).json({
            success : false,
            message : "Please provide a valid email id"
        })
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            success : false,
            message : "password and confirmPassword does not match"
        })
    }

    try {

        const userInfo =  userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success : true,
            data : {}
        })

        
    } catch (e) {
       if (e.code === 11000) {
        return res.status(400).json({
            success : false,
            message : "Account already exist with provided email id"
        })
       } 
        
        return res.status(400).json({
            success : false,
            message : e.message
        })
        
    }

    

}


const signin = async(req, res) => {
    const { email , password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success : false,
            message : "Every field is mandatory"
        })
    }

    try {
        const user = await userModel
        .findOne({
            email
        })
        .select("+password");

    if (!user || user.password === password) {

        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    } 
    
    
    const token = user.jwtToken();
    user.password = undefined;

    const cookiOption = {
        message: 24 * 60 * 60 * 1000,
        httpOnly: true
    };

    res.cookie("token", token, cookiOption);
    res.status(200).json({
        success: true,
        data: user
    })

    } catch(e) {
         res.status(400).json({
            success : false,
            message: e.message
         })

    }


    
    
}

module.exports = {
    signup,
    signin
}



