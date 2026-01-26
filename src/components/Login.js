import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"

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
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/31027310?s=400&u=027f71f0724f21e40003369673433bdd7b0a21e5&v=4"
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
        console.log(user);
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
        console.log(user);
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
    <div>
        <Header/>
        <div className='absolute'>
            <img
             src="https://assets.nflxext.com/ffe/siteui/vlv3/3d31dac6-aaf0-4e6e-8bd7-e16c5d9cd9a3/web/IN-en-20260119-TRIFECTA-perspective_cce70d60-69c5-428f-99cf-44c212fcec3f_large.jpg"
             alt="logo"
            />
        </div>
        <form
          onSubmit={(e) => e.preventDefault() } 
          className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (  
            <input
              ref={name} 
              type="text" 
              placeholder='Full Name' 
              className='p-4 my-4 w-full bg-gray-700'/>
          )}
          <input
            ref={email}
            type="text" 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-700'/>
          <input 
            ref={password}
            type="password" 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-700' />
          <button 
            className='py-4 my-6 bg-red-700 w-full rounded-lg'
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
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