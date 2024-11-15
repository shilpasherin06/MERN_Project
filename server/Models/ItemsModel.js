const mongoose =require('mongoose')

const itemsSchema = new mongoose.Schema({
    name:{type:String,required:true},

    type:{type:String,required:true},

    symbol:{type:String,required:true},

    price:{type:Number,required:true},

    des:{type:String,required:true},

    pic:{type:String},
    
    title:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'title'
    }]
})

const ItemsModel = mongoose.model('items', itemsSchema)
module.exports = ItemsModel