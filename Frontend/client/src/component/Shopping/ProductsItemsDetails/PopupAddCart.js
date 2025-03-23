import React from 'react'
import "./app.css"
import { useNavigate } from 'react-router-dom'

const PopupAddCart = ({PopupCart}) => {

    const navigate = useNavigate()
  return (
    <div className='popup-container'>
        <div className='popup-btn-container'>
            <button onClick={()=>navigate("/Shopinity/cart")} className='popup-btns'>Cart</button>
            <button onClick={()=>PopupCart()} className='popup-btns'>Done</button>
        </div>
    </div>
  )
}

export default PopupAddCart