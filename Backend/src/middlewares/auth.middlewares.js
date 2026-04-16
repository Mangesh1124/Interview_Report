const jwt = require("jsonwebtoken")
const blackListedTokenModel = require("../models/blacklist.model")

const authUser = async(req,res,next)=>{
     
    const token = req.cookies.token
    
    if(!token){
        
        res.status(401).json({
            message:"token not found "
        })
    }

    const isTokenBlackListed = await blackListedTokenModel.findOne({token});

    if(isTokenBlackListed){
        return res.status(401).json({
            message:"token is invalid",
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}


module.exports = {authUser}