const mongoose = require('mongoose')

const titleSchema = new mongoose.Schema({
    title: {type:String, required:true},
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"items"
    }]
})


const TitleModel = mongoose.model('title', titleSchema)

module.exports = TitleModel