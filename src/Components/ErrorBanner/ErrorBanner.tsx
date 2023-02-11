import React from 'react'

type Props = {
    errorMessage: string;
}

export default function ErrorBanner(props: Props) {
    if (props.errorMessage.trim().length === 0) {
        return null;
    }
    return (
        <div className="text-center text-white bg-red-600 my-2 p-2 rounded-sm shadow-md animate-fade-in-bounce">
            {props.errorMessage}
        </div>
    )
}