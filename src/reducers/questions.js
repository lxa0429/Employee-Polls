import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER, ADD_ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
      case ADD_ANSWER:
        const { authedUser, qid, answer } = action;
  
        return {
          ...state,
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: state[qid][answer].votes.concat([authedUser]),
            },
          },
        };
        case ADD_ANSWER_QUESTION:
          return {
            ...state,
            [action.qid]: {
              ...state[action.qid],
              [action.answer]: {
                ...state[action.qid][action.answer],
                votes: state[action.qid][action.answer].votes.concat(action.author)
              }
            }
          };
    default:
      return state;
  }
}
