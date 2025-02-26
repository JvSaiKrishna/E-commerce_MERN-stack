import { useState } from 'react'
import Cookies from "js-cookie"
import "./login.css"
import { useNavigate,Navigate, Link } from "react-router-dom"
import { Api } from '../../Api.js'
import { FaEye,FaEyeSlash  } from "react-icons/fa";


export default function Login() {
    const navigate = useNavigate()   
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [isLogFailed, setisLogFailed] = useState(false)
    const [error, seterror] = useState("")
    const [showPwd, setShowPwd] = useState(true)



    const jwToken = Cookies.get("jwToken")
        if(jwToken){
            return <Navigate to="/Shopinity/home" replace/>
        }

    // state = { username: '', password: '' }
    const onClickInput = (event) => {
        setusername(event.target.value)
        // this.setState({ username: event.target.value })

    }
    const onClickPassword = (event) => {
        setpassword(event.target.value)
        // this.setState({ password: event.target.value })

    }



    const LoginInSuccesss = (jwToken) => {
        alert("Login Success")
        navigate('/Shopinity/home', { replace: true })
        Cookies.set("jwToken",jwToken,{expires:30})

    }


    const LoginInFailed = (error_msg) => {
        seterror(error_msg)
        setisLogFailed(true)


    }

    const onLogin = async (event) => {
        event.preventDefault()
        // const { username, password } = this.state
        if(!username || !password){
            return alert("Input Details Required")
        }
        const request = { username, password }
        const url = `${Api}/Shopinity/login`
        const options = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
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
        // setusername("")
        // setpassword("")

    }



    return (
        <div className='login-form-container'>
            {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='login-website-logo-mobile-img' /> */}
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png " alt="Website login" className='login-img' />
            <form className="form-container" onSubmit={onLogin}>
                {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='login-website-logo-desktop-img' /> */}

                <div className='input-container'>
                    <label className='input-label' htmlFor='Username'>USERNAME</label><br />
                    <input  onChange={onClickInput} className="username-input-field" type='text' id='Username' placeholder='Username' value={username} /><br />


                </div>

                <div className='input-container'>
                    <label className='input-label' htmlFor='password'>PASSWORD</label><br />
                    <div className='password-input-field-container'>
                    <input  onChange={onClickPassword} className='password-input-field' type={showPwd?'password':"text"} id='password' placeholder='Password' value={password} />
                    <button onClick={
                        (e)=>{
                            e.preventDefault()
                            setShowPwd(!showPwd)
                        }
                    } className='eye-logo-btn'>{showPwd?<FaEye className='eye-logo' />: <FaEyeSlash className='eye-logo' />}</button>
                    </div>
                    
                </div>
                <button className='login-button' type='submit'>Login</button>
                {isLogFailed && (<p className='error'>*{error}</p>)}<br/>


                <p>New Customer? <span>
                    <Link className='start-here' to='/Shopinity/registration'> Start here</Link>
                    </span></p>


            </form>
        </div>

    )

}

