import React, {useContext} from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

export default function Login() {
    const {globalState} = useContext(AuthContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (globalState.isAuthenticated) {
            navigate("/")
        }
    })
    return (
        <>
            <LoginForm />
        </>
    )
}