import { saveQuestion, saveQuestionAnswer} from "../utils/api";
import {addAnswerUser, addQuestionUser} from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
export function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
function addAnswerQuestion(author, qid, answer) {
  return {
      type: ADD_ANSWER_QUESTION,
      author,
      qid,
      answer,
  };
}

export function handleAddAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    if (!authedUser || !qid || !answer) {
      console.warn('Please provide authedUser, qid, and answer');
      return;
    }

    return saveQuestionAnswer(authedUser, qid, answer)
      .then(() => {
        dispatch(addAnswerQuestion(authedUser, qid, answer));
        dispatch(addAnswerUser(authedUser, qid, answer));
      });
  };
}



export function handleAddQuestion(firstOption, secondOption, author) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({ optionOneText: firstOption, optionTwoText: secondOption, author: authedUser })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
      })
      .catch((error) => {
        console.error('Error saving question:', error);
      });
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
