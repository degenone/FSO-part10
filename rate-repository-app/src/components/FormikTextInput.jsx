import { useField } from 'formik';
import TextInput from './TextInput';
import { Text } from './Typography';

const FormikTextInput = (props) => {
    const { name, ...rest } = props;
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    return (
        <>
            <TextInput
                onTextChange={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...rest}
            />
            {showError && <Text>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
