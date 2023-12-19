import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    faded: { color: theme.colors.textSecondary },
});

const SortByPicker = (props) => {
    const [orderBy, setOrderBy] = useState('');
    const { onValueChange } = props;
    return (
        <View>
            <Picker
                selectedValue={orderBy}
                onValueChange={(itemValue) => {
                    onValueChange(itemValue);
                    setOrderBy(itemValue);
                }}>
                <Picker.Item
                    label='Select the order of repositories...'
                    enabled={false}
                    style={styles.faded}
                />
                <Picker.Item label='Latest repositories' value='' />
                <Picker.Item
                    label='Highest rated repositories'
                    value='ratingDesc'
                />
                <Picker.Item
                    label='Lowest rated repositories'
                    value='ratingAsc'
                />
            </Picker>
        </View>
    );
};

export default SortByPicker;
