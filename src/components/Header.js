import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"
import { useDispatch } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
    });

    return() => unsubscribe();
  }, [])

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange =(e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='fixed w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
      <img 
        className='w-44 cursor-pointer'
        src={LOGO}
        alt="logo"
      />   

      {user && (
        <div className='flex items-center'>
        {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            { SUPPORTED_LANGUAGES.map(lang => 
              <option key={lang.identifier} 
                value={lang.identifier}>
                {lang.name}
              </option>) }
          </select>)}
          <button 
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-opacity-80 transition-all font-medium"
            onClick={handleGptSearchClick}>
              { showGptSearch ? "Homepage" : "GPT Search" }
          </button>

          {/* 2. User Profile Group (Only this handles the dropdown) */}
          <div className='group relative p-2 flex items-center'>
            <div className="flex items-center cursor-pointer">
              <img
                className='w-10 h-10 rounded-md' 
                alt="usericon"
                src={user?.photoURL} 
              />
              <span className="text-white ml-2 transition-transform group-hover:rotate-180 duration-300 text-[10px]">
                ▼
              </span>
            </div>

            {/* Dropdown Menu */}
            <div className='absolute top-14 right-0 bg-black/90 border border-gray-800 w-36 hidden group-hover:block transition-all shadow-xl rounded-sm'>
              <div className="absolute -top-4 w-full h-4"></div>
              <div className="p-4 text-center">
                <button 
                  onClick={handleSignOut}
                  className='text-white text-sm font-medium hover:underline w-full'>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header