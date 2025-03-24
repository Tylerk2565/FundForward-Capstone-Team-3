import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const Login = () => {
  const { setAuth, auth } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken && !isLoading) {
      navigate("/");
    }
  }, [auth, isLoading]);  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Show loading modal immediately
  
    try {
      const res = await axios.post(
        "https://fundforward-capstone-team-3.onrender.com/auth",
        JSON.stringify({ user, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      const { accessToken, roles, username, email, firstname } = res?.data;
      setAuth({ username, password, roles, accessToken, email, firstname });
      setUser("");
      setPassword("");
  
      setTimeout(() => navigate("/"), 4500); // Redirect after 4.5 seconds
    } catch (err) {
      setIsLoading(false); // Hide modal on error
      if (!err?.response) {
        setError("No server response");
      } else if (err.response.status === 409) {
        setError(err.response.data?.error || "Unknown error occurred.");
      } else {
        setError(err.response.data.error || "Login failed.");
      }
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Login Form */}
      <div className="flex-1 flex justify-center items-center p-6 bg-white shadow-lg rounded-l-lg">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Sign In
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Animation/Visual */}
      <div className="flex-1 bg-green-100 hidden lg:block relative">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-40 h-40 bg-green-300 rounded-full animate-spin"></div>
        </motion.div>
      </div>

      {/* Loading Dialog */}
      {isLoading && (
        <Dialog
          open={isLoading}
          onClose={() => {}}
          className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
            ></motion.div>
            <p className="text-gray-800">
              Logging User In... Redirecting to Home page.
            </p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Login;
