import React, { useState } from 'react'
import "./Login.css"
import Amazon_logo from "./images/Amazon-logo.png";
import {Link , useNavigate} from "react-router-dom"
// import auth from local firebase 
import { auth } from './firebase';



function Login() {
  // pull history 
  const history = useNavigate();

  const [email,setEmail] = useState('')
  // useState hook for password 
  const [password,setPassword] = useState('')
  
  const signIn = e => {
  // this below code prevent the code from refreshing

    e.preventDefault();

    // some fancy firebase login shitt
    auth
    .signInWithEmailAndPassword(email,password)
    .then(auth => {
      history('/')
    })
  }

  const register = e => {
    e.preventDefault();

    // some fancy firebase login shitt
    // this below code is for creating user account 
    auth
      .createUserWithEmailAndPassword(email,password)
      // then code executes after succesfull creation of user account. it may display successful registration done
      .then((auth) => {
        // sucessfully created new user
        // auth is object here
        if(auth){
          history('/')
        }
      })
      .catch(error => alert(error.message))
  }

  return (
    
    <div className='login'>
    <Link to='/'>
      <img src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-salary-png-logo-vector-5.png" className='login--logo'  alt="amazon-logo" />
    </Link>
    <div className="login--container">
        <h1>Sign-in</h1>
        <form action="">
            <h5>E-mail</h5>
            <input type="text" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}/>

            <h5>Password</h5>
            <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={signIn} type="submit" className='login-sign--in'>Sign In</button>
        </form>

        <p>
            By signing in you agree to Amazon's
            conditions of Use & Sale.
        </p>
        <button onClick={register} className='login-register-button'>Create New Account</button>
    </div>
    </div>
  )
}

export default Login
