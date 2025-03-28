import React, { useEffect, useState } from 'react'
import "./cart.css"
import { useSelector , useDispatch} from 'react-redux'
import Cookies from "js-cookie"
import { RemoveAllProductsFromCart } from '../CartSlice/CartSlice'

const TotalPrice = () => {
  const { cartProducts } = useSelector((state) => state.cartCounter)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const FetchTotalPrice = (cartProducts) => {
      const productsPrice = cartProducts?.reduce((acc, curr) => {
        return (acc + (curr.quantity * curr.productId.price))
      }, 0) || 0
      setTotalPrice(productsPrice)
    }
    FetchTotalPrice(cartProducts)
  }, [cartProducts])

  const dispatch = useDispatch()

  const jwt = Cookies.get("jwToken")

  const handlePayment = async (jwt,dispatch) => {
    setLoading(true);

    const response = await fetch("http://localhost:4000/Shopinity/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({ amount: totalPrice, currency: "INR" }),
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_V6wiZdFTFsHYpM",
      amount: order.amount,
      currency: order.currency,
      name: "Shopinity",
      description: "Payment for Order",
      order_id: order.id,
      handler: async function (response) {
        const verifyResponse = await fetch("http://localhost:4000/Shopinity/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.message === "Payment verified successfully") {
          dispatch(RemoveAllProductsFromCart())
          alert("Payment Successful!");
        } else {
          alert("Payment Failed. Try Again.");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false)
  };


  return (
    <>
      {loading ? "" : <div className='price-Container'>
        <p>Cart Price: {totalPrice}</p>
        <button onClick={() => handlePayment(jwt,dispatch)} disabled={cartProducts?.length > 0 ? false : true} className='buy-btn'>
          Order place
        </button>
      </div>}

    </>
  )
}

export default TotalPrice