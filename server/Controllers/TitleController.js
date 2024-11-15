const TitleModel = require('../Models/TitleModel')

exports.insert = [(req,res)=>{
    const title = new TitleModel({
        title : req.body.title
    })
    title.save()
    .then((savedTitle)=>{
        res.send(savedTitle)
    }).catch((err)=>{
        res.send(err.message)
    })
}]

exports.find = [(req,res)=>{
    TitleModel.find().populate('items').then((title)=>{
        res.send(title)
    }).catch((err)=>{
        res.send(err.message)
    })
}]

exports.findByTitle = [(req,res)=>{
    TitleModel.findOne({
        title:req.params.title,
    }).populate('items')
    .then((title)=>{
        res.send(title)
    }).catch((err)=>{
        res.send(err.message)
    })
}]

exports.deleteOne = [(req,res)=>{
    TitleModel.deleteOne({
        title:req.params.title,
    })
    .then((ack)=>{
        res.send(ack)
    }).catch((err)=>{
        res.send((err.message))
    })
}]

