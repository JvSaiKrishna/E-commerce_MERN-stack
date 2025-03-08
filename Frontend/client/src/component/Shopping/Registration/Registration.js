import { useState } from 'react'
// import Cookies from "js-cookie"
import "./registration.css"
import { Link, useNavigate } from "react-router-dom"
import { Api } from "../../Api.js"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [emailText, setEmailText] = useState("")
    const [userText, setUserText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState("")

    const [showPwd, setShowPwd] = useState(true)


    //   const jwToken = Cookies.get("jwToken")
    //       if(jwToken){
    //           return <Navigate to="/Shopinity/home" replace/>
    //       }

    // state = { username: '', password: '' }
    const inputHandler = (event) => {
        setusername(event.target.value)
        setUserText("")
        seterror('')
    }
    const emailHandler = (event) => {
        setemail(event.target.value)
        setEmailText("")
        seterror('')

    }
    const passwordHandler = (event) => {
        setpassword(event.target.value)
        setPasswordText("")
        seterror('')

    }



    const SignupSuccesss = (data) => {
        alert(data)
        navigate('/Shopinity/login', { replace: true })

    }


    const SignupFailed = (data) => {
        seterror(data)
        setisLoading(true)


    }

    const onSignup = async (event) => {
        event.preventDefault()
        setisLoading(true)
        if (!username) {
            setisLoading(false)
            return setUserText("Required")
        }
        if (!email){
            setisLoading(false)
            return setEmailText("Required")

        }
        if (!password) {
            setisLoading(false)
            return setPasswordText("Required")
        }
        if (password.length >= 6) {

            const request = { username, email, password }
            //   console.log(request)
            const url = `${Api}/Shopinity/registration`
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

                SignupSuccesss(data)
            }
            else {
                SignupFailed(data)
                // console.log(data)

            }
        }
        else {
            alert("Password must be atleast 6 characters long")
        }
        setusername("")
        setpassword("")
        setemail("")
        setisLoading(false)

    }


    return (
        <div className='signup-form-container'>
            {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='signup-website-logo-mobile-img' /> */}
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png " alt="Website login" className='signup-img' />
            <form className="form-container" onSubmit={onSignup}>
                {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='signup-website-logo-desktop-img' /> */}
                {/* <p>Shopinity</p> */}

                <div className='input-container'>
                    <label className='input-label' htmlFor='Username'>USERNAME</label><br />
                    <input onChange={inputHandler} className="input-field" type='text' id='Username' placeholder='Username' value={username} /><br />

                </div>
                {userText && <p style={{ color: "red" }}>*{userText}</p>}
                <div className='input-container'>
                    <label className='input-label' htmlFor='email'>EMAIL</label><br />
                    <input onChange={emailHandler} className="input-field" type='email' id='email' placeholder='Email' value={email} /><br />

                </div>
                {emailText && <p style={{ color: "red" }}>*{emailText}</p>}

                <div className='input-container'>
                    <label className='input-label' htmlFor='password'>PASSWORD</label><br />
                    {/* <input  onChange={onClickPassword} className='input-field' type='password' id='password' placeholder='Password' value={password} /><br /> */}
                    <div className='password-input-field-container'>
                        <input onChange={passwordHandler} className='input-field' type={showPwd ? 'password' : "text"} id='password' placeholder='Password' value={password} />
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setShowPwd(!showPwd)
                            }
                        } className='eye-logo-btn'>{showPwd ? <FaEye className='eye-logo' /> : <FaEyeSlash className='eye-logo' />}</button>
                    </div>

                </div>
                {passwordText && <p style={{ color: "red" }}>*{passwordText}</p>}
                <button disabled = {isLoading} className={`signup-button ${isLoading ? "btn-loading":"btn-not-loading"}`} type='submit'>{isLoading ? <span className="loader"></span> : "Sign Up"}</button>
                {error && (<p className='error'>*{error}</p>)}<br />

                <p>Already had Account?  <span>
                    <Link className='sign-in' to='/Shopinity/login'> Sign In</Link>
                </span></p>

            </form>
        </div>

    )
}

export default Registration