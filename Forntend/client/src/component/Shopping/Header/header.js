import React, { useContext } from 'react'
import Cookies from "js-cookie"
import "./header.css"
import { Link, useNavigate } from 'react-router-dom'
import { counter } from '../Context/Context.js'


// const data = localStorage.getItem("AddToCart")
// const count = JSON.parse(data).length

export default function Header() {
    const { cartCount} = useContext(counter);
    // console.log(cartCount)
    
    const navigate = useNavigate()
    const OnLogout = () => {
        const jwToken = Cookies.remove("jwToken")
        if (jwToken === undefined) {

            navigate('/shopinity/login', { replace: true })
        }
        
        
    }
    const onClickCart = ()=>{
        navigate('/shopinity/cart')

    }
    return (

        <nav className="nav-header">
            <div className="nav-content">
                <div className="nav-bar-mobile-logo-container">
                    {/* <img className="website-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" /> */}
                    <p className="website-navbar-name">Shopinity</p>
                    <button onClick={OnLogout} type="button" className="nav-mobile-btn">
                        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png" alt="nav logout" class="nav-bar-img" />
                    </button>
                </div>
                <div className="nav-content nav-bar-large-container">
                    {/* <img className="website-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" /> */}
                    <p className="website-navbar-name">Shopinity</p>
                    <ul className="nav-menu">
                        <Link to="/Shopinity/home" className="nav-menu-item">
                            <li >Home</li>
                        </Link>
                        <Link to="/Shopinity/products" className="nav-menu-item">
                            <li >Products</li>
                        </Link>
                        <a className="nav-menu-item" href='/shopinity/cart'> <li  onClick={onClickCart}>Cart:{cartCount||0}</li>
                        </a>
                           
                    </ul>
                    <button onClick={OnLogout} type="button" className="logout-desktop-btn">Logout</button>
                </div>
            </div>
            <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                    <Link to="/Shopinity/home" className="nav-menu-item-mobile">
                        <li >
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png" alt="nav home" class="nav-bar-img" />
                        </li>
                    </Link>
                    <Link to="/Shopinity/products" className="nav-menu-item-mobile">
                        <li>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png" alt="nav products" class="nav-bar-img" />
                        </li>
                    </Link>
                    <a className="nav-menu-item-mobile" href='/shopinity/cart'>
                        <li onClick={onClickCart} >
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png" alt="nav cart" class="nav-bar-img" />
                            <p> : {cartCount||0} </p>
                        </li>
                    </a>
                    
                </ul>
            </div>
        </nav>
    )
}
