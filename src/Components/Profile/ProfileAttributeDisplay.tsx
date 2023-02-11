import React from 'react'

type Props = {
    loading: boolean;
    attributeName: string;
    attributeValue: string|undefined;
}

export default function ProfileAttributeDisplay(props: Props) {
    if (props.loading || !props.attributeValue) {
        return (
            <div className="pulse my-2 w-full space-y-2">
                <div className='rounded-full w-full h-4 bg-slate-700'>
                </div>
                <div className='rounded-full w-full h-6 bg-slate-700'>
                </div>
            </div>
        )
    } else {
        return (
            <div className="my-2 w-full inline-flex flex-col">
                <p className="text-sm text-gray-400 w-full">
                    {props.attributeName}
                </p>
                <p className="text-white w-full">
                    {props.attributeValue}
                </p>
            </div>
        )
    }
}