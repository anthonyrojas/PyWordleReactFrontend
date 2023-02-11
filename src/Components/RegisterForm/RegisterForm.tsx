import React, {useState, useContext} from 'react'
import UsernameInput from '../UsernameInput/UsernameInput'
import { AuthContext } from '../../Context/AuthContext';
import EmailInput from '../EmailInput/EmailInput';
import FirstNameInput from '../FirstNameInput/FirstNameInput';
import LastNameInput from '../LastNameInput/LastNameInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import ButtonSpinnerIcon from '../ButtonSpinnerIcon/ButtonSpinnerIcon';
import { registerUser } from '../../Actions/AuthActions';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function RegisterForm({}: Props) {
    const {globalState, dispatch} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const inputContainerClassName = "w-full flex flex-col";
    const navigate = useNavigate();
    async function handleRegisterClick() {
        //validate input
        if (username.trim().length <= 5) {
            // username should be at least 5 characters
            return;
        }
        if (password.trim().length < 8) {
            //password should be at least 8 characters long
            return;
        }
        if (firstName.trim().length === 0) {
            //first name cannot be empty
            return;
        }
        if (lastName.trim().length === 0) {
            //last name cannot be empty
            return;
        }
        if (email.trim().length === 0 && validateEmail(email)) {
            //email cannot be empty
            return;
        }
        await registerUser({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        }, dispatch, navigate)
    }
    function validateEmail(email: string) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
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
                    onClick={handleRegisterClick}
                >
                    <ButtonSpinnerIcon 
                        visible={globalState.signingUp} 
                    />
                    Register
                </button>
            </div>
            {
                globalState.inErrorState ? 
                <div className='w-full flex flex-col items-center'>
                    <ErrorBanner 
                        errorMessage={globalState.errorMessage}
                    />
                </div>
                :
                null
            }
        </div>
    )
}
