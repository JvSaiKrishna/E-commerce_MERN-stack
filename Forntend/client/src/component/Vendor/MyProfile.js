import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Api } from '../Api.js'

const MyProfile = () => {
    const [profile, setProfile] = useState('')
    const [totalProducts, setTotalProducts] = useState('')

    const jwt = Cookies.get("jwt_token")
    useEffect(() => {
        const FetchProfile = async (jwt) => {
            const url = `${Api}/Shopinity/vendor/get-profile`
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            }
            const res = await fetch(url, options)
            if (res.ok) {
                const data = await res.json()
                setTotalProducts(data.product.length)
                setProfile(data)
    
            }
        }
        FetchProfile(jwt)
    }, [jwt])

    


    // console.log(jwt)
    if (!jwt) {
        return <Navigate to="/Shopinity/vendor/login" replace />
    }
    return (
        <>
            <div className='vendor-page-container'>
                <Navbar />
                <div className='sidebar-form-container'>
                    <Sidebar />

                    <div className='vendor-profile-container'>
                        <img className='vendor-profile-logo' src='https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg' alt="profile logo" />
                        <p>Username: {profile.username}</p>
                        <p>Email: {profile.email}</p>
                        <p>Total Products: {totalProducts}</p>


                    </div>
                </div>
            </div>

        </>
    )
}

export default MyProfile