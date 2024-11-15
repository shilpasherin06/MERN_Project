const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')

router.post("/user/in",UserController.insert,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.post("/user/inr",UserController.insertReverse,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.post("/user/login",UserController.login,(err,data)=>{
    err?console.log(err.message):console.log(data);
})
router.post("/user/login2",UserController.login2,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.get("/user/all",UserController.findAll,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.get("/user/findByUser/:username",UserController.findByUser,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.get("/user/findByEmail/:email",UserController.findByEmail,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.put("/user/update/:_id",UserController.updateUser,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.delete("/user/delete/:_id",UserController.deleteUser,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

router.delete("/user/deletetoken/:_id",UserController.deleteUsertoken,(err,data)=>{
    err?console.log(err.message):console.log(data);
})

module.exports = router