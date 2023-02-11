import React, {useState} from 'react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid'

type Props = {
    password: string;
    setPassword: (p: string) => void;
    inputDisabled: boolean;
}

export default function PasswordInput(props: Props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <label htmlFor='password-login-input'>
            <span
                className="my-1 text-white"
            >
                Password
            </span>
            <div className="w-full inline-flex">
                <input 
                    disabled={props.inputDisabled}
                    id="password-login-input"
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    className="w-full border-transparent bg-slate-700 inline-flex shadow-md rounded-md focus:border-1 focus:border-sky-300 my-2 text-white"
                />
                <button 
                    type="button"
                    className="button rounded-md my-2 p-1"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    {
                        passwordVisible ? 
                        <EyeSlashIcon className="w-5 h-5 text-white" />
                        :
                        <EyeIcon className="w-5 h-5 text-white" />
                    }
                </button>

            </div>
        </ label>
    )
}