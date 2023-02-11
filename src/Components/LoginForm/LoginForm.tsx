import React, {useState, useContext} from 'react'
import ButtonSpinnerIcon from '../ButtonSpinnerIcon/ButtonSpinnerIcon';
import UsernameInput from '../UsernameInput/UsernameInput'
import PasswordInput from '../PasswordInput/PasswordInput';
import { AuthContext } from '../../Context/AuthContext';
import {
    loginUser,
    clearSuccessMessage
} from "../../Actions/AuthActions";
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import SuccessBanner from '../SuccessBanner/SuccessBanner';

type Props = {}

export default function LoginForm({}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {globalState, dispatch} = useContext(AuthContext);
    async function handleLogin() {
        // validate input
        if (username.trim().length <= 1) {
            return;
        }
        if (password.trim().length === 0) {
            return;
        }
        // send login request
        const loginParams = {
            username: username,
            password: password
        }
        await loginUser(loginParams, dispatch);
    }
    function handleClearSucessBanner() {
        clearSuccessMessage(dispatch);
    }
    return (
        <div className="w-full flex flex-row flex-wrap items-center justify-center min-h-screen content-center p-2">
            {
                globalState.inErrorState ?
                <ErrorBanner 
                    errorMessage={globalState.errorMessage}
                />
                :
                null
            }
            <SuccessBanner 
                successMessage={globalState.successMessage}
                clearMessage={handleClearSucessBanner}
            />
            <div className="w-full flex flex-col">
                <UsernameInput 
                    username={username} 
                    setUsername={setUsername} 
                    inputDisabled={globalState.authenticating}
                />
            </div>
            <div className='w-full flex flex-col'>
                <PasswordInput 
                    password={password} 
                    setPassword={setPassword} 
                    inputDisabled={globalState.authenticating}
                />
            </div>
            <div className='w-full flex flex-col items-center'>
                <button 
                    type="button"
                    className="button my-2 rounded-md p-2 bg-sky-400 text-white text-center inline-flex flex-row justify-center items-center"
                    onClick={handleLogin}
                    disabled={globalState.authenticating}
                >
                    <ButtonSpinnerIcon 
                        visible={globalState.authenticating} 
                    />
                    Login
                </button>
            </div>
            
        </div>
    )
}