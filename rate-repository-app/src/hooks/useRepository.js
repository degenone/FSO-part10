import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries';

const useRepository = (repositoryId) => {
    const { data, loading, error, refetch, fetchMore } = useQuery(GET_REPO, {
        variables: { repositoryId, first: 7 },
        fetchPolicy: 'cache-and-network',
    });
    const repository = data?.repository;
    const handleFetchMore = () => {
        if (!loading && !repository.reviews.pageInfo.hasNextPage) {
            return;
        }
        fetchMore({
            variables: { after: repository.reviews.pageInfo.endCursor },
        });
    };
    return { repository, loading, error, refetch, fetchMore: handleFetchMore };
};

export default useRepository;
