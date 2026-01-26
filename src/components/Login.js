import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"
import { USER_AVATAR } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setSignInForm] = useState();
  const [errorMessage,setErrorMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }
  
  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value,password.current.value)
    setErrorMessage(message);
    if(message) return;
    
    // sign in / sign up
    if(!isSignInForm) {
      // Sign up logic
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(
            addUser(
              {
                uid: uid, email: email, displayName: displayName, photoURL: photoURL
              }
            )
          );
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    } else {
      // Signin logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
    
  }
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
        <Header/>
        
        <div className='fixed inset-0 -z-10'>
            <img
              className='w-full h-full object-cover'
              src="https://assets.nflxext.com/ffe/siteui/vlv3/3d31dac6-aaf0-4e6e-8bd7-e16c5d9cd9a3/web/IN-en-20260119-TRIFECTA-perspective_cce70d60-69c5-428f-99cf-44c212fcec3f_large.jpg"
              alt="background"
            />
        </div>

        {/* FIXED: Reduced width to w-[380px]
            Reduced padding to p-10
        */}
        <form
          onSubmit={(e) => e.preventDefault()} 
          className='w-[380px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-black text-white rounded-md bg-opacity-85 z-20'>
          
          <h1 className='font-bold text-3xl mb-6'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          
          {!isSignInForm && (  
            <input
              ref={name} 
              type="text" 
              placeholder='Full Name' 
              className='p-3 mb-4 w-full bg-gray-700 rounded-sm outline-none text-sm'/>
          )}
          
          <input
            ref={email}
            type="text" 
            placeholder='Email Address' 
            className='p-3 mb-4 w-full bg-gray-700 rounded-sm outline-none text-sm'/>
            
          <input 
            ref={password}
            type="password" 
            placeholder='Password' 
            className='p-3 mb-4 w-full bg-gray-700 rounded-sm outline-none text-sm' />
            
          <button 
            className='py-3 mt-4 bg-red-700 w-full rounded-md font-bold'
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          
          {errorMessage && (
            <p className='text-red-500 font-semibold text-xs pt-4'>{errorMessage}</p>
          )}
          
          <p className='mt-8 text-sm text-gray-400'>
            {isSignInForm ? "New to Netflix?" : "Already registered?"} 
            <span 
               className='text-white ml-1 cursor-pointer hover:underline font-medium' 
               onClick={toggleSignInForm}>
               {isSignInForm ? "Sign Up Now" : "Sign In Now"}
            </span>
          </p>
        </form>
    </div>
  )
}

export default Login