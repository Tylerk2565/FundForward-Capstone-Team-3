import { useState, useEffect } from "react";
import quizQuestions from "./questions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialCategoryScores = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
};

const Quiz = () => {
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [categoryScores, setCategoryScores] = useState(initialCategoryScores);

  // Resets selected answer when moving to the next question
  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  // Based on user's input, it selects the id of that option from our quizQuestions in the questions.js
  const handleAnswerSelect = (id, value) => {
    setSelectedAnswer({ id, value });
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setCategoryScores((prevScores) => {
      const updatedScores = {
        ...prevScores,
        [selectedAnswer.value]: prevScores[selectedAnswer.value] + 1,
      };

      if (currentQuestion === quizQuestions.length - 1) {
        axios
          .post("http://localhost:3000/results", { scores: updatedScores })
          .then((response) => {
            navigate("/results", { state: { userPreferences: updatedScores } });
          })
          .catch((err) => console.log("Error submitting quiz:", err));
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }

      return updatedScores;
    });
  };

  const getResultMessage = () => {
    return recommendation
      ? `Your result is ${recommendation}`
      : "Calculating results...";
  };

  // const getUser = () => {
  //   // implement this later
  //   return true;
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Simple Quiz
        </h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
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
