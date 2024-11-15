const express = require('express')
const router = express.Router()
const itemC = require('../Controllers/ItemController')

router.post("/items/insert",itemC.insert,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.post("/items/inserttags",itemC.insertWithTags,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/items/find",itemC.find,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.get("/items/findtitle/:title",itemC.findBytitle,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.put("/items/update/:_id",itemC.updateItem,(err,data)=>{
    err?console.log(err):console.log(data);
})
router.delete("/items/delete/:_id",itemC.deleteOne,(err,data)=>{
    err?console.log(err):console.log(data);
})

module.exports = router