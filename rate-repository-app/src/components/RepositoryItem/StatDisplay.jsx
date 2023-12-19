import { View } from 'react-native';
import { Text } from '../Typography';

const StatDisplay = (props) => {
    const { number, text } = props;
    const prettifyNumber = (number) => {
        if (number < 1000) {
            return number.toString();
        }
        const thousands = Math.floor(number / 1000);
        const remainder = ((number % 1000) / 100).toFixed(0);
        if (remainder > 0) {
            return `${thousands},${remainder} k`;
        }
        return `${thousands}k`;
    };
    return (
        <View style={{ alignItems: 'center' }}>
            <Text fontWeight='bold'>{prettifyNumber(number)}</Text>
            <Text>{text}</Text>
        </View>
    );
};

export default StatDisplay;
