import { useState } from 'react'
import Cookies from "js-cookie"
import "./login.css"
import { useNavigate, Navigate, Link } from "react-router-dom"
import { Api } from '../../Api.js'
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
    const navigate = useNavigate()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [userText, setUserText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState("")
    const [showPwd, setShowPwd] = useState(true)



    const jwToken = Cookies.get("jwToken")
    if (jwToken) {
        return <Navigate to="/Shopinity/home" replace />
    }

    // state = { username: '', password: '' }
    const inputHandler = (event) => {
        setusername(event.target.value)
        setUserText("")
        seterror('')

    }
    const passwordHandler = (event) => {
        setpassword(event.target.value)
        setPasswordText("")
        seterror('')

    }



    const LoginInSuccesss = (jwToken) => {
        alert("Login Success")
        navigate('/Shopinity/home', { replace: true })
        Cookies.set("jwToken", jwToken, { expires: 30 })

    }


    const LoginInFailed = (error_msg) => {
        seterror(error_msg)


    }

    const onLogin = async (event) => {
        event.preventDefault()
        setisLoading(true)
        if (!username) {
            setisLoading(false)
            return setUserText("Required")
        }
        if (!password) {
            setisLoading(false)
            return setPasswordText("Required")
        }
        const request = { username, password }
        const url = `${Api}/Shopinity/login`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            // console.log(data)

            LoginInSuccesss(data.getJwt)
        }
        else {
            LoginInFailed(data)
            // console.log(data)

        }
        setusername("")
        setpassword("")
        setisLoading(false)

    }



    return (
        <div className='login-form-container'>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png " alt="Website login" className='login-img' />
            <form className="form-container" onSubmit={onLogin}>


                <div className='input-container'>
                    <label className='input-label' htmlFor='Username'>USERNAME</label><br />
                    <input onChange={inputHandler} className="username-input-field" type='text' id='Username' placeholder='Username' value={username} /><br />
                    {userText && <p style={{ color: "red" }}>*{userText}</p>}


                </div>

                <div className='input-container'>
                    <label className='input-label' htmlFor='password'>PASSWORD</label><br />
                    <div className='password-input-field-container'>
                        <input onChange={passwordHandler} className='password-input-field' type={showPwd ? 'password' : "text"} id='password' placeholder='Password' value={password} />
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setShowPwd(!showPwd)
                            }
                        } className='eye-logo-btn'>{showPwd ? <FaEye className='eye-logo' /> : <FaEyeSlash className='eye-logo' />}</button>

                    </div>
                    {passwordText && <p style={{ color: "red" }}>*{passwordText}</p>}

                </div>
                <button disabled={isLoading} className={`login-button ${isLoading ? "btn-loading":"btn-not-loading"}`} type='submit'>{isLoading ? <span className="loader"></span> : "Login"}</button>
                {error && (<p className='error'>*{error}</p>)}<br />


                <p>New Customer? <span>
                    <Link className='start-here' to='/Shopinity/registration'> Start here</Link>
                </span></p>


            </form>
        </div>

    )

}

