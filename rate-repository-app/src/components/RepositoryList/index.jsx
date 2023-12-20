import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import SortByPicker from './SortByPicker';
import RepositoryListContainer from './RepositoryListContainer';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import theme from '../../theme';
import { Text } from '../Typography';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: theme.colors.light,
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flexGrow: 1,
    },
});

const RepositoryList = () => {
    const { repositories, loading, error, refetch, fetchMore } =
        useRepositories();
    const inputRef = useRef();
    const [filterTerm, setFilterTerm] = useState('');
    const debounceFilterTerm = useDebouncedCallback(
        (value) => setFilterTerm(value),
        500
    );
    useEffect(() => {
        refetch({ searchKeyword: filterTerm });
    }, [filterTerm]);
    const onOrderValueChange = (orderBy) => {
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
    const clearFilter = () => {
        setFilterTerm('');
        inputRef.current.clear();
    };
    const onEndReached = () => {
        fetchMore();
    };
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    name='filterTerm'
                    placeholder='Filter repositories'
                    onChangeText={(text) => debounceFilterTerm(text)}
                />
                <Pressable onPress={clearFilter}>
                    <Text>X</Text>
                </Pressable>
            </View>
            <SortByPicker onValueChange={onOrderValueChange} />
            <RepositoryListContainer
                repositories={repositories}
                loading={loading}
                error={error}
                onEndReached={onEndReached}
            />
        </View>
    );
};

export default RepositoryList;
