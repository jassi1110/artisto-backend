const jwt = require('jsonwebtoken')
const logger = require('../setups/pino.setup')
require('dotenv').config()

// Creating Auth Middleware
exports.auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    
    try {
    if(!authHeader){
        res.status(401).json({
            success: false,
            err:"Header not found"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        if(token){
        jwt.verify(token,`${process.env.JWT_SECRET}`, function(err,user){
            if(err){
                logger.error("Request Errored")
                return res.status(401).json({
                    success:false,
                    err:`${err}` || "Verification Failed"
                })
            }
            else{
                req.user = user
                next()
            }
        })
    }
    else{
        logger.error("Request Errored")
        return res.status(401).json({
            status:false,
            messgae:"Unauthorized"
        })
    }
    }
    } catch (error) {
        logger.error("Request Errored")
        return res.status(401).json({
            success:false,
            err:`${error}`
        })
    }

}
