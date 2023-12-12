import { Pressable, StyleSheet } from 'react-native';
import { Heading } from './Typography';
import theme from '../theme';

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
    const { text } = props;
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
            <Heading>{text}</Heading>
        </Pressable>
    );
};

export default AppBarTab;
