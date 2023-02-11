import React, {useState, useContext} from 'react'
import WordRow from '../WordRow/WordRow'
import WordSubmitButton from '../WordSubmitButton/WordSubmitButton';
import { WordsContext } from '../../Context/WordsContext';
import {
    submitWordAttempt
} from '../../Actions/WordsActions'
import { AuthContext } from '../../Context/AuthContext';
import ErrorBanner from '../ErrorBanner/ErrorBanner';


type Props = {}

export default function WordGrid({}: Props) {
    const authContext = useContext(AuthContext);
    const {globalState, dispatch} = useContext(WordsContext);
    const wordRowIndices = [0,1,2,3,4,5];
    const [wordRowVals, setWordRowVals] = useState(["", "", "", "", ""]);
    function updateWordRowVal(word: string, i: number) {
        wordRowVals[i] = word;
        setWordRowVals([...wordRowVals]);
    }
    function submitWordRowAttempt() {
        const wordRow: string[] = globalState.wordAttempts[globalState.activeRow]
        submitWordAttempt(wordRow.join(""), dispatch);
    }
    return (
        <div className="w-full my-4 flex flex-col justify-center justify-items-center items-center content-center">
            {
                wordRowIndices.map(wordRowIndex => {
                    return (
                        <WordRow 
                            updateWordRowVal={updateWordRowVal}
                            rowNumber={wordRowIndex}
                            key={wordRowIndex} 
                            isActiveRow={(wordRowIndex) === globalState.activeRow}
                            isSubmitted={wordRowIndex < globalState.activeRow}
                        />
                    )
                })
            }
            <ErrorBanner 
                errorMessage={globalState.errorMessage}
            />
            <WordSubmitButton 
                disabled={globalState.activeRow > 6}
                submitWordAttempt={submitWordRowAttempt}
            />
        </div>
    )
}