import '../css/NewPoll.css'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions';

function NewPoll() {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();

  async function createNewPoll(optionOneText, optionTwoText, author) {
    if (!optionOneText || !optionTwoText || !author) {
      console.error('Please provide optionOneText, optionTwoText, and author');
      return;
    }
  
    try {
      dispatch(handleAddQuestion(optionOneText, optionTwoText, author));
      navigate('/'); // Optional navigation or state update
    } catch (error) {
      console.error('Error creating new poll:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewPoll(optionOneText, optionTwoText, authedUser);
  }

  return (
    <div className="new-poll-container">
      <h3>Would You Rather</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
          placeholder="Enter Option One Text Here"
        />
        <input
          type="text"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
          placeholder="Enter Option Two Text Here"
        />
        <button type="submit" disabled={optionOneText === '' || optionTwoText === ''}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewPoll;
