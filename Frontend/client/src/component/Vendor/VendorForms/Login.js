import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { Api } from '../../Api'
import { FaEye, FaEyeSlash } from "react-icons/fa";


// dotEnv.config()
// // const Url = process.env.Api

const VendorLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [errMsg, setErrMsg] = useState('')
    const [userText, setUserText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [isLogFailed, setisLogFailed] = useState(false)
    const [showPwd, setShowPwd] = useState(true)


    const navigate = useNavigate()

    const jwt = Cookies.get("jwt_token")
    // console.log(jwt)
    if (jwt) {
        return <Navigate to="/Shopinity/vendor" replace />
    }

    const onChangeUsername = (event) => {
        setErrMsg("")
        setUserText("")
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        setErrMsg("")
        setPasswordText("")
        setpassword(event.target.value)
    }
    const SubmitHandler = async (event) => {
        event.preventDefault();
        setisLogFailed(true)
        if (!username) {
            setisLogFailed(false)
            return setUserText("Required")
        }
        if (!password) {
            setisLogFailed(false)
            return setPasswordText("Required")
        }
        const Data = { username, password }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)

        }
        const url = `${Api}/Shopinity/vendor/login`
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            Cookies.set("jwt_token", data.getJwt, { expires: 30 })
            alert("Login Success")
            navigate("/Shopinity/vendor", { replace: true })
        }
        else {
            // console.log(data)
            setErrMsg(data)

        }
        setUsername('')
        setpassword("")
        setisLogFailed(false)
        // setErrMsg("")



    }


    return (
        <>
            <Navbar />
            <form className='sign-form' onSubmit={SubmitHandler}>
                <h2>Login</h2>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input value={username} onChange={onChangeUsername} type='text' id='username' placeholder='Username' />
                </div>
                {userText && <p style={{ color: "red" }}>*{userText}</p>}

                <div>
                    <label htmlFor='password'>Password</label>
                    <div >

                        <input type={showPwd ? 'password' : "text"} value={password} onChange={onChangePassword} id='password' placeholder='Password' />
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setShowPwd(!showPwd)
                            }
                        } >{showPwd ? <FaEye className='eye-logo' /> : <FaEyeSlash className='eye-logo' />}</button>
                    </div>
                </div>
                {passwordText && <p style={{ color: "red" }}>*{passwordText}</p>}
                <button className = {`submit ${isLogFailed ?"btns-loading":"btns-not-loading"}`} disabled = {isLogFailed} type='submit' >{isLogFailed ? <span className="loaders"></span> : "Login"}</button>
                {errMsg && <p style={{ color: "red" }}>*{errMsg}</p>}
            </form>
        </>
    )
}

export default VendorLogin