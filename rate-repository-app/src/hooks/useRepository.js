import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries';

const useRepository = (repositoryId) => {
    const { data, loading, error, refetch } = useQuery(GET_REPO, {
        variables: { repositoryId },
        fetchPolicy: 'cache-and-network',
    });
    const repository = data?.repository;
    return { repository, loading, error, refetch };
};

export default useRepository;
