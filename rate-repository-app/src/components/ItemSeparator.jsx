import { StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: theme.colors.primary,
        marginVertical: 4,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
