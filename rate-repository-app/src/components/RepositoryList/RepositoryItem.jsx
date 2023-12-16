import { Image, StyleSheet, View } from 'react-native';
import { Subheading, Text } from '../Typography';
import theme from '../../theme';
import StatDisplay from './StatDisplay';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    flexRow: { flexDirection: 'row' },
    spaceEvenly: { justifyContent: 'space-evenly' },
    mb5: { marginBottom: 5 },
    avatar: {
        width: 50,
        height: 50,
        marginEnd: 10,
        borderRadius: 5,
    },
    description: {
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.light,
        borderRadius: 5,
        padding: 5,
    },
});

const RepositoryItem = (props) => {
    const { repo } = props;
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Image
                    source={{ uri: repo.ownerAvatarUrl }}
                    style={styles.avatar}
                />
                <View style={styles.description}>
                    <Subheading color='primary' style={styles.mb5}>
                        {repo.fullName}
                    </Subheading>
                    <Text color='textSecondary' style={styles.mb5}>
                        {repo.description}
                    </Text>
                    <Text style={[styles.language, styles.mb5]}>
                        {repo.language}
                    </Text>
                </View>
            </View>
            <View style={[styles.flexRow, styles.spaceEvenly]}>
                <StatDisplay number={repo.forksCount} text='Forks' />
                <StatDisplay number={repo.stargazersCount} text='Stars' />
                <StatDisplay number={repo.ratingAverage} text='Rating' />
                <StatDisplay number={repo.reviewCount} text='Reviews' />
            </View>
        </View>
    );
};

export default RepositoryItem;
