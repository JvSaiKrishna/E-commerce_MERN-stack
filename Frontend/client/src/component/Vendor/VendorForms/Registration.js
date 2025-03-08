import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from '../Navbar'
import { Api } from '../../Api'
import { FaEye, FaEyeSlash } from "react-icons/fa";


// import "./App.css"


export const VendorRegistration = () => {
  const Navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [userText, setUserText] = useState('')
  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [isLogFailed, setisLogFailed] = useState(false)
  const [showPwd, setShowPwd] = useState(true)


  const onChangeUsername = (event) => {
    setErrMsg("")
    setUserText("")
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {
    setErrMsg("")
    setPasswordText("")
    setPassword(event.target.value)
  }
  const onChangeEmail = (event) => {
    setErrMsg("")
    setEmailText("")
    setEmail(event.target.value)
  }
  const SubmitHandler = async (event) => {
    event.preventDefault();
    setisLogFailed(true)
    if (!username) {
      setisLogFailed(false)
      return setUserText("Required")
    }
    if (!email) {
      setisLogFailed(false)
      return setEmailText("Required")
    }
    if (!password) {
      setisLogFailed(false)
      return setPasswordText("Required")
    }
    if (password.length >= 6) {
      const Data = { username, password, email }
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)

      }
      const url = `${Api}/Shopinity/vendor/registration`
      // console.log(Data)
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        alert(data)
        return Navigate('/Shopinity/vendor/login', { replace: true })

      }
      else {
        setErrMsg(data)

      }

    }
    else {
      alert("Password must be atleast 6 characters long")
    }

    setEmail('')
    setPassword('')
    setUsername('')
    setisLogFailed(false)
  }

  return (
    <>
      <Navbar />
      <form className='sign-form' onSubmit={SubmitHandler}>
        <h2>Registration</h2>
        <div>
          <label htmlFor='username'>Username</label>
          <input value={username} onChange={onChangeUsername} type='text' id='username' placeholder='Username' />
        </div>
        {userText && <p style={{ color: "red" }}>*{userText}</p>}
        <div>
          <label htmlFor='email'>Email</label>
          <input value={email} onChange={onChangeEmail} type='email' id='email' placeholder='Email' />
        </div>
        {emailText && <p style={{ color: "red" }}>*{emailText}</p>}
        <div>
          <label htmlFor='password'>Password</label>
          <div>
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
        <button disabled = {isLogFailed} className = {`submit ${isLogFailed ?"btns-loading":"btns-not-loading"}`}>{isLogFailed ? <span className="loaders"></span> : "Sign Up"}</button>
        {errMsg && <p style={{ color: "red" }}>*{errMsg}</p>}
      </form>
    </>
  )
}
