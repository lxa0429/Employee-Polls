import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';

function PollDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const poll = useSelector((state) => state.questions[id]);
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    console.log('authedUser in PollDetails component:', authedUser);
  }, [authedUser]);

  if (!poll || !users) {
    return <div>Loading...</div>;
  }

  const author = users[poll.author];
  const optionOneVotes = poll.optionOne.votes.length;
  const optionTwoVotes = poll.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePercentage = ((optionOneVotes / totalVotes) * 100).toFixed(2);
  const optionTwoPercentage = ((optionTwoVotes / totalVotes) * 100).toFixed(2);

  const handleVote = (option) => {
    const info = { authedUser, qid: id, answer: option };
    console.log('Authed User:', authedUser); // Should not be undefined
    console.log('Question ID:', id); // Should be valid
    console.log('Answer:', option); // Should be valid

    console.log('Dispatching vote with:', info); // Log info object
    dispatch(handleAddAnswer(info));
    //dispatch(handleAddAnswer({ qid: id, answer: option }));
  };

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh', 
        textAlign: 'center',
        flexDirection: 'column',
        marginTop: '50px'
      }}>

      <h3>Poll created by: {author.name}</h3>
      {poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser) ? (
        <>
          <div>
            <h4>{poll.optionOne.text}</h4>
            <p>{optionOneVotes} out of {totalVotes} votes ({optionOnePercentage}%)</p>
            <p>Users who voted for this option:</p>
            <ul>
              {poll.optionOne.votes.map((userId) => (
                <li key={userId}>{users[userId].name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{poll.optionTwo.text}</h4>
            <p>{optionTwoVotes} out of {totalVotes} votes ({optionTwoPercentage}%)</p>
            <p>Users who voted for this option:</p>
            <ul>
              {poll.optionTwo.votes.map((userId) => (
                <li key={userId}>{users[userId].name}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{poll.optionOne.text}</p>
            <button onClick={() => handleVote('optionOne')}>Vote</button>
          </div>
          <div>
            <p>{poll.optionTwo.text}</p>
            <button onClick={() => handleVote('optionTwo')}>Vote</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PollDetails;
