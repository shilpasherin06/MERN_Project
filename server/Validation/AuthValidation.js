const jwt =require('jsonwebtoken')
const AuthModel = require('../Models/AuthModel')

exports.auth = [(req,res,next)=>{
    const token = req.headers('authorization')?.split(' ')[1]
    if(!token){
        res.status(401).json({msg:'user not found'})
    }
    else{
        try{
            const decoded = jwt.verify(token,"Key for hash")
            AuthModel.findOne({tokenid:token,userid:decoded.userid})
            .then((foundData)=>
            {
                if(!foundData)
                {
                    res.status(401).json({msg:"token is invalid"})
                }
                else
                {
                    next()
                }
            })
            .catch((err)=>{
                res.status(401).send("error to find Token",err.message)
            })
        }
        catch{
            res.status(401).json({msg:"token is not valid"})
        }
    }
}]