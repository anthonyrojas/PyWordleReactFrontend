import React, {createContext} from "react";
import { AuthReducerAction, AuthState } from "../Reducers/AuthReducer";

type AuthContextType = {
    globalState: AuthState,
    dispatch: React.Dispatch<AuthReducerAction>
};
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);