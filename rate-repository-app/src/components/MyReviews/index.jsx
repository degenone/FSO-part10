import { FlatList } from 'react-native';
import ReviewItem from '../ReviewItem';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import ItemSeparator from '../ItemSeparator';

const MyReviews = () => {
    const { data, loading } = useQuery(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network',
    });
    const reviews =
        !loading && data?.me.reviews
            ? data.me.reviews.edges.map((e) => e.node)
            : [];
    return (
        <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <ReviewItem review={item} isCreator={true} />
            )}
        />
    );
};

export default MyReviews;
