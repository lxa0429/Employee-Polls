import '../css/Home.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PollList from './PollList';

function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const { authedUser, questions, users } = useSelector((state) => state);
  
  console.log('Questions:', questions);
  console.log('Authed User:', authedUser);

  if (!authedUser || !users[authedUser]) {
    return <p>Please log in to view polls.</p>;
  }

  const answeredPolls = Object.values(questions)
    .filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredPolls = Object.values(questions)
    .filter((question) => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
    .sort((a, b) => b.timestamp - a.timestamp);

  console.log('Questions:', questions);
  console.log('Authed User:', authedUser);
  console.log('Answered Polls:', answeredPolls);
  console.log('Unanswered Polls:', unansweredPolls);

  return (
    <div className="poll-container">
      <h3>{users[authedUser]?.name}'s {showAnswered ? 'Answered' : 'Unanswered'} Polls</h3>

      <div className="poll-list-container">
        {showAnswered ? (
          answeredPolls.length > 0 ? (
            <PollList questions={answeredPolls} />
          ) : (
            <p>No answered polls</p>
          )
        ) : (
          unansweredPolls.length > 0 ? (
            <PollList questions={unansweredPolls} />
          ) : (
            <p>No unanswered polls</p>
          )
        )}
      </div>

      <button 
        className="toggle-button" 
        onClick={() => setShowAnswered(!showAnswered)}>
        {showAnswered ? 'Show Unanswered Polls' : 'Show Answered Polls'}
      </button>
    </div>
  );
}

export default Home;
