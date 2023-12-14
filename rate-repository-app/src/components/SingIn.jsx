import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Text } from './Typography';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingVertical: 5,
    },
    btn: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.light,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        textAlign: 'center',
    },
});

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <FormikTextInput name='username' placeholder='Username' />
                    <FormikTextInput
                        name='password'
                        placeholder='Password'
                        secureTextEntry
                    />
                    <Pressable onPress={handleSubmit}>
                        <Text style={styles.btn}>Sign In</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
};

export default SignIn;
