import { FlatList, Pressable, StyleSheet } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import { Heading } from '../Typography';
import { useNavigate } from 'react-router';
import ItemSeparator from '../ItemSeparator';
import theme from '../../theme';

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        marginTop: 20,
    },
    error: {
        color: theme.colors.error,
    },
});

const RepositoryListContainer = (props) => {
    const { repositories, loading, error, onEndReached } = props;
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
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryListContainer;
