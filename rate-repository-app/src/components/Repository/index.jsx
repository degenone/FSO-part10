import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import { useParams } from 'react-router';
import { Heading } from '../Typography';
import { FlatList } from 'react-native';
import ReviewItem from '../ReviewItem';
import ItemSeparator from '../ItemSeparator';

const Repository = () => {
    const { repoId } = useParams();
    const { repository, loading, error, fetchMore } = useRepository(repoId);
    if (loading) {
        return <Heading>Loading repository...</Heading>;
    }
    if (error) {
        return <Heading>Error: {error.message}</Heading>;
    }
    const reviews = repository.reviews
        ? repository.reviews.edges.map((e) => e.node)
        : [];
    const onEndReached = () => {
        fetchMore();
    };
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={<RepositoryItem repo={repository} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
};

export default Repository;
