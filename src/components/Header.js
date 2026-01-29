import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"
import { useDispatch } from 'react-redux';
import { LOGO } from "../utils/constants";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
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
  return (
    <div className='fixed w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
      <img 
        className='w-44 cursor-pointer'
        src={LOGO}
        alt="logo"
      />   

      {user && (
        <div className='flex items-center group relative p-2'>
          {/* User Avatar Section */}
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

          {/* Simplified Dropdown - Shows only Sign Out */}
          <div className='absolute top-14 right-0 bg-black/90 border border-gray-800 w-36 hidden group-hover:block transition-all shadow-xl rounded-sm'>
            
            {/* Invisible bridge to prevent menu from closing when moving mouse */}
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
      )}
    </div>
  )
}

export default Header