import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading, error, refetch, fetchMore } = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
        variables: { first: 6 },
    });
    const repositories = data?.repositories;
    const handleFetchMore = () => {
        if (!loading && !repositories.pageInfo.hasNextPage) {
            return;
        }
        fetchMore({
            variables: { after: repositories.pageInfo.endCursor },
        });
    };
    return {
        repositories,
        loading,
        error,
        refetch,
        fetchMore: handleFetchMore,
    };
};

export default useRepositories;
