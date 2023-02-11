import React, {createContext} from "react";
import { WordsReducerAction, WordsState } from "../Reducers/WordsReducer";

type WordsContextType = {
    globalState: WordsState,
    dispatch: React.Dispatch<WordsReducerAction>
}
export const WordsContext = createContext<WordsContextType>({} as WordsContextType);