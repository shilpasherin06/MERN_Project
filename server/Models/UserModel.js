const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {type:String,require:true},

    email : {type:String,require:true},

    role : {type:String,enum:["admin","client"],default:'client'},

    password : {type:String,require:true},

},{timestamps:true})

const UserModel = mongoose.model("users",userSchema)

module.exports = UserModel