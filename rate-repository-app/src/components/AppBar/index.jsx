import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useNavigate } from 'react-router';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        backgroundColor: theme.colors.hightlight,
        flexDirection: 'row',
    },
    pb5: { paddingBottom: 5 },
});

const AppBar = () => {
    const { data, loading } = useQuery(ME);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/');
    };
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.pb5}>
                <AppBarTab text='Repositories' navigateTo='/' />
                {!loading && data.me !== null ? (
                    <>
                        <AppBarTab
                            text='Create review'
                            navigateTo='/create-review'
                        />
                        <AppBarTab text='My reviews' navigateTo='/my-reviews' />
                        <AppBarTab
                            text={`Sign out (${data.me.username})`}
                            onPress={handleSignOut}
                        />
                    </>
                ) : (
                    <>
                        <AppBarTab text='Sing up' navigateTo='/sign-up' />
                        <AppBarTab text='Sign in' navigateTo='/sign-in' />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
