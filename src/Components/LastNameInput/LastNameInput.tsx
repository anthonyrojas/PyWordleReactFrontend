import React from 'react'

type Props = {
    lastName: string;
    setLastName: (ln: string) => void;
    inputDisabled: boolean;
}

export default function LastNameInput(props: Props) {
    return (
        <label htmlFor='last-name-input'>
            <span
                className="my-1 text-white"
            >
                Last Name
            </span>
            <input
                disabled={props.inputDisabled}
                id="last-name-input"
                value={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
                type="text"
                className="w-full border-transparent bg-slate-700 inline-flex shadow-md rounded-md focus:border-1 focus:border-sky-300 my-2 text-white"
            />
        </ label>
    )
}