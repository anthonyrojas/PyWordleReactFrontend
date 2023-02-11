import React from 'react'

type Props = {
    username: string;
    setUsername: (u: string) => void;
    inputDisabled: boolean;
}

export default function UsernameInput(props: Props) {
    return (
        <label htmlFor='username-input'>
            <span
                className="my-1 text-white"
            >
                Username
            </span>
            <input
                disabled={props.inputDisabled}
                id="username-input"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
                type="text"
                className="w-full border-transparent bg-slate-700 inline-flex shadow-md rounded-md focus:border-1 focus:border-sky-300 my-2 text-white"
            />
        </ label>
    )
}