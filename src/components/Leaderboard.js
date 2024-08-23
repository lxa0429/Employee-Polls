import '../css/Leaderboard.css';
import { connect } from "react-redux";
import React from 'react';

function Leaderboard({ users }) {
  // Log the users data to verify
  console.log("Redux State: ", users);

  return (
    <div className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <h3>Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Answered Questions</th>
              <th>Created Questions</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              // Safeguard against missing properties
              const answeredQuestions = user.answers ? Object.keys(user.answers).length : 0;
              const createdQuestions = user.questions ? user.questions.length : 0;
              const totalScore = answeredQuestions + createdQuestions;
              
              // Handle empty or undefined names
              const name = user.name ? user.name.trim() : 'Unknown';

              console.log('Rendering user:', user);

              return (
                <tr key={user.id}>
                  <td>{name}</td>
                  <td>{answeredQuestions}</td>
                  <td>{createdQuestions}</td>
                  <td>{totalScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);
