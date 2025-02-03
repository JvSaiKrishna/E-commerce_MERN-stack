import jwt from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config()

const Secret = process.env.Secret_code
const middleware = async (req,res,next)=>{
    const token  = req.headers["authorization"].split(' ')[1]
jwt.verify(token,Secret,(err,payload)=>{
    if(err){
        return res.status(400).json("Token Invalid")
    }
    else{
        req.username = payload.username
        next()
    }


})
}


export default middleware