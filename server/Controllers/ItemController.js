const ItemsModel = require('../Models/ItemsModel')
const TitleModel = require('../Models/TitleModel')
const multer = require('multer')
const path = require('path')


exports.insert = [(req,res)=>{
    // uploader.array("image",S)
    const item = new ItemsModel({
        name:req.body.name,
        type:req.body.type,
        symbol:"₹",
        price:req.body.price,
        des:req.body.des,
        pic:[req.file ? req.file.filename:null]
    })
    item.save()
    .then((savedItems)=>{
        res.send(savedItems)
    }).catch((err)=>{
        res.send(err.message)
    })
}]


exports.insertWithTags = [async(req,res)=>{
    const titleIds = await TitleModel.find({title:req.body.title})
    const idTitle = titleIds.map((d)=>d._id)

    const item = new ItemsModel({
        name:req.body.name,
        type:req.body.type,
        symbol:"₹",
        price:req.body.price,
        des:req.body.des,
        title: idTitle
    })  
    item.save()
    .then(async(saveData)=>{
        for(let i=0;i<saveData.title.length;i++){
            await TitleModel.updateOne({_id:saveData.title[i]},{$push:{items:saveData._id}}).then((dt)=>console.log(dt))
        }
        res.send(saveData)
    }).catch((err)=>{
        res.send(err.message)
    })
}]


exports.find = [(req,res)=>{
    ItemsModel.find().populate("title")
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}]


exports.findByName = [(req,res)=>{
    ItemsModel.findOne({
        name:req.params.name}).populate('title')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}]

exports.findBytitle = [async(req,res)=>{
    await TitleModel.find({title:req.params.title})
    .then(async(data)=>{
        const titleId = data.map(e=>e._id)
    await ItemsModel.find({title:titleId}).then((id)=>{
         res.send(id)
    }).catch((err)=>{
        res.send(err.message)
    })    
    }).catch((err)=>{
        res.send(err.message)
    })
}]

exports.deleteOne = [(req,res)=>{
    ItemsModel.deleteOne({
        _id:req.params._id,
    })
    .then((ack)=>{
        res.send(ack)
    }).catch((err)=>{
        res.send((err.message))
    })
}]

exports.updateItem = [async(req,res)=>{
    const updateItem = {
        name:req.body.name,
        type:req.body.type,
        symbol:"₹",
        price:req.body.price,
        des:req.body.des
    }
    await ItemsModel.updateOne({_id:req.params._id},{$set:updateItem})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}]



