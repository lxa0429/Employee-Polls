import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/helpers';
import '../css/PollCard.css';

function PollCard({ question }) {
  const navigate = useNavigate();
  const users = useSelector(state => state.users);

  if (!question) {
    return <p>Loading poll data...</p>;
  }

  const { id, author, timestamp, optionOne, optionTwo } = question;
  const authorDetails = users[author] || {}; // Get author details
  const { avatarURL } = authorDetails;

  const isDataMissing = !optionOne?.text || !optionTwo?.text || !author || isNaN(new Date(timestamp).getTime());

  if (isDataMissing) {
    return null;
  }

  const handleCardClick = () => {
    navigate(`/questions/${id}`);
  };

  return (
    <div className="poll-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="poll-card-content">
        {avatarURL && (
          <img
            src={process.env.PUBLIC_URL + avatarURL}
            alt={`${author}'s avatar`}
            className="avatar"
          />
        )}
        <div className="poll-details">
          <h4>Would you rather...</h4>
          <p>
            {optionOne?.text || 'Option One not available'} <br />
            or <br />
            {optionTwo?.text || 'Option Two not available'}
          </p>
          <p>Author: {author || 'Unknown Author'}</p>
          <p>Date: {formatDate(timestamp)}</p>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
