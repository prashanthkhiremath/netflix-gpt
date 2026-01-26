import React, { useState } from 'react'
import Header from './Header'
const Login = () => {
  const [isSignInForm, setSignInForm] = useState();
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img
             src="https://assets.nflxext.com/ffe/siteui/vlv3/3d31dac6-aaf0-4e6e-8bd7-e16c5d9cd9a3/web/IN-en-20260119-TRIFECTA-perspective_cce70d60-69c5-428f-99cf-44c212fcec3f_large.jpg"
             alt="logo"
            />
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (  
            <input 
            type="text" 
            placeholder='Full Name' 
            className='p-4 my-4 w-full bg-gray-700'/>
          )}
          <input 
            type="text" 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-700'/>
          <input 
            type="password" 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-700' />
          <button 
            className='py-4 my-6 bg-red-700 w-full rounded-lg'>
              {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm 
              ? "New to Netflix? Sign Up Now" 
              : "Already registered? Sign In Now"}
          </p>
        </form>
    </div>
  )
}

export default Login