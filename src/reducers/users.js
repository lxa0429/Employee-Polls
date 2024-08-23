import { RECEIVE_USERS, ADD_ANSWER_USER, ADD_QUESTION_USER } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION_USER:
      console.log('Previous User State:', state[action.author]);
      const updatedState = {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.qid),
        },
      };
      console.log('Updated User State:', updatedState[action.author]);
      return updatedState;
    
    case ADD_ANSWER_USER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser]?.answers || {},
            [qid]: answer,
          },
        },
      };
      
    default:
      return state
  }
}
