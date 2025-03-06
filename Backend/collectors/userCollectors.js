// import mongoose from "mongoose";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotEnv from "dotenv"

dotEnv.config()

const Secret = process.env.Secret_code

const userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const getByuser = await user.findOne({ username })
        const getByemail = await user.findOne({ email })
        // console.log(email)
        if (!getByuser && !getByemail) {
            const hashPwd = await bcrypt.hash(password, 10)
            const newUser = new user({
                username,
                email,
                password: hashPwd
            })
            await newUser.save()
            res.status(200).json("sucessfully Registor")
        }
        else {
            if (getByuser?.email === email || getByemail?.email === email) {

                return res.status(400).json("Email Already Exist");
            }
            else {
                if (getByuser?.username === username || getByemail?.username === username)
                    return res.status(400).json("User Exist");

            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Problem")

    }

}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const getData = await user.findOne({ username })
        // console.log(getData)
        if (getData) {
            const isHashPwd = await bcrypt.compare(password, getData.password)

            if (isHashPwd) {
                const payload = {
                    username
                }
                const getJwt = jwt.sign(payload, Secret)
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
        return res.status(500).json("Internal Server Problem")
        // console.log(error)

    }
}

export { userRegistration, userLogin }