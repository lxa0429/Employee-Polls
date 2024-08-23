import { _saveQuestionAnswer } from './_DATA'

describe('_saveQuestionAnswer', () => {
  it('should return true when correctly formatted data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });
});

describe('_saveQuestionAnswer', () => {
    it('should return an error if incorrect data is passed to the function', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        // Missing qid and answer
      };
  
      await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });
  });