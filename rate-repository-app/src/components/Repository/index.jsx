import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryList/RepositoryItem';
import { useParams } from 'react-router';
import { Heading } from '../Typography';

const Repository = () => {
    const { repoId } = useParams();
    const { repository, loading, error } = useRepository(repoId);
    if (loading) {
        return <Heading>Loading repository...</Heading>;
    }
    if (error) {
        return <Heading>Error: {error.message}</Heading>;
    }
    return <RepositoryItem repo={repository} />;
};

export default Repository;
