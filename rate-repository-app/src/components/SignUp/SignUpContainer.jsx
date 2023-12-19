import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Typography';
import { Formik } from 'formik';
import FormikTextInput from '../FormikTextInput';
import * as yup from 'yup';
import theme from '../../theme';

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
        .min(5, 'Username must be at least 5 characters long.')
        .max(30, 'Username can not be longer than 30 characters.')
        .required('Username is required.'),
    password: yup
        .string()
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,30}$/,
            'Password must be 5-30 characters long, contain 1 uppercase and lowercase letter, and 1 number character.'
        )
        .required('Password is required.'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match.')
        .required('Password confirm is required'),
});

const SignUpContainer = (props) => {
    const { onSubmit, errorMessage } = props;
    return (
        <View>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <View style={styles.container}>
                        <FormikTextInput
                            name='username'
                            placeholder='Username'
                        />
                        <FormikTextInput
                            name='password'
                            placeholder='Password'
                            secureTextEntry
                        />
                        <FormikTextInput
                            name='passwordConfirm'
                            placeholder='Confirm password'
                            secureTextEntry
                        />
                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.btn}>Sign up</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
            {errorMessage && (
                <Heading color='error' style={styles.container}>
                    Error occured: {errorMessage}
                </Heading>
            )}
        </View>
    );
};

export default SignUpContainer;
