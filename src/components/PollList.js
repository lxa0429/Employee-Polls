import React from 'react';
import PollCard from './PollCard';
import '../css/PollList.css'; 

const PollList = ({ questions }) => {
  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <PollCard key={question.id} question={question} />
        ))
      ) : (
        <p>No polls available</p>
      )}
    </div>
  );
};


export default PollList;
