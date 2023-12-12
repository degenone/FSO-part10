import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const style = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        backgroundColor: theme.colors.hightlight,
        flexDirection: 'row',
    },
});

const AppBar = () => {
    return (
        <View style={style.container}>
            <AppBarTab text='Repositories' />
        </View>
    );
};

export default AppBar;
