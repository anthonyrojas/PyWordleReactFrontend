import React from 'react';
import { 
    WordsReducer, 
    initialState as wordsInitialState 
} from '../Reducers/WordsReducer';
import { 
    WordsContext 
} from '../Context/WordsContext';

const WordsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [globalState, dispatch] = React.useReducer(WordsReducer, wordsInitialState);
    return (
        <WordsContext.Provider value={{globalState, dispatch}}>
            {children}
        </WordsContext.Provider>
    )
}
export default WordsProvider