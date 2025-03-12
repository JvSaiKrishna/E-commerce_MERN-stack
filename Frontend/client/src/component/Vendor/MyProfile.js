import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Api } from '../Api.js'
import { FaCamera } from "react-icons/fa";


const MyProfile = () => {
    const [profile, setProfile] = useState('')
    const [picUpdate, setPicUpdate] = useState('')
    const [img, setimg] = useState('')
    const [isPicUpdate, setIsPicUpdate] = useState(false)

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
                setProfile(data)
                if (data.img) {
                    setimg(data.img)
                } else {
                    setimg('')
                }

            }
        }
        FetchProfile(jwt)
    }, [jwt])

    useEffect(() => {
        const UploadPic = async (picUpdate, jwt) => {
            if (picUpdate) {
                setIsPicUpdate(true)
                const Data = { pic: picUpdate }
                const url = `${Api}/Shopinity/vendor/profile-update`
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    },
                    body: JSON.stringify(Data)
                }
                const res = await fetch(url, options)
                const data = await res.json()
                if (res.ok) {
                    setimg(data.img)
                }
                else {
                    alert(data)
                }
                setIsPicUpdate(false)



            }
            return
        }
        UploadPic(picUpdate, jwt)


    }, [picUpdate, jwt])

    const profileImgHandler = (e) => {
        const file = e.target.files[0]

        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPicUpdate(reader.result)

            };
            reader.readAsDataURL(file)
        }
        return
    }
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
                        <div className='profile-photo-container' >
                            
                                <div className={`vendor-profile-logo-container ${isPicUpdate&&`profile-logo-container-loading`}`}>
                                {isPicUpdate ?<div className='profile-loader-container'> <p className='profile-loader'></p></div> :

                                    <img className='vendor-profile-logo' src={img ? img : 'https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg'} alt="profile logo" />
                                }
                                </div>


                            <label className='camera-logo-container'>
                                {isPicUpdate?"":<FaCamera class="camera-logo"/>}
                                <input onChange={profileImgHandler} style={{ display: 'none' }} type="file" />
                            </label>


                        </div>
                        <div className='profile-data-container'>
                            <div>
                                <label className='profile-labels'>Username</label>
                                <h1 className='profile-names'>{profile?.username}</h1>
                            </div>
                            <div>
                                <label className='profile-labels'>Email</label>
                                <h1 className='profile-names'>{profile?.email}</h1>
                            </div>
                            <div>
                                <label className='profile-labels'>Total Products</label>
                                <h1 className='profile-names'>{profile?.product?.length}</h1>
                            </div>

                        </div>
                    </div>




                </div>
            </div>

        </>
    )
}

export default MyProfile