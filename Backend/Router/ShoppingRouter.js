import express from "express"

import { userRegistration, userLogin } from "../collectors/userCollectors.js"
import { GetAllProducts,GetProductById } from "../collectors/productCollectors.js"

const router = express.Router()

router.post("/registration",userRegistration)
router.post("/login",userLogin)
router.get("/get-all-products",GetAllProducts)
router.get("/products/:id",GetProductById)

export default router