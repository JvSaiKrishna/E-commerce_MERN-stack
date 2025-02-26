import jwt from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config()

const Secret = process.env.Secret_code
const middleware = async (req, res, next) => {
    const auth = req.headers["authorization"]
    if(!auth || !auth.startsWith("Bearer")){
        return res.status(400).json("Token Required")
    }
    const token = auth.split(' ')[1]

    jwt.verify(token, Secret, (err, payload) => {
        if (err) {
            return res.status(400).json("Token Invalid")
        }
        else {
            req.username = payload.username
            next()
        }


    })
}


export default middleware