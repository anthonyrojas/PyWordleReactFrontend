import React, {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';
import {
    refreshUserToken
} from '../Actions/AuthActions'
import { useNavigate } from 'react-router-dom';

type Props = React.PropsWithChildren

export default function AuthenticatedRoute({children}: Props) {
    const navigate = useNavigate();
    const {dispatch, globalState} = useContext(AuthContext);
    React.useEffect(() => {
        const nowEpoch = new Date(Date.now()).getTime() / 1000;
        if (localStorage.getItem("acessExpiresAt") !== null && nowEpoch < Number(localStorage.getItem("accessExpiresAt"))) {
            // force a refresh
            refreshUserToken(dispatch);
        }
        const refreshInterval = setInterval(() => {
            console.log("Refreshing token")
            refreshUserToken(dispatch);
        }, 3000 * 1000);
        return (() => {
            clearInterval(refreshInterval);
        });
    }, []);
    React.useEffect(() => {
        if (!globalState.isAuthenticated) {
            navigate("/login")
        }
    }, [globalState.isAuthenticated])
    return (
        <>
            {children}
        </>
    )
}