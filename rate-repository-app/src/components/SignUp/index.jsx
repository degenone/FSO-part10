import useSingUp from '../../hooks/useSignUp';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SignUpContainer from './SignUpContainer';
import useSignIn from '../../hooks/useSignIn';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const SignUp = () => {
    const [signUp] = useSingUp();
    const [signIn] = useSignIn();
    const [errorMessage, setErrorMessage] = useState('');
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signUp(username, password);
            const result = await signIn(username, password);
            const {
                data: {
                    authenticate: { accessToken, expiresAt },
                },
            } = result;
            await authStorage.setAccessToken(accessToken, expiresAt);
            apolloClient.resetStore();
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    return <SignUpContainer onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default SignUp;
