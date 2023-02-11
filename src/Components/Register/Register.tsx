import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

type Props = {}

export default function Register({}: Props) {
    const {globalState} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (globalState.isAuthenticated) {
            navigate("/");
        }
    }, [globalState.isAuthenticated])
    return (
        <>
            <RegisterForm />
        </>
    )
}