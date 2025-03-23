import express from "express"

import { userRegistration, userLogin } from "../collectors/userCollectors.js"
import { GetAllProducts,GetProductById } from "../collectors/productCollectors.js"

import { addToCart, getProductsToCart,updateProductQuantity,deleteProduct,cartCount } from "../collectors/cartCollectors.js"
import middleware from "../middleware.js"

const router = express.Router()

router.post("/registration",userRegistration)
router.post("/login",userLogin)
router.get("/get-all-products",middleware,GetAllProducts)
router.get("/products/:id",middleware,GetProductById)

router.post("/cart/:id",middleware,addToCart)
router.get("/cart",middleware,getProductsToCart)
router.put("/cart/:id",middleware,updateProductQuantity)
router.delete("/cart/:id",middleware,deleteProduct)
router.get("/cart/count",middleware,cartCount)
export default router