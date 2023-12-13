import { Pressable, StyleSheet } from 'react-native';
import { Heading } from './Typography';
import theme from '../theme';
import { Link } from 'react-router-native';

const style = StyleSheet.create({
    pressed: {
        backgroundColor: theme.colors.primary,
    },
    container: {
        borderRadius: 5,
        marginStart: 2,
        paddingHorizontal: 3,
    },
});

const AppBarTab = (props) => {
    const { text, navigateTo } = props;
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? style.pressed.backgroundColor
                        : 'transparent',
                },
                style.container,
            ]}>
            <Link to={navigateTo} underlayColor='#0366d6'>
                <Heading>{text}</Heading>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;
