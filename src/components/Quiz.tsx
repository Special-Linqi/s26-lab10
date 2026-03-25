import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
// Hint: Take advantage of the QuizQuestion interface

interface QuizState {
  currentQuestion: QuizQuestion | null
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  // Task1 - Separate the logic of quiz from the UI.
  // Use QuizCore to manage quiz state separately from the UI.
  const [quizCore] = useState(new QuizCore());
  const [state, setState] = useState<QuizState>({
    currentQuestion: quizCore.getCurrentQuestion(),
    selectedAnswer: null,  // Initialize the selected answer.
    score: quizCore.getScore(),  // Initialize the score.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
  } 

  const { currentQuestion, selectedAnswer, score } = state;

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option: string) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;