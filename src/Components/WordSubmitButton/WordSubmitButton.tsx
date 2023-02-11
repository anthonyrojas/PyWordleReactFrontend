import React, {useRef, useContext} from 'react';
import { WordsContext } from '../../Context/WordsContext';
import ButtonSpinnerIcon from '../ButtonSpinnerIcon/ButtonSpinnerIcon';

type Props = {
    disabled: boolean;
    submitWordAttempt: () => void;
}

export default function WordSubmitButton(props: Props) {
    const {globalState} = useContext(WordsContext)
    const btnRef = useRef<HTMLButtonElement>(null);
    function handleOnClick() {
        btnRef.current?.blur();
        props.submitWordAttempt();
    }
    return (
        <button 
            disabled={props.disabled}
            ref={btnRef}
            type="button"
            className="button my-2 rounded-md p-2 bg-sky-400 text-white text-center inline-flex flex-row content-center items-center justify-center"
            onClick={handleOnClick}
        >
            <ButtonSpinnerIcon 
                visible={globalState.submittingAttempt}
            />
            Enter Word
        </button>
    )
}