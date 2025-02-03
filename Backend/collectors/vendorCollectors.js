import { vendor } from "../models/Vendor.js"
import {product} from "../models/product.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config()


const Secret = process.env.Secret_code

const hashFun = async (pwd) => {
    const hashPwd = await bcrypt.hash(pwd, 10)
    return hashPwd
}

const registration = async (req, res) => {
    try {

        const { username, email, password } = req.body
        const getByuser = await vendor.findOne({ username })
        const getByemail = await vendor.findOne({ email })
        // console.log(!getData)
        if (!getByuser && !getByemail) {
            const hashPwd = await hashFun(password)
            const newData = new vendor({
                username,
                email,
                password: hashPwd
            })
            await newData.save()
            return res.json("Registration success")
        }
        else {
            if (getByuser.email === email || getByemail.email === email) {

                return res.status(400).json("Email Already Exist");
            }
            else {
                if (getByuser.username === username || getByemail.username === username)
                    return res.status(400).json("User Exist");

            }
        }
    } catch (error) {
        res.status(500).json("Internal Server Problem")

    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const getData = await vendor.findOne({ username })
        if (getData) {
            const isHashPwd = await bcrypt.compare(password, getData.password)

            if (isHashPwd) {
                const payload = {
                    username
                }
                const getJwt =  jwt.sign(payload,Secret)
                return res.status(200).json({ getJwt });
            }
            else {
                return res.status(400).json("Password Not Matched")

            }

        }
        else {
            return res.status(400).json("Credentials Not Matched")

        }
    } catch (error) {
        console.log(error)

    }
}

const profile = async (req,res)=>{
    const username = req.username
    const getProfile = await vendor.findOne({username})
    const totalProducts = await product.find({vendor:getProfile._id})
    // console.log({getProfile,totalProducts})
    res.status(200).json(getProfile)
}




export { registration, login,profile }