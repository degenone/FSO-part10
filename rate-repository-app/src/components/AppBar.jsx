import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.pb5}>
                <AppBarTab text='Repositories' navigateTo='/' />
                <AppBarTab text='Sign in' navigateTo='/sign-in' />
            </ScrollView>
        </View>
    );
};

export default AppBar;
