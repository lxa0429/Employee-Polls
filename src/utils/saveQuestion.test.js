import { _saveQuestion } from './_DATA'

describe('_saveQuestion', () => {
  it('should return the saved question and match thebsnapshot with all expected fields populated when correctly formatted data is passed', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo'
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toMatchSnapshot();

    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion).toHaveProperty('author', question.author);
    expect(savedQuestion).toHaveProperty('optionOne');
    expect(savedQuestion.optionOne).toHaveProperty('text', question.optionOneText);
    expect(savedQuestion.optionOne).toHaveProperty('votes', []);
    expect(savedQuestion).toHaveProperty('optionTwo');
    expect(savedQuestion.optionTwo).toHaveProperty('text', question.optionTwoText);
    expect(savedQuestion.optionTwo).toHaveProperty('votes', []);
  });
});

describe('_saveQuestion', () => {
    it('should return an error if incorrect data is passed to the function', async () => {
      const question = {
        optionOneText: 'Option One'
        // Missing optionTwoText and author
      };
  
      await expect(_saveQuestion(question)).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });