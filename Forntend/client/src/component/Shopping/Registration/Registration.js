import { useState } from 'react'
// import Cookies from "js-cookie"
import "./registration.css"
import {  Link, useNavigate } from "react-router-dom"
import {Api} from "../../Api.js"

const Registration = () => {
   const navigate = useNavigate()
      const [inputRequired, setinput] = useState("")
      const [isinputRequire, setisinput] = useState(false)
      const [emailRequired, setemailRequired] = useState("")
      const [isemailRequire, setisemailRequire] = useState(false)
      const [pwdRequired, setpwd] = useState("")
      const [ispwdRequire, setispwd] = useState(false)
      const [username, setusername] = useState("")
      const [email, setemail] = useState("")
      const [password, setpassword] = useState("")
      const [isLogFailed, setisLogFailed] = useState(false)
      const [error, seterror] = useState("")
  
  
    //   const jwToken = Cookies.get("jwToken")
    //       if(jwToken){
    //           return <Navigate to="/Shopinity/home" replace/>
    //       }
  
      // state = { username: '', password: '' }
      const onClickInput = (event) => {
          setusername(event.target.value)
          // this.setState({ username: event.target.value })
  
      }
      const onClickEmail = (event) => {
          setemail(event.target.value)
          // this.setState({ username: event.target.value })
  
      }
      const onClickPassword = (event) => {
          setpassword(event.target.value)
          // this.setState({ password: event.target.value })
  
      }
  
  
  
      const SignupSuccesss = (data) => {
        alert(data)
          navigate('/Shopinity/login', { replace: true })
          
      }
  
  
      const SignupFailed = (data) => {
          seterror(data)
          setisLogFailed(true)
  
  
      }
  
      const onSignup = async (event) => {
          event.preventDefault()
          if(password.length >= 6){

              const request = { username,email, password }
            //   console.log(request)
              const url = `${Api}/Shopinity/registration`
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
                  
                  SignupSuccesss(data)
                }
                else {
                    SignupFailed(data)
                    // console.log(data)
                    
                }
          }
          else{
            alert("Password must be atleast 6 characters long")
          }
            setusername("")
            setpassword("")
            setemail("")
  
      }
  
  
  
  
      const OnBlurInput = (event) => {
          if (event.target.value === "") {
              setisinput(true)
              setinput("Required")
          }
          else{
              setisinput(false)
              setinput("")
  
          }
      }
      const OnBlurEmail = (event) => {
          if (event.target.value === "") {
              setisemailRequire(true)
              setemailRequired("Required")
          }
          else{
              setisemailRequire(false)
              setemailRequired("")
  
          }
      }
      const OnBlurPwd = (event) => {
          if (event.target.value ==="") {
              setispwd(true)
              setpwd("Required")
          }
          else{
              setispwd(false)
              setpwd("")
  
          }
      }
      // console.log(inputRequired,pwdRequired)
  
      return (
          <div className='signup-form-container'>
              {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='signup-website-logo-mobile-img' /> */}
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png " alt="Website login" className='signup-img' />
              <form className="form-container" onSubmit={onSignup}>
                  {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png " alt=" Website Logo" className='signup-website-logo-desktop-img' /> */}
            {/* <p>Shopinity</p> */}
  
                  <div className='input-container'>
                      <label className='input-label' htmlFor='Username'>USERNAME</label><br />
                      <input onBlur={OnBlurInput} onChange={onClickInput} className="input-field" type='text' id='Username' placeholder='Username' value={username} /><br />
                      {(isinputRequire)&& (<p className='error'>*{inputRequired}</p>) }
  
                  </div>
                  <div className='input-container'>
                      <label className='input-label' htmlFor='email'>EMAIL</label><br />
                      <input onBlur={OnBlurEmail} onChange={onClickEmail} className="input-field" type='text' id='email' placeholder='Email' value={email} /><br />
                      {(isemailRequire)&& (<p className='error'>*{emailRequired}</p>) }
  
                  </div>
  
                  <div className='input-container'>
                      <label className='input-label' htmlFor='password'>PASSWORD</label><br />
                      <input onBlur={OnBlurPwd} onChange={onClickPassword} className='input-field' type='password' id='password' placeholder='Password' value={password} /><br />
                      {(ispwdRequire) &&(<p className='error'>*{pwdRequired}</p>)}
  
                  </div>
                  <button className='signup-button' type='submit'>Sign up</button>
                  {isLogFailed && (<p className='error'>*{error}</p>)}<br/>

                  <p>Already had Account?  <span>
                    <Link to='/Shopinity/login'> Sign In</Link>
                    </span></p>
  
              </form>
          </div>
  
      )
}

export default Registration