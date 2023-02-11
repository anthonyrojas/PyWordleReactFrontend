import React from "react";
import { 
    AuthActionTypes, 
    AuthReducerAction 
} from "../Reducers/AuthReducer";
import ApiClient from "../Utils/ApiClient";
import { NavigateFunction } from "react-router-dom";

type RegisterUserParams = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
export async function registerUser(params: RegisterUserParams, dispatch: React.Dispatch<AuthReducerAction>) {
    dispatch({
        type: AuthActionTypes.REGISTER_USER_INIT,
        payload: {
        }
    });
    try {
        const res = await ApiClient.post("/auth/register", {
            "username": params.username,
            "first_name": params.firstName,
            "last_name": params.lastName,
            "email": params.email,
            "password": params.password
        });
        const data = res.data;
        dispatch({
            type: AuthActionTypes.REGISTER_USER_SUCCESS,
            payload: {
                profile: {
                    Username: data.Username,
                    UserAttributes: data.UserAttributes
                }
            }
        });
    } catch (e: any) {
        console.error(e.response)
        dispatch({
            type: AuthActionTypes.REGISTER_USER_FAILURE,
            payload: {
                inErrorState: true,
                errorMessage: e.response.data.detail.Message
            }
        });
    }
}

type LoginUserParams = {
    username: string, 
    password: string
}
export async function loginUser(params: LoginUserParams, dispatch: React.Dispatch<AuthReducerAction>) {
    dispatch({
        type: AuthActionTypes.LOGIN_INIT,
        payload: {
            authenticating: true
        }
    });
    try{
        const res = await ApiClient.post("/auth/login", {
            "username": params.username,
            "password": params.password
        });
        const data = res.data.AuthResult;
        let accessExpiresAt = Math.round(Date.now() / 1000) + data.ExpiresIn - 60;
        localStorage.setItem("accessToken", data.AccessToken);
        localStorage.setItem("refreshToken", data.RefreshToken);
        localStorage.setItem("idToken", data.IdToken);
        localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
        dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: {
                authenticating: false,
                refreshToken: data.RefreshToken,
                accessToken: data.AccessToken,
                idToken: data.IdToken,
                accessExpiresAt: accessExpiresAt
            }
        });
    } catch (e: any) {
        console.error(e.response)
        dispatch({
            type: AuthActionTypes.LOGIN_FAILURE,
            payload: {
                authenticating: false,
                isAuthenticated: false,
                refreshToken: "",
                accessToken: "",
                idToken: "",
                accessExpiresAt: 0,
                isInErrorState: true,
                errorMessage: e.response.data.detail.Message
            }
        });
    }
}

export async function fetchUserProfile(dispatch: React.Dispatch<AuthReducerAction>) {
    dispatch({
        type: AuthActionTypes.FETCH_USER_PROFILE_INIT,
        payload: {
        }
    });
    try {
        const res = await ApiClient.get("/auth/user", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const data = res.data.UserInfo;
        dispatch({
            type: AuthActionTypes.FETCH_USER_PROFILE_SUCCESS,
            payload: {
                profile: {
                    Username: data.Username,
                    UserAttributes: data.UserAttributes
                }
            }
        });
    } catch (e: any) {
        console.error(e.response);
        dispatch({
            type: AuthActionTypes.FETCH_USER_PROFILE_FAILURE,
            payload: {
                errorMessage: e.response.data.detail.Message
            }
        })
    }
}

export async function refreshUserToken(dispatch: React.Dispatch<AuthReducerAction>) {
    dispatch({
        type: AuthActionTypes.REFRESH_INIT,
        payload: {
        }
    });
    try {
        const res = await ApiClient.post("/auth/refresh", {
            "refresh_token": localStorage.getItem("refreshToken"),
            "device_key": ""
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const data = res.data.AuthResult;
        let accessExpiresAt = Math.round(Date.now() / 1000) + data.ExpiresIn - 60;
        localStorage.setItem("accessToken", data.AccessToken);
        localStorage.setItem("idToken", data.IdToken);
        localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
        dispatch({
            type: AuthActionTypes.REFRESH_SUCCESS,
            payload: {
                accessToken: data.AccessToken,
                refreshToken: data.RefreshToken,
                idToken: data.IdToken,
                accessExpiresAt: accessExpiresAt
            }
        });
    } catch (e: any) {
        console.error(e.response)
        dispatch({
            type: AuthActionTypes.REFRESH_FAILURE,
            payload: {
                errorMessage: e.response.data.detail.Message
            }
        })
    }
}

export async function logoutUser(dispatch: React.Dispatch<AuthReducerAction>) {
    localStorage.clear();
    dispatch({
        type: AuthActionTypes.LOGOUT,
        payload: {}
    });
}