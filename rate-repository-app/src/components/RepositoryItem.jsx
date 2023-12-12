import { View } from 'react-native';
import { Subheading, Text } from './Typography';

const RepositoryItem = (props) => {
    const { repo } = props;
    return (
        <View>
            <Subheading color='primary'>Full name: {repo.fullName}</Subheading>
            <Text color='textSecondary'>Description: {repo.description}</Text>
            <Text>Language: {repo.language}</Text>
            <Text>Forks: {repo.forksCount}</Text>
            <Text>Stars: {repo.stargazersCount}</Text>
            <Text>Rating: {repo.ratingAverage}</Text>
            <Text>Reviews: {repo.reviewCount}</Text>
        </View>
    );
};

export default RepositoryItem;
