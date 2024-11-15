const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
const mongoose = require('mongoose')
const port = 4321

const MONGOURL = 'mongodb://localhost:27017/filter'

mongoose.connect(MONGOURL)
.then (()=>{
    console.log(`${MONGOURL} has been sucessfully engaged`)
}).catch(()=>{
    console.error("error when start an mongodb")
    
})

app.use(require('./Routes/UserRoute'))
app.use(require('./Routes/TitleRoute'))
app.use(require('./Routes/ItemRoute'))


app.listen(port, ()=>{
    console.log(`server is runing on the port ${port}`)
})










