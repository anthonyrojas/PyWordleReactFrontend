import React from 'react';
import {XCircleIcon} from '@heroicons/react/24/solid'

type Props = {
    successMessage: string;
    clearMessage: () => void;
}

export default function SuccessBanner(props: Props) {
    if (!props.successMessage || props.successMessage.trim().length === 0) {
        return null;
    }
    return (
        <div 
            className="text-center inline-flex text-white bg-green-600 my-2 p-2 rounded-sm shadow-md animate-fade-in-bounce"
        >
            <p>{props.successMessage}</p>
            <button
                className="button mx-1 rounded-full hover:text-red-400 hover:scale-150 justify-center active:text-red-500"
                onClick={() => props.clearMessage()}
            >
                <XCircleIcon 
                    className="h-5 w-5"
                />
            </button>
        </div>
    )
}