import React, {useContext, useState} from 'react'
import { AuthContext } from '../../Context/AuthContext';
import {
    Link
} from 'react-router-dom'
import { logoutUser } from '../../Actions/AuthActions';
import {
    Bars3Icon
} from '@heroicons/react/24/outline'

export default function NavigationBar() {
    const [mobileExtended, setMobileExtended] = useState(false);
    const liClassName="flex-1 lg:inline-flex";
    const ulClassName=`space-y-4 lg:space-y-0 lg:space-x-4 ${mobileExtended ? 'block' : 'hidden'} lg:block`
    const {globalState, dispatch} = useContext(AuthContext);
    if (globalState.isAuthenticated) {
        return (
            <nav className="text-white p-4 w-full bg-slate-700 shadow-md mb-2 flex flex-row flex-wrap items-center">
                <div className="w-full lg:hidden">
                    <button
                        type='button'
                        className='button bg-slate-300 text-black p-2 rounded-md my-2'
                        onClick={() => setMobileExtended(!mobileExtended)}
                    >
                        <Bars3Icon 
                            className='text-black h-5 w-5'
                        />   
                    </button>
                </div>
                <ul className={ulClassName}>
                    <li className={liClassName}>
                        <Link to="/" className="hover:text-sky-500">
                            Word Game
                        </Link>
                    </li>
                    <li className={liClassName}>
                        <Link to="/profile" className="hover:text-sky-500">
                            Profile
                        </Link>
                    </li>
                    <li className={liClassName}>
                        <button 
                            type="button" 
                            className='text-red-400 font-bold hover:text-red-600'
                            onClick={() => logoutUser(dispatch)}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav className="text-white p-4 w-full bg-slate-700 shadow-md mb-2 flex flex-row flex-wrap items-center">
                <div className="w-full lg:hidden">
                    <button
                        type='button'
                        className='button bg-slate-300 text-black p-2 rounded-md my-2'
                        onClick={() => setMobileExtended(!mobileExtended)}
                    >
                        <Bars3Icon 
                            className='text-black h-5 w-5'
                        />   
                    </button>
                </div>
                <ul className={ulClassName}>
                    <li className="flex-1 lg:inline-flex">
                        <Link to="/login" className="hover:text-sky-500">
                            Login
                        </Link>
                    </li>
                    <li className="flex-1 lg:inline-flex">
                        <Link to="/register" className="hover:text-sky-500">
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}