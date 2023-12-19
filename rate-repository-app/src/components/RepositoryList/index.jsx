import { StyleSheet, View } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import SortByPicker from './SortByPicker';
import RepositoryListContainer from './RepositoryListContainer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const RepositoryList = () => {
    const { repositories, loading, error, refetch } = useRepositories();
    const onValueChange = (orderBy) => {
        switch (orderBy) {
            case '':
                refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
                break;
            case 'ratingDesc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
                break;
            case 'ratingAsc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
                break;
            default:
                throw new Error(`Uknown orderBy value: '${orderBy}'`);
        }
    };
    return (
        <View style={styles.container}>
            <SortByPicker onValueChange={onValueChange} />
            <RepositoryListContainer
                repositories={repositories}
                loading={loading}
                error={error}
            />
        </View>
    );
};

export default RepositoryList;
