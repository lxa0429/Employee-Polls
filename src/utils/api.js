import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestion, 
  _saveQuestionAnswer } from './_DATA'

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion(question) {
  return _saveQuestion(question)
}

// export function saveQuestionAnswer(info) {
//   return _saveQuestionAnswer(info)
// }

// api.js
export function saveQuestionAnswer(authedUser, qid, answer) {
  if (!authedUser || !qid || !answer) {
    return Promise.reject('Missing parameters');
  }

  // Implementation of saving the answer
  return _saveQuestionAnswer({ authedUser, qid, answer });
}



export function getUsers() {
  return _getUsers()
}

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
