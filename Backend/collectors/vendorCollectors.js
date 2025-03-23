import { vendor } from "../models/Vendor.js"
import {product} from "../models/product.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotEnv from "dotenv"
import {v2 as cloudinary} from "cloudinary"

dotEnv.config()


cloudinary.config({
    api_key:process.env.API_KEY,
    cloud_name:process.env.ClOUD_NAME,
    api_secret:process.env.API_SECRET
})


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
        // console.log(req.body)
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
            if(getByuser){

                if (getByuser.email === email) {
                    
                    return res.status(400).json("Email Already Exist");
                }
                else {
                    if (getByuser.username === username)
                        return res.status(400).json("User Exist");
                    
                }
            }
            if(getByemail){
                if (getByemail.email === email) {
                    
                    return res.status(400).json("Email Already Exist");
                }
                else {
                    if (getByemail.username === username)
                        return res.status(400).json("User Exist");
                    
                }

            }
        }
    } catch (error) {
        res.status(500).json("Internal Server Problem")

    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(req.body)
        const getData = await vendor.findOne({ username })
        if (getData) {
            const isHashPwd = await bcrypt.compare(password, getData.password)

            if (isHashPwd) {
                const payload = {
                    username,
                    id:getData._id
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
        res.status(500).json("Internal Server Problem")

    }
}

const profile = async (req,res)=>{
    const username = req.username
    const getProfile = await vendor.findOne({username}).select("-password")
    const totalProducts = await product.find({vendor:getProfile._id}).select("-password")
    // console.log({getProfile,totalProducts})
    res.status(200).json(getProfile)
}
const profileUpdate = async(req,res)=>{
    try {
        const {pic} = req.body

    const cloudinaryUpload = await cloudinary.uploader.upload(pic,
        {folder:"/E-commerce"}
    )
    await vendor.updateOne({username:req.username},{img:cloudinaryUpload.url})
    const getData = await vendor.findOne({username:req.username}).select("-password")
    res.status(200).json(getData)
    } catch (error) {
        res.status(500).json("Internal Server Problem")
        
    }

}



export { registration, login,profile ,profileUpdate}