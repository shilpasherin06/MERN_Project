const express = require('express')
const router = express.Router()
const tCont = require('../Controllers/TitleController')

router.post("/title/insert", tCont.insert,(err,data)=>{
    err?console.log(err):console.log(data);

})

router.get("/title/find", tCont.find,(err,data)=>{
    err?console.log(err):console.log(data);

})

router.get("/title/findByTitle", tCont.findByTitle,(err,data)=>{
    err?console.log(err):console.log(data);

})

router.delete("/title/deleteOne/:title", tCont.deleteOne,(err,data)=>{
    err?console.log(err):console.log(data);

})



module.exports = router


