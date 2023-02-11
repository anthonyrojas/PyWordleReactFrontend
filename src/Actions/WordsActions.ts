import React from "react";
import {
    WordsActionTypes,
    WordsReducerAction
} from "../Reducers/WordsReducer";
import ApiClient from "../Utils/ApiClient";

export async function changeWordAttempts(wordAttempts: string[][],  dispatch: React.Dispatch<WordsReducerAction>) {
    // validate every row has only alpha characters
    for(let wordAttempt in wordAttempts) {
        if (/^[a-zA-Z]+$/.test(wordAttempt)) {
            return;
        }
    }
    dispatch({
        type: WordsActionTypes.WORD_ATTEMPT_INPUT_CHANGED,
        payload: {
            wordAttempts: wordAttempts
        }
    });
}

export async function submitWordAttempt(wordAttempt: string, dispatch: React.Dispatch<WordsReducerAction>) {
    dispatch({
        type: WordsActionTypes.SUBMIT_WORD_ATTEMPT_INIT,
        payload: {
        }
    });
    try {
        // make submission via api call
        const res = await ApiClient.put("/word/check-word", {
            "word": wordAttempt
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const data = res.data;
        dispatch({
            type: WordsActionTypes.SUBMIT_WORD_ATTEMPT_SUCCESS,
            payload: {
                correctLetters: data.CorrectLetters,
                misplacedLetters: data.MisplacedLetters,
                wonGame: data.Win
            }  
        })
    } catch(e: any) {
        console.error(e.response);
        if (!e.response) {
            dispatch({
                type: WordsActionTypes.SUBMIT_WORD_ATTEMPT_FAILURE,
                payload: {
                    errorMessage: "Service is unavailable."
                }
            })
        } else {
            dispatch({
                type: WordsActionTypes.SUBMIT_WORD_ATTEMPT_FAILURE,
                payload: {
                    errorMessage: e.response.data.detail.Message
                }
            })
        }
    }
}

export async function getGameTurns(date: Date, dispatch: React.Dispatch<WordsReducerAction>) {
    dispatch({
        type: WordsActionTypes.GET_GAME_TURNS_INIT,
        payload: {
        }
    });
    try {
        const res = await ApiClient.get(`/word/game-attempts/${date}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const data = res.data;
        dispatch({
            type: WordsActionTypes.GET_GAME_TURNS_SUCCESS,
            payload: {
                gameTurns: res.data.GameTurns
            }
        });
    } catch (e: any) {
        console.error(e.response);
        dispatch({
            type: WordsActionTypes.GET_GAME_TURNS_FAILURE,
            payload: {
                errorMessage: e.response.data.detail.Message
            }
        });
    }
}

type UserGameAttempsParams = {
    lastTimestamp: number;
}
export async function getUserGameAttempts(params: UserGameAttempsParams, dispatch: React.Dispatch<WordsReducerAction>) {
    dispatch({
        type: WordsActionTypes.GET_GAME_ATTEMPTS_INIT,
        payload: {}
    });
    try {
        const res = await ApiClient.get(`/user-game-attempts?last_timestamp=${params.lastTimestamp}`, {
            headers: {
                "Authorization": localStorage.getItem("accessToken")
            }
        });
        const data = res.data;
        dispatch({
            type: WordsActionTypes.GET_GAME_ATTEMPTS_SUCCESS,
            payload: {
                gameUserAttempts: data.GameTurns,
                gameUserAttemptsCount: Number(data.Count),
                gameUserPaginationKey: data.LastEvaluatedKey
            }
        });
    } catch (e: any) {
        console.error(e.response)
        dispatch({
            type: WordsActionTypes.GET_GAME_ATTEMPTS_FAILURE,
            payload: {
                errorMessage: e.response.data.detail.Message
            }
        });
    }
}