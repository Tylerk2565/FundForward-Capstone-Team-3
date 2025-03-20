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
          .post("https://fundforward-capstone-team-3.onrender.com/results", { scores: updatedScores })
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


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-green-700 mb-4 text-center">
          Personalized Preferences
        </h1>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            }}
          ></div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          {quizQuestions[currentQuestion].question}
        </h2>

        <div className="space-y-4">
          {/* Maps through the currentQuestion in our quizQuestions */}
          {quizQuestions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id, option.value)}
              className={`w-full text-left px-5 py-3 rounded-lg transition duration-300 ease-in-out ${
                selectedAnswer && selectedAnswer.id === option.id
                  ? "bg-green-100 text-green-700 border border-green-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          disabled={selectedAnswer === null}
        >
          {currentQuestion !== quizQuestions.length - 1 ? "Next" : "Submit"}
        </button>

        {submitted && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">{getResultMessage()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
