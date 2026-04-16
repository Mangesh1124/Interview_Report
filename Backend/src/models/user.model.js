const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    unique: [true, "username already taken"],
    type: String,
    required:true,
  },
   email:{
    unique: [true, "username already taken"],
    type: String,
    required:true,
   },
   password:{
    type: String,
    required:true,
   },

});

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
