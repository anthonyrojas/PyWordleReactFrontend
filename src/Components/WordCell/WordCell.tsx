import React, {useContext, useEffect, useRef} from 'react'
import { WordsContext } from '../../Context/WordsContext';

type Props = {
    rowNumber: number;
    isActive: boolean;
    isSubmitted: boolean;
    isInFocus: boolean;
    charIndex: number;
    handleLetterChanged: (letter: string, i: number) => void;
}

export default function WordCell(props: Props) {
    const classNames: string[] = [
        "p-1", 
        "m-1", 
        "justify-center",
        "font-bold",
        "border-transparent",
        "rounded-md",
        "text-white",
        "text-center",
        "focus:border-1",
        "focus:border-sky-300",
        "focus:drop-shadow-md",
        "inline-flex",
        "w-1/5"
    ]
    const inputRef = useRef<HTMLInputElement>(null);
    const {globalState} = useContext(WordsContext);
    useEffect(() => {
        if (props.isInFocus) {
            inputRef.current?.focus();
        }
    }, [props.isInFocus])
    function handleCellLetterChanged(letterInputValue: string, i: number) {
        if (/^[a-zA-Z]+$/.test(letterInputValue)) {
            props.handleLetterChanged(letterInputValue.toLowerCase(), i);
        }
    }

    if (props.isSubmitted && globalState.correctLetters.length >= props.rowNumber && globalState.correctLetters[props.rowNumber].includes(props.charIndex)) {
        return (
            <span
                className={`${classNames.join(" ")} bg-green-700`}
            >
                {globalState.wordAttempts[props.rowNumber][props.charIndex]}
            </span>
        );
    } 
    else if (props.isSubmitted && globalState.misplacedLetters.length >= props.rowNumber && globalState.misplacedLetters[props.rowNumber].includes(props.charIndex)) {
        return (
            <span
                className={`${classNames.join(" ")} bg-yellow-600`}
            >
                {globalState.wordAttempts[props.rowNumber][props.charIndex]}
            </span>
        );
    }
    else if (props.isSubmitted && globalState.misplacedLetters.length >= props.rowNumber) {
        return (
            <span
                className={`${classNames.join(" ")} bg-red-600`}
            >
                {globalState.wordAttempts[props.rowNumber][props.charIndex]}
            </span>
        )
    }
    return (
        <input
            ref={inputRef}
            type="text"
            maxLength={1}
            className={`${classNames.join(" ")} bg-slate-700`}
            onChange={(e) => handleCellLetterChanged(e.target.value, props.charIndex)}
            disabled={!props.isActive}
        />
    )
}