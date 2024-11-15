const mongoose = require('mongoose')

const authTokenSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    tokenid:{type:String,required:true}
})

const authTokenModel = mongoose.model('token',authTokenSchema)

module.exports = authTokenModel