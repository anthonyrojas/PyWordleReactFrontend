import React, {useReducer, useEffect} from 'react'
import { AuthReducer, initialState as authInitialState } from '../Reducers/AuthReducer'
import { AuthContext } from '../Context/AuthContext'

const AuthProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [globalState, dispatch] = useReducer(AuthReducer,authInitialState);
    return (
        <AuthContext.Provider value={{globalState, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;