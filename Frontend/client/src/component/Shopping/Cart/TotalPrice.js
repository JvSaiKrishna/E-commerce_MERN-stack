import React, { useEffect, useState } from 'react'
import "./cart.css"
import { useSelector } from 'react-redux'

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


  

  const handlePayment = async () => {
    setLoading(true);

    const response = await fetch("http://localhost:4000/Shopinity/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyResponse.json();
        console.log(verifyData)
        if (verifyData.message === "Payment verified successfully") {
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
    {loading?"":<div className='price-Container'>
      <p>Cart Price: {totalPrice}</p>
      <button onClick={handlePayment} disabled={cartProducts?.length > 0 ? false : true} className='buy-btn'>
        Order place
      </button>
    </div>}
    
    </>
  )
}

export default TotalPrice