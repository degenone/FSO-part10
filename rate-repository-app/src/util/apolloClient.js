import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.apolloUri,
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            },
        },
        Repository: {
            fields: {
                reviews: relayStylePagination(),
            },
        },
    },
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
        cache,
    });
};

export default createApolloClient;
