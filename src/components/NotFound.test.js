import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NotFound from './NotFound';

const mockStore = configureStore([]);

describe('NotFound', () => {
    let store;
    let initialState;

    beforeEach(() => {
        initialState = {
            authedUser: 'sarahedo',
        };

        store = mockStore(initialState);
    });

    it('renders the NotFound component correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <NotFound />
            </Provider>
        );

        expect(getByText('404')).not.toBeNull();
        expect(getByText("Sorry, the page you're looking for cannot be found.")).not.toBeNull();
    });

    it('logs the correct authedUser', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        render(
            <Provider store={store}>
                <NotFound />
            </Provider>
        );

        expect(consoleSpy).toHaveBeenCalledWith('NotFound component rendered');
        expect(consoleSpy).toHaveBeenCalledWith('Current authedUser:', 'sarahedo');

        consoleSpy.mockRestore();
    });
});
