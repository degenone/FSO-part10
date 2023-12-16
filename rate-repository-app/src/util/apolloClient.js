import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.apolloUri,
});

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const obj = await authStorage.getAccessToken();
            return {
                headers: {
                    ...headers,
                    authorization: obj?.accessToken
                        ? `Bearer: ${obj.accessToken}`
                        : '',
                },
            };
        } catch (error) {
            console.log('error: ', error);
            return { headers };
        }
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
