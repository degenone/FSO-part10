import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading, error, refetch } = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
    });
    const repositories = data?.repositories;
    return { repositories, loading, error, refetch };
};

export default useRepositories;
