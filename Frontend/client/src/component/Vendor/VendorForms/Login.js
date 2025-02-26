import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { Api } from '../../Api'


// dotEnv.config()
// // const Url = process.env.Api

const VendorLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    
    const jwt = Cookies.get("jwt_token")
    // console.log(jwt)
    if(jwt){
        return <Navigate to="/Shopinity/vendor" replace/>
    }

    const onChangeUsername = (event) => {
        setErrMsg("")
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        // setErrMsg("")
        setpassword(event.target.value)
    }
    const SubmitHandler = async (event) => {
        event.preventDefault();
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
            Cookies.set("jwt_token",data.getJwt,{expires:30})
            alert("Login Success")
            navigate("/Shopinity/vendor" , {replace:true})
        }
        else {
            // console.log(data)
            setErrMsg(data)
            
        }
        setUsername('')
        setpassword("")
        // setErrMsg("")



    }


    return (
        <>
        <Navbar/>
            <form className='sign-form' onSubmit={SubmitHandler}>
                <h2>Login</h2>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input value={username} onChange={onChangeUsername} type='text' id='username' placeholder='Username' />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input value={password} onChange={onChangePassword} type='password' id='password' placeholder='Password' />
                </div>
                <button type='submit'>Submit</button>
                {errMsg&&<p style={{color:"red"}}>*{errMsg}</p>}
            </form>
        </>
    )
}

export default VendorLogin