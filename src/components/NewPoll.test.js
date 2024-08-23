import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewPoll from './NewPoll';
import { MemoryRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

jest.mock('../actions/questions', () => ({
  handleAddQuestion: jest.fn(),
}));

const mockStore = configureStore([]);

describe('NewPoll', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      authedUser: 'sarahedo',
    };

    store = mockStore(initialState);
  });

  it('renders NewPoll component correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );

    expect(getByPlaceholderText('Enter Option One Text Here')).not.toBeNull();
    expect(getByPlaceholderText('Enter Option Two Text Here')).not.toBeNull();
    expect(getByText('Submit')).not.toBeNull();
  });

  it('submits the form and dispatches handleAddQuestion', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );

    const optionOneInput = getByPlaceholderText('Enter Option One Text Here');
    const optionTwoInput = getByPlaceholderText('Enter Option Two Text Here');
    const submitButton = getByText('Submit');

    // Simulate user input
    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option Two' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    expect(handleAddQuestion).toHaveBeenCalledWith('Option One', 'Option Two', 'sarahedo');
  });

  it('does not submit the form when inputs are empty', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = getByText('Submit');

    // Try to submit the form without entering text
    fireEvent.click(submitButton);

    expect(handleAddQuestion).not.toHaveBeenCalled();
  });
});
