import { useState, useEffect } from "react";
import quizQuestions from "./questions";
import axios from "axios";

const initialCategoryScores = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
};

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [categoryScores, setCategoryScores] = useState(initialCategoryScores);

  // Resets selected answer when moving to the next question
  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  // Based on what option the user selects, it selects the id of that option from our quizQuestions in the questions.js
  const handleAnswerSelect = (id, value) => {
    setSelectedAnswer({ id, value });
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    const finalScores = {
      // Creates a new object that includes all properties from categoryScores and increments the score for selected value/answer
      ...categoryScores,
      [selectedAnswer.value]: categoryScores[selectedAnswer.value] + 1,
    };

    setCategoryScores(finalScores);

    // Sends a post request when the last question is answered
    if (currentQuestion === quizQuestions.length - 1) {
      try {
        const response = await axios.post(
          "http://localhost:3000/quiz-results",
          {
            scores: finalScores,
          }
        );
        setRecommendation(response.data.recommendation);
        setSubmitted(true);
      } catch (err) {
        console.log("Error Submitting Quiz", err);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const getResultMessage = () => {
    // implement this later
    return true;
  };

  const getUser = () => {
    // implement this later
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Simple Quiz
        </h1>
        <h2 className="text-lg font-semibold mb-4 text-center">
          {quizQuestions[currentQuestion].question}
        </h2>
        <div className="space-y-2">
          {/* Maps through the currentQuestion in our quizQuestions */}
          {quizQuestions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id, option.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
                selectedAnswer && selectedAnswer.id === option.id
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          disabled={selectedAnswer === null}
        >
          {currentQuestion !== quizQuestions.length - 1 ? "Next" : "Submit"}
        </button>
        {submitted && (
          <div className="mt-4 text-center">
            <p className="text-green-600">{getResultMessage()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
