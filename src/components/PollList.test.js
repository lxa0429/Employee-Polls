// src/components/PollList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PollList from './PollList';

// Mock the PollCard component to avoid testing its implementation
jest.mock('./PollCard', () => () => <div>PollCard</div>);

describe('PollList', () => {
  it('renders a list of PollCard components', () => {
    const questions = [
      { id: '1', author: 'user1', timestamp: 1234567890, optionOne: { text: 'Option One', votes: [] }, optionTwo: { text: 'Option Two', votes: [] } },
      { id: '2', author: 'user2', timestamp: 1234567891, optionOne: { text: 'Option One', votes: [] }, optionTwo: { text: 'Option Two', votes: [] } },
    ];

    render(<PollList questions={questions} />);

    // Check if PollCard components are rendered
    const pollCards = screen.getAllByText('PollCard');
    expect(pollCards).toHaveLength(2); // Expect 2 PollCard components to be rendered
  });
});
