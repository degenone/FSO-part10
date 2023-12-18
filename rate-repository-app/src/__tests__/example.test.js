import { render, screen, fireEvent } from '@testing-library/react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

describe('Example', () => {
    it('works', () => expect(1).toBe(1));
});

const Greeting = ({ name }) => {
    return (
        <View>
            <Text>Hello {name}!</Text>
        </View>
    );
};

describe('Greeting', () => {
    it('renders greeting message correctly', () => {
        render(<Greeting name='Tero' />);
        screen.debug();
        expect(screen.getByText('Hello Tero!')).toBeDefined();
    });
});

const Form = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => onSubmit({ username, password });

    return (
        <View>
            <View>
                <TextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder='Username'
                />
            </View>
            <View>
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                />
            </View>
            <View>
                <Pressable onPress={handleSubmit}>
                    <Text>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
};

describe('Form', () => {
    it('calls onSubmit function correctly', () => {
        const onSubmit = jest.fn();
        render(<Form onSubmit={onSubmit} />);
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Tero');
        fireEvent.changeText(
            screen.getByPlaceholderText('Password'),
            'salasanA123'
        );
        fireEvent.press(screen.getByText('Submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'Tero',
            password: 'salasanA123',
        });
    });
});
