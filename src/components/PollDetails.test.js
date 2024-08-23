import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PollDetails from './PollDetails';

const mockStore = configureStore([]);

describe('PollDetails', () => {
    let store;
    let initialState;

    beforeEach(() => {
        initialState = {
            authedUser: 'sarahedo',
            questions: {
                '8xf0y6ziyjabvozdd253nd': {
                    id: '8xf0y6ziyjabvozdd253nd',
                    author: 'sarahedo',
                    timestamp: 1467166872634,
                    optionOne: {
                        votes: ['sarahedo'],
                        text: 'Upgrade the existing application',
                    },
                    optionTwo: {
                        votes: [],
                        text: 'Build a new app from scratch',
                    },
                },
            },
            users: {
                sarahedo: {
                    id: 'sarahedo',
                    name: 'Sarah Edo',
                    avatarURL: '',
                    answers: {
                        '8xf0y6ziyjabvozdd253nd': 'optionOne',
                    },
                    questions: ['8xf0y6ziyjabvozdd253nd'],
                },
            },
        };

        store = mockStore(initialState);
    });

    it('renders poll details correctly', async () => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/questions/8xf0y6ziyjabvozdd253nd']}>
                    <Routes>
                        <Route path="/questions/:id" element={<PollDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Wait for the component to render after loading
        await waitFor(() => {
            expect(queryByText('Loading...')).toBeNull();
        });

        expect(getByText('Poll created by: Sarah Edo')).not.toBeNull();
        expect(getByText('Upgrade the existing application')).not.toBeNull();
        expect(getByText('1 out of 1 votes (100.00%)')).not.toBeNull();
    });
});
