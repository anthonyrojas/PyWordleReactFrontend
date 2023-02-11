import React, {useState, useContext} from 'react'
import UsernameInput from '../UsernameInput/UsernameInput'
import { AuthContext } from '../../Context/AuthContext';
import EmailInput from '../EmailInput/EmailInput';
import FirstNameInput from '../FirstNameInput/FirstNameInput';
import LastNameInput from '../LastNameInput/LastNameInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import ButtonSpinnerIcon from '../ButtonSpinnerIcon/ButtonSpinnerIcon';

type Props = {}

export default function RegisterForm({}: Props) {
    const {globalState, dispatch} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const inputContainerClassName = "w-full flex flex-col";
    return (
        <div className="w-full flex flex-row flex-wrap items-center justify-center min-h-screen content-center p-2">
            <div className="w-full flex flex-col text-center text-white">
                <h1 className="text-lg font-bold">
                    Register
                </h1>
                <p>Register to start playing.</p>
            </div>
            <div className={inputContainerClassName}>
                <UsernameInput 
                    username={username}
                    setUsername={setUsername}
                    inputDisabled={globalState.signingUp}
                />
            </div>
            <div className={inputContainerClassName}>
                <EmailInput 
                    email={email}
                    setEmail={setEmail}
                    inputDisabled={globalState.signingUp}
                />
            </div>
            <div className={inputContainerClassName}>
                <FirstNameInput 
                    firstName={firstName}
                    setFirstName={setFirstName}
                    inputDisabled={globalState.signingUp}
                />
            </div>
            <div className={inputContainerClassName}>
                <LastNameInput 
                    lastName={lastName}
                    setLastName={setLastName}
                    inputDisabled={globalState.signingUp}
                />
            </div>
            <div className={inputContainerClassName}>
                <PasswordInput 
                    password={password}
                    setPassword={setPassword}
                    inputDisabled={globalState.signingUp}
                />
            </div>
            <div className='w-full flex flex-col items-center'>                
                <button 
                    type="button"
                    className="button my-2 rounded-md p-2 bg-sky-400 text-white text-center inline-flex flex-row justify-center items-center"
                    disabled={globalState.signingUp}
                >
                    <ButtonSpinnerIcon 
                        visible={globalState.signingUp} 
                    />
                    Login
                </button>
            </div>
        </div>
    )
}