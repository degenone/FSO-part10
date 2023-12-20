import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Typography';
import theme from '../../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    flexRow: {
        flexDirection: 'row',
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
    actions: {
        paddingHorizontal: 10,
    },
    btnContainer: {
        flex: 1,
    },
    btn: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.light,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        textAlign: 'center',
    },
    btnDelete: {
        backgroundColor: theme.colors.error,
    },
    me: { marginEnd: 5 },
    ms: { marginStart: 5 },
});

const ReviewItem = (props) => {
    const { review, isCreator, refetch } = props;
    const date = new Date(Date.parse(review.createdAt));
    const navitage = useNavigate();
    const deleteReview = useDeleteReview(refetch);
    const handleDeleteClick = () => {
        Alert.alert(
            'Delete review',
            `Are you sure you want to delete this review of '${review.repository.fullName}'?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => deleteReview(review.id),
                },
            ]
        );
    };
    const handeViewClick = () => navitage(`/${review.repositoryId}`);
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.rating}>
                    <Text color='primary' fontWeight='bold'>
                        {review.rating}
                    </Text>
                </View>
                <View style={styles.details}>
                    <Text fontWeight='bold'>
                        {!isCreator
                            ? review.user.username
                            : review.repository.fullName}
                    </Text>
                    <Text color='textSecondary'>
                        {format(date, 'dd.MM.yyyy')}
                    </Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            {isCreator && (
                <View style={[styles.flexRow, styles.actions]}>
                    <Pressable
                        style={[styles.btnContainer, styles.me]}
                        onPress={handeViewClick}>
                        <Text fontWeight='bold' style={styles.btn}>
                            View repository
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btnContainer, styles.ms]}
                        onPress={handleDeleteClick}>
                        <Text
                            fontWeight='bold'
                            style={[styles.btn, styles.btnDelete]}>
                            Delete review
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default ReviewItem;
