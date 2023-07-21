const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema ({
    name : {
        type: String,
        required : [true, 'user name is required'],
        minLength : [5, 'Name must be at least 5 character'],
        maxLength : [50, 'Name must be less than 50 character'],
        trim : true
    },

    email : {
        type : String,
        required : [true, 'email is required'],
        unique : [true, 'already registerd'],
        lowercase : [true],
    },

    password : {
        type : String,
        select : false
    },

    forgotPasswordToken : {
        type : String
    },

    forgotPasswordExpiryDate : {
        type : Date
    }

}, {
    timestamps : true
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;