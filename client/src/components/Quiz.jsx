import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
  {
    question: "",
    options: {},
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQustion] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (choice) => {
    setAnswers({ ...answers, [currentQuestion]: choice });

    //   if(currentQuestion < questions.length -1){
    //     setCurrentQustion(currentQuestion + 1)
    //   } else {
    //     navigate('/results', {state: { answers } })
    //   }
  };
};

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-xl font-semibold"></h2>
    </div>
  </div>
);
