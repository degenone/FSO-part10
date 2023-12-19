import { TextInput as NativeTextInput } from 'react-native';

const TextInput = (props) => {
    const { style, ...rest } = props;
    const textInputStype = [style];
    return <NativeTextInput style={textInputStype} {...rest} />;
};

export default TextInput;
