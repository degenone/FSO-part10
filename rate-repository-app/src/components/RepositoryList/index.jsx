import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import useRepositories from '../../hooks/useRepositories';
import { Heading } from '../Typography';
import { useNavigate } from 'react-router';

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

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = (props) => {
    const { repositories, loading, error } = props;
    const navitage = useNavigate();
    if (error) {
        return (
            <Heading style={[styles.heading, styles.error]}>
                {error.message}
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
            renderItem={({ item }) => {
                return (
                    <Pressable onPress={() => navitage(`/${item.id}`)}>
                        <RepositoryItem repo={item} />
                    </Pressable>
                );
            }}
            keyExtractor={(repo) => repo.id}
        />
    );
};

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();
    return (
        <RepositoryListContainer
            repositories={repositories}
            loading={loading}
            error={error}
        />
    );
};

export default RepositoryList;
