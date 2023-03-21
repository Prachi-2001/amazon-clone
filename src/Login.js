import React from 'react'
import "./Login.css"
import Amazon_logo from "./images/Amazon-logo.png";
import {Link} from "react-router-dom"

function Login() {
  return (
    
    <div className='login'>
    <Link to='/'>
      <img src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-salary-png-logo-vector-5.png" className='login--logo'  alt="amazon-logo" />
    </Link>
    <div className="login--container">
        <h1>Sign-in</h1>
        <form action="">
            <h5>E-mail</h5>
            <input type="text" placeholder='Enter your email'/>

            <h5>Password</h5>
            <input type="password" placeholder='Enter your email'/>
            <button className='login-sign--in'>Sign In</button>
        </form>

        <p>
            By signing in you agree to Amazon's
            conditions of Use & Sale.
        </p>
        <button className='login-register-button'>Create New Account</button>
    </div>
    </div>
  )
}

export default Login
