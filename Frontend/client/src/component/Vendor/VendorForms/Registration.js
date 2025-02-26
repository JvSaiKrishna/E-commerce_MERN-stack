import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from '../Navbar'
import { Api } from '../../Api'


// import "./App.css"


export const VendorRegistration = () => {
  const Navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {

    setPassword(event.target.value)
  }
  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const SubmitHandler = async (event) => {
    event.preventDefault();
    if(password.length >= 6){
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
      alert(data)

    }

    }
    else{
      alert("Password must be atleast 6 characters long")
    }
    
    setEmail('')
    setPassword('')
    setUsername('')
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
        <div>
          <label htmlFor='email'>Email</label>
          <input value={email} onChange={onChangeEmail} type='text' id='email' placeholder='Email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input value={password} onChange={onChangePassword} type='password' id='password' placeholder='Password' />
        </div>
        <button>Submit</button>
      </form>
    </>
  )
}
