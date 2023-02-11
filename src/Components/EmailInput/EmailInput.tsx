import React from 'react'

type Props = {
    email: string;
    setEmail: (e: string) => void;
    inputDisabled: boolean;
}

export default function EmailInput(props: Props) {
    return (
        <label htmlFor='email-input'>
            <span
                className="my-1 text-white"
            >
                Email
            </span>
            <input
                disabled={props.inputDisabled}
                id="email-input"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                type="email"
                className="w-full border-transparent bg-slate-700 inline-flex shadow-md rounded-md focus:border-1 focus:border-sky-300 my-2 text-white"
            />
        </ label>
    )
}