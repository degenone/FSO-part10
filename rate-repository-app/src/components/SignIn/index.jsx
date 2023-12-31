import useSignIn from '../../hooks/useSignIn';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SignInContainer from './SignInContainer';

const SignIn = () => {
    const [signIn] = useSignIn();
    const [errorMessage, setErrorMessage] = useState('');
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
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
    return <SignInContainer onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default SignIn;
