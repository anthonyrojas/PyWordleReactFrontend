import GameTurn from "../Models/GameTurn";
export type WordsState = {
    submittingAttempt: boolean;
    wonGame: boolean;
    inErrorState: boolean;
    errorMessage: string;
    activeRow: number;
    wordAttempts: string[][];
    correctLetters: number[][];
    misplacedLetters: number[][];
    fetchingGameUserAttempts: boolean;
    gameTurns: GameTurn[];
    gameUserAttempts: GameTurn[];
    gameUserAttemptsCount: number;
    gameUserPaginationKey: Record<string, string>;
};

export const initialState: WordsState = {
    activeRow: 0,
    submittingAttempt: false,
    wonGame: false,
    inErrorState: false,
    errorMessage: "",
    wordAttempts: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ],
    correctLetters: [
    ],
    misplacedLetters: [
    ],
    fetchingGameUserAttempts: false,
    gameTurns: [],
    gameUserAttempts: [],
    gameUserAttemptsCount: 0,
    gameUserPaginationKey: {}
}

export enum WordsActionTypes {
    WORD_ATTEMPT_INPUT_CHANGED="WORD_ATTEMPT_INPUT_CHANGED",
    SUBMIT_WORD_ATTEMPT_INIT="SUBMIT_WORD_ATTEMPT_INIT",
    SUBMIT_WORD_ATTEMPT_SUCCESS="SUBMIT_WORD_ATTEMPT_SUCCESS",
    SUBMIT_WORD_ATTEMPT_FAILURE="SUBMIT_WORD_ATTEMPT_FAILURE",
    GET_GAME_TURNS_INIT="GET_GAME_TURNS_INIT",
    GET_GAME_TURNS_SUCCESS="GET_GAME_TURNS_SUCCESS",
    GET_GAME_TURNS_FAILURE="GET_GAME_TURNS_FAILURE",
    GET_GAME_ATTEMPTS_INIT="GET_GAME_ATTEMPTS_INIT",
    GET_GAME_ATTEMPTS_SUCCESS="GET_GAME_ATTEMPTS_SUCCESS",
    GET_GAME_ATTEMPTS_FAILURE="GET_GAME_ATTEMPTS_FAILURE"
}

export type WordsReducerAction = {
    type: WordsActionTypes,
    payload: any
};

export const WordsReducer = (state: WordsState = initialState, action: WordsReducerAction): WordsState => {
    switch(action.type) {
        case WordsActionTypes.GET_GAME_ATTEMPTS_INIT:
            return {
                ...state,
                fetchingGameUserAttempts: true,
                inErrorState: false,
                errorMessage: "",
            }
        case WordsActionTypes.GET_GAME_ATTEMPTS_FAILURE:
            return {
                ...state,
                fetchingGameUserAttempts: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage
            }
        case WordsActionTypes.GET_GAME_ATTEMPTS_SUCCESS:
            return {
                ...state,
                fetchingGameUserAttempts: false,
                inErrorState: false,
                errorMessage: "",
                gameUserAttempts: action.payload.gameUserAttempts,
                gameUserAttemptsCount: action.payload.gameUserAttemptsCount,
                gameUserPaginationKey: action.payload.gameUserPaginationKey
            }
        case WordsActionTypes.SUBMIT_WORD_ATTEMPT_INIT:
            return {
                ...state,
                submittingAttempt: true,
                errorMessage: "",
                inErrorState: false,
            }
        case WordsActionTypes.SUBMIT_WORD_ATTEMPT_SUCCESS:
            return {
                ...state,
                submittingAttempt: false,
                wonGame: action.payload.wonGame,
                correctLetters: [
                    ...state.correctLetters, 
                    [...action.payload.correctLetters]
                ],
                misplacedLetters: [
                    ...state.misplacedLetters,
                    [...action.payload.misplacedLetters]
                ],
                activeRow: state.activeRow + 1
            }
        case WordsActionTypes.SUBMIT_WORD_ATTEMPT_FAILURE:
            return {
                ...state,
                submittingAttempt: false,
                errorMessage: action.payload.errorMessage,
                inErrorState: true,
            }
        case WordsActionTypes.GET_GAME_TURNS_INIT:
            return {
                ...state,
                fetchingGameUserAttempts: true,
                inErrorState: false,
                errorMessage: "",
                gameTurns: [],
            }
        case WordsActionTypes.GET_GAME_TURNS_FAILURE:
            return {
                ...state,
                fetchingGameUserAttempts: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage
            }
        case WordsActionTypes.GET_GAME_TURNS_SUCCESS:
            return {
                ...state,
                fetchingGameUserAttempts: false,
                errorMessage: "",
                inErrorState: false,
                gameTurns: action.payload.gameTurns
            }
        case WordsActionTypes.WORD_ATTEMPT_INPUT_CHANGED:
            return {
                ...state,
                wordAttempts: [...action.payload.wordAttempts]
            }
        default: return state;
    }
}