import React, {useState, useContext} from 'react'
import WordCell from '../WordCell/WordCell';
import { WordsContext } from '../../Context/WordsContext';
import { changeWordAttempts } from '../../Actions/WordsActions';

type Props = {
    updateWordRowVal: (word: string, i: number) => void;
    isActiveRow: boolean,
    rowNumber: number;
    isSubmitted: boolean;
}

export default function WordRow(props: Props) {
    const {globalState, dispatch} = useContext(WordsContext);
    const [cellInFocus, setCellInFocus] = useState(0);
    function handleLetterChanged(letterInputValue: string, i: number) {
        const activeRow = globalState.activeRow;
        let wordAttempts = globalState.wordAttempts;
        wordAttempts[activeRow][i] = letterInputValue;
        changeWordAttempts(wordAttempts, dispatch);
        setCellInFocus(i+1)
    }
    React.useEffect(() => {
        if (props.isActiveRow) {
            setCellInFocus(0);
        }
    }, [props.isActiveRow])
    return (
        <div className={`
            w-full 
            flex 
            flex-row 
            items-center 
            justify-center 
            flex-nowrap
            ${props.isActiveRow ? "bg-sky-300/50 rounded-md" : null}`    
        }>
            {
                globalState.wordAttempts[props.rowNumber].map((letter, i) => {
                    return (
                        <WordCell
                            rowNumber={props.rowNumber}
                            key={i} 
                            isActive={props.isActiveRow}
                            isInFocus={i === cellInFocus} 
                            isSubmitted={props.isSubmitted}
                            charIndex={i} 
                            handleLetterChanged={handleLetterChanged} 
                        />
                    )
                })
            }
        </div>
    )
}