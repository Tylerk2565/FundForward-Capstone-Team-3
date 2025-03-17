import Quiz from "../components/Quiz";

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <Quiz />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;