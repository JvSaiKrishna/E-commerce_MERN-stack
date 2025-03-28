import { cart } from "../models/Cart.js"

const addToCart = async (req, res) => {
    const userId = req.userId
    const productId = req.params.id
    const { quantity } = req.body
    try {
        const isProductMatch = await cart.findOne({ userId, productId })
        if (isProductMatch) {
            await cart.updateOne({ _id: isProductMatch._id }, { quantity: isProductMatch.quantity + quantity })
            return res.status(204).json("Product added to cart")
        }
        const newProductAddToCart = new cart({
            userId,
            productId,
            quantity
        })
        await newProductAddToCart.save()
        res.status(201).json("Product added to cart")


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal serval problem"})

    }

}

const getProductsToCart = async (req, res) => {
    const {userId} = req
    try {
        const getProductsFromCart = await cart.find({ userId }).populate(["productId","userId"]).select("-password")
        res.status(200).json({ cartProducts: getProductsFromCart })
    } catch (error) {
        res.status(500).json({message:"Internal serval problem"})
    }
}

const updateProductQuantity = async (req, res) => {
    const { quantity } = req.query
    const { id } = req.params
    try {
        const productQuantity = await cart.findOne({ _id: id })
        await cart.updateOne({ _id: id }, { quantity: productQuantity.quantity + parseInt(quantity) })
        res.status(204).json("Updated")

    } catch (error) {
        res.status(500).json({message:"Internal serval problem"})

    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const { userId } = req
    try {
        await cart.deleteOne({ _id: id })
        const newList = await cart.find({ userId }).populate("productId")
        res.status(200).json({ cartProducts: newList })
    }
    catch (error) {
        res.status(500).json({message:"Internal serval problem"})
    }


}
const cartCount = async(req,res) =>{
    try {
        const {userId} = req
        const productList = await cart.find({userId})
        const count = productList?.length || 0
        res.status(200).json({count})
    } catch (error) {
        res.status(500).json({message:"Internal serval problem"})
    }
}

const deleteAllProducts = async(req,res)=>{
    const {userId} = req
    try {
        await cart.deleteMany({userId})
        const newList = await cart.find({ userId }).populate("productId")
        res.status(200).json({ cartProducts: newList })
        
    } catch (error) {
        res.status(500).json({message:"Internal serval problem"})
        
    }
}

export { addToCart, getProductsToCart, updateProductQuantity, deleteProduct , cartCount, deleteAllProducts }