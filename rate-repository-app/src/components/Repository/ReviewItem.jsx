import { StyleSheet, View } from 'react-native';
import { Text } from '../Typography';
import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    rating: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.primary,
        borderWidth: 3,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    details: {
        marginEnd: 10,
        flexShrink: 1,
        alignItems: 'baseline',
    },
});

const ReviewItem = (props) => {
    const { review } = props;
    const date = new Date(Date.parse(review.createdAt));
    return (
        <View style={styles.container}>
            <View style={styles.rating}>
                <Text color='primary' fontWeight='bold'>
                    {review.rating}
                </Text>
            </View>
            <View style={styles.details}>
                <Text fontWeight='bold'>{review.user.username}</Text>
                <Text color='textSecondary'>{format(date, 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem;
