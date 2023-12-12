import { Text, View } from 'react-native';

const RepositoryItem = (props) => {
    const { repo } = props;
    return (
        <View>
            <Text>Full name: {repo.fullName}</Text>
            <Text>Description: {repo.description}</Text>
            <Text>Language: {repo.language}</Text>
            <Text>Forks: {repo.forksCount}</Text>
            <Text>Stars: {repo.stargazersCount}</Text>
            <Text>Rating: {repo.ratingAverage}</Text>
            <Text>Reviews: {repo.reviewCount}</Text>
        </View>
    );
};

export default RepositoryItem;
