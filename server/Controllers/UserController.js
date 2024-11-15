const UserModel = require ('../Models/UserModel')
const AuthModel = require('../Models/AuthModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.insert=[async(req,res)=>{
    const user = new UserModel({
        username:req.body.username,
        email:req.body.email,
        role:req.body.role || 'client',
        password: await bcrypt.hash(req.body.password,12)
    })
    user.save()
    .then(async(saveData)=>{
        const userToken = await jwt.sign({userid:saveData._id,email:saveData.email},"key for hast",{expiresIn:'1hr'})
        const authtoken = new AuthModel({
            userid : saveData._id,
            tokenid : userToken

        })
        authtoken.save()
        .then((token)=>{
            res.status(201).send(token)
        }).catch((err)=>{
            res.status(409).send(err.message)
        })
    }).catch((err)=>{
        res.send(err.message)
    })
}]

//initiate reverse

exports.insertReverse = [async(req,res)=>{
    try{
        const userData = await UserModel.findOne({email:req.body.email})
        if(userData){
                res.status(400).send("user already exists").json({message:"User Aready Exists"})
        }
        else{
            const user = new UserModel({
                username : req.body.username,    
                email : req.body.email,
                role : req.body.role || 'client',
                password : await bcrypt.hash(req.body.password, 12)
            })
            const saveData = await user.save()
    
            const userToken = jwt.sign({userid:saveData._id,email:saveData.email},"Key for hash",{expiresIn:"1hr"})
            const authtoken = new AuthModel({
                userid : saveData._id,
                tokenid : userToken 
            })
            await authtoken.save()
            res.status(201).send({
                user:{
                    id:saveData._id,
                    username:saveData.username,
                    email:saveData.email,
                    password:saveData.password
                }, token:userToken
            })
        }  
    }
   catch(error){
    res.send(error.message)
   }
}]

//end experment
exports.login = [async(req,res)=>{
        await  UserModel.findOne({email:req.body.email})
        .then(async(data)=>{
           const cPassword = await bcrypt.compare(req.body.password,data.password)
            
            if(cPassword){
                res.send("error found while verify")
            }
            else{
               await AuthModel.findOne({userid:data._id})
                .then((tData)=>{
                    // const token = tData.map(e =>e.tokenid)
                    res.status(200).send({ 
                        token:{
                            tokenid:tData.tokenid
                        },
                        user:{
                            username:data.username
                        }
                    })
                }).catch((err)=>{
                    res.send(err.message)
                })
                
            }
        }).catch((err)=>{
            res.send(err.message,"verify email you entered")
        })
}]
exports.login2 =[async(req,res)=>{
    try{
        const userdata = await UserModel.findOne({email:req.body.email})
    if(!userdata){
        res.status(404).send("user not found")
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, userdata.password)
    if(!isPasswordMatch){
        res.status(401).send("password does not match")
    }
    const authData = await AuthModel.findOne({userid:userdata._id})
    if(!authData){
        res.status(404).send("Authentication denied")
    }
    res.status(200).send({userdata,authData:{token:authData.tokenid}})
}
catch(error){
    res.status(500).send(error.messsage)
}

}]

exports.findAll =[(req,res)=>{
    UserModel.find()
    .then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}]
exports.findByEmail = [(req,res)=>{
    UserModel.findOne({email:req.params.email})
    .then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}]
exports.findByUser = [(req,res)=>{
    UserModel.findOne({username:req.params.username})
    .then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send((err.message))
    })
}]
exports.updateUser = [async(req,res)=>{
    const updateUser = {
        username : req.body.username,
        email : req.body.email
    }
    await UserModel.updateOne({_id:req.params._id},{$set:updateUser})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}]
exports.deleteUser = [(req,res)=>{
    UserModel.deleteOne({_id:req.params._id})
    .then((ack)=>{
        //res.status(204).send(ack,"deleted sucessfully")
        res.status(200).send(ack)
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}]

exports.deleteUsertoken = [async(req,res)=>{
   await AuthModel.deleteMany({userid:req.params._id})
    
    .then(async()=>{
        await UserModel.deleteMany({_id:req.params._id})
        .then((ack)=>{
            res.status(200).send(ack)
        }).catch((err)=>{
            res.status(404).send(err.message)
        })
      
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}]