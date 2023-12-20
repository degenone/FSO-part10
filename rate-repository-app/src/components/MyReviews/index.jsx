import { FlatList } from 'react-native';
import ReviewItem from '../ReviewItem';
import ItemSeparator from '../ItemSeparator';
import useCurrentUser from '../../hooks/useCurrentUser';

const MyReviews = () => {
    const { user, loading, refetch } = useCurrentUser({ includeReviews: true });
    const reviews =
        !loading && user?.reviews ? user.reviews.edges.map((e) => e.node) : [];
    return (
        <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <ReviewItem review={item} isCreator={true} refetch={refetch} />
            )}
        />
    );
};

export default MyReviews;
