import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Text } from '../Typography';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';

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

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, 'Username must be at least 4 characters long.')
        .required('Username is required.'),
    password: yup
        .string()
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Password must be at least 8 characters long, contain 1 uppercase and lowercase letter, and 1 number character.'
        )
        .required('Password is required.'),
});

const SignIn = () => {
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const result = await signIn(username, password);
            const {
                data: {
                    authenticate: { accessToken, expiresAt },
                },
            } = result;
            console.log(accessToken, expiresAt);
        } catch (error) {
            console.log('error:', error);
        }
    };
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
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
