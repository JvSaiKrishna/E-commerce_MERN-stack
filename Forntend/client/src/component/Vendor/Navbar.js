import React from 'react'

import { Link, useNavigate } from "react-router-dom"
import cookies from "js-cookie"

const Navbar = () => {
  const navigate = useNavigate()
  const jwt = cookies.get("jwt_token")


  const onClickLogout = () => {
    // confirm("Are you sure to logout?")
    cookies.remove("jwt_token")
    navigate("/Shopinity/vendor/login", { replace: true })

  }
  let displayLogButtons;
  if (jwt) {
    displayLogButtons = (
      <>
        <p onClick={onClickLogout} className='logout'>
          Logout
        </p>
      </>
    )


  }
  else {
    displayLogButtons = (
      <>
        <p>
          <Link to="/Shopinity/vendor/login">
            <span>Login</span>
          </Link>/
          <Link to="/Shopinity/vendor/registration">
            <span>Registration</span>
          </Link>
        </p>
      </>
    )
  }
  return (
    <div>
      <nav className='navbar'>
        <Link to="/Shopinity/vendor" className='app-name'>
          <h2>Shopinity</h2>
        </Link>
        <div>
          {displayLogButtons}
        </div>
      </nav>
    </div>


  )
}

export default Navbar