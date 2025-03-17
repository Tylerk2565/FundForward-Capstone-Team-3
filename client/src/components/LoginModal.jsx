import { useNavigate } from "react-router-dom";

function LoginModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login Required</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            x
          </button>
        </div>

        {/* Modal Body */}
        <div className="mb-4">
          <p className="text-gray-700">
            You need to be logged in to access the quiz.
          </p>
          <p className="text-gray-700">
            Please login or create a new account to continue.
          </p>
        </div>

        {/* Modal Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1"
            onClick={() => {
              onClose();
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
