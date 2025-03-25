import React, { useEffect, useState } from 'react'
import "./cart.css"
import { useSelector } from 'react-redux'

const TotalPrice = () => {
    const {cartProducts} = useSelector((state)=>state.cartCounter)
    const [totalPrice, setTotalPrice] = useState(0) 

    useEffect(()=>{
      const FetchTotalPrice = (cartProducts)=>{
        const productsPrice = cartProducts?.reduce((acc,curr)=>{
          return (acc+(curr.quantity*curr.productId.price))
        },0) || 0
        setTotalPrice(productsPrice)
      }
      FetchTotalPrice(cartProducts)        
    },[cartProducts])
  return (
    <div className='price-Container'>
        <p>Cart Price: {totalPrice}</p>
        <button disabled = {cartProducts?.length > 0 ? false:true} className='buy-btn'>
            Order place
        </button>
    </div>
  )
}

export default TotalPrice