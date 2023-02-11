import React from 'react'

type Props = {
    firstName: string;
    setFirstName: (fn: string) => void;
    inputDisabled: boolean;
}

export default function FirstNameInput(props: Props) {
    return (
        <label htmlFor='first-name-input'>
            <span
                className="my-1 text-white"
            >
                First Name
            </span>
            <input
                disabled={props.inputDisabled}
                id="first-name-input"
                value={props.firstName}
                onChange={(e) => props.setFirstName(e.target.value)}
                type="text"
                className="w-full border-transparent bg-slate-700 inline-flex shadow-md rounded-md focus:border-1 focus:border-sky-300 my-2 text-white"
            />
        </ label>
    )
}