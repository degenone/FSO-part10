import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import useRepositories from '../../hooks/useRepositories';
import { Heading } from '../Typography';

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: theme.colors.primary,
        marginVertical: 4,
    },
    heading: {
        textAlign: 'center',
        marginTop: 20,
    },
    error: {
        color: theme.colors.error,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();
    if (error) {
        return (
            <Heading style={[styles.heading, styles.error]}>
                {error.graphQLErrors.map((e) => e.message).join(', ')}
            </Heading>
        );
    }
    if (loading) {
        return (
            <Heading style={styles.heading}>Loading repositories...</Heading>
        );
    }
    const repositoryNodes = repositories
        ? repositories.edges.map((e) => e.node)
        : [];
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem repo={item} />}
            keyExtractor={(repo) => repo.id}
        />
    );
};

export default RepositoryList;
