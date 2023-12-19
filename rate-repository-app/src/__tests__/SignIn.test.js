import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';
import SignInContainer from '../components/SignIn/SignInContainer';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);
            const usernameInput = screen.getByPlaceholderText('Username');
            fireEvent.changeText(usernameInput, 'degenone');
            const passwordInput = screen.getByPlaceholderText('Password');
            fireEvent.changeText(passwordInput, 'salasanA123');
            fireEvent.press(screen.getByText('Sign In'));
            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'degenone',
                    password: 'salasanA123',
                });
            });
        });
    });
});
