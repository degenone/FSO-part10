import { useField } from 'formik';
import TextInput from './TextInput';
import { Text } from '../Typography';
import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    input: {
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: theme.colors.textSecondary,
        borderRadius: 5,
    },
    inputErrorBorder: { borderColor: theme.colors.error },
    error: {
        color: theme.colors.error,
        marginVertical: 5,
    },
});

const FormikTextInput = (props) => {
    const { name, ...rest } = props;
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    const inputStyle = [styles.input, showError && styles.inputErrorBorder];
    return (
        <>
            <TextInput
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={inputStyle}
                {...rest}
            />
            {showError && <Text style={styles.error}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
