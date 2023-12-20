import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useCurrentUser = (variables) => {
    const { data, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables,
    });
    const user = data?.me;
    return { user, loading, refetch };
};

export default useCurrentUser;
