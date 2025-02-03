import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className='sidebar'>
      <Link to="/Shopinity/vendor/add-product" className='sidebar-categories'>
      <p>Add Products</p>
      </Link>
      <Link to="/Shopinity/vendor/get-products" className='sidebar-categories'>
      <p>My Products</p>
      </Link>
      <Link to="/Shopinity/vendor/get-profile" className='sidebar-categories'>
      <p>My Profile</p>
      </Link>
      
    </div>
    </>
  )
}

export default Sidebar