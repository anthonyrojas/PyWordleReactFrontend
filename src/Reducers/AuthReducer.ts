import UserProfile from "../Models/UserProfile"
export type AuthState = {
    authenticating: boolean;
    isAuthenticated: boolean;
    inErrorState: boolean;
    successMessage: string;
    errorMessage: string;
    profile: UserProfile|null;
    signingUp: boolean;
    fetchingUser: boolean;
    refreshing: boolean;
}
export const initialState: AuthState = {
    authenticating: false,
    isAuthenticated: localStorage.getItem("accessToken") !== null,
    inErrorState: false,
    successMessage: "",
    errorMessage: "",
    profile: null,
    signingUp: false,
    fetchingUser: false,
    refreshing: false,
}
export enum AuthActionTypes {
    LOGIN_INIT="LOGIN_INIT",
    LOGIN_SUCCESS="LOGIN_SUCCESS",
    LOGIN_FAILURE="LOGIN_FAILURE",
    REFRESH_INIT="REFRESH_INIT",
    REFRESH_SUCCESS="REFRESH_SUCCESS",
    REFRESH_FAILURE="REFRESH_FAILURE",
    FETCH_USER_PROFILE_INIT="FETCH_USER_PROFILE_INIT",
    FETCH_USER_PROFILE_SUCCESS="FETCH_USER_PROFILE_SUCCESS",
    FETCH_USER_PROFILE_FAILURE="FETCH_USER_PROFILE_FAILURE",
    REGISTER_USER_INIT="REGISTER_USER_INIT",
    REGISTER_USER_FAILURE="REGISTER_USER_FAILURE",
    REGISTER_USER_SUCCESS="REGISTER_USER_SUCCESS",
    LOGOUT="LOGOUT",
    CLEAR_SUCCESS_MESSAGE="CLEAR_SUCCESS_MESSAGE",
}
export type AuthReducerAction = {
    type: AuthActionTypes,
    payload: any
}

export const AuthReducer = (state: AuthState = initialState, action: AuthReducerAction): AuthState => {
    switch(action.type) {
        case AuthActionTypes.LOGIN_INIT:
            return {
                ...state,
                authenticating: true,
                inErrorState: false,
                errorMessage: ""
            }
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                isAuthenticated: true,
            }
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                authenticating: false,
                isAuthenticated: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage,
            }
        case AuthActionTypes.REFRESH_INIT:
            return {
                ...state,
                refreshing: true,
                inErrorState: false,
                errorMessage: ""
            }
        case AuthActionTypes.REFRESH_SUCCESS:
            return {
                ...state,
                refreshing: false,
                inErrorState: false,
                errorMessage: "",
            }
        case AuthActionTypes.REFRESH_FAILURE:
            return {
                ...state,
                refreshing: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage
            }
        case AuthActionTypes.FETCH_USER_PROFILE_INIT:
            return {
                ...state,
                inErrorState: false,
                errorMessage: "",
                fetchingUser: true
            }
        case AuthActionTypes.FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload.profile,
                fetchingUser: false,
                inErrorState: false,
                errorMessage: ""
            }
        case AuthActionTypes.FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                fetchingUser: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage
            }
        case AuthActionTypes.REGISTER_USER_INIT:
            return {
                ...state,
                signingUp: true
            }
        case AuthActionTypes.REGISTER_USER_FAILURE:
            return {
                ...state,
                signingUp: false,
                inErrorState: true,
                errorMessage: action.payload.errorMessage
            }
        case AuthActionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                signingUp: false,
                inErrorState: false,
                errorMessage: action.payload.errorMessage,
                successMessage: action.payload.successMessage
            }
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: "",
                inErrorState: false,
                profile: null
            }
        case AuthActionTypes.CLEAR_SUCCESS_MESSAGE:
            return{
                ...state,
                successMessage: ""
            }
        default: return state
    }
}