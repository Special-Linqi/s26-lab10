import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
// Hint: Take advantage of the QuizQuestion interface

interface QuizState {
  currentQuestion: QuizQuestion | null
  selectedAnswer: string | null
  score: number
  quizCompleted: boolean
}

const Quiz: React.FC = () => {
  // Task1 - Separate the logic of quiz from the UI.
  // Use QuizCore to manage quiz state separately from the UI.
  const [quizCore] = useState(new QuizCore());
  const [state, setState] = useState<QuizState>({
    currentQuestion: quizCore.getCurrentQuestion(),
    selectedAnswer: null,  // Initialize the selected answer.
    score: quizCore.getScore(),  // Initialize the score.
    quizCompleted: false,
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3 - Implement the logic for button click ("Next Question" and "Submit").
    if (!state.selectedAnswer) {
      alert('Please select an answer before proceeding.');
      return;
    }

    // Record the answer and update the score
    quizCore.answerQuestion(state.selectedAnswer);
    
    // Check if there is a next question
    if (quizCore.hasNextQuestion()) {
      // Move to the next question
      quizCore.nextQuestion();
      setState({
        currentQuestion: quizCore.getCurrentQuestion(),
        selectedAnswer: null,
        score: quizCore.getScore(),
        quizCompleted: false,
      });
    } else {
      // Quiz is completed, show the final score
      setState({
        currentQuestion: null,
        selectedAnswer: null,
        score: quizCore.getScore(),
        quizCompleted: true,
      });
    }
  } 

  const { currentQuestion, selectedAnswer, score, quizCompleted } = state;

  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div>
        <h2>Loading Quiz...</h2>
      </div>
    );
  }

  const isLastQuestion = !quizCore.hasNextQuestion();
  const buttonText = isLastQuestion ? 'Submit' : 'Next Question';

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

      <button onClick={handleButtonClick}>{buttonText}</button>
    </div>
  );
};

export default Quiz;