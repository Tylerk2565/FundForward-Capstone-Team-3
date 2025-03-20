import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[a-zA-Z0-9]{3,}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const NAME_REGEX = /^[A-Za-z]+$/;

const Register = () => {
  const userRef = useRef();
  const { auth } = useAuth();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [fname, setFName] = useState("");
  const [validFName, setValidFName] = useState(false);
  const [lname, setLName] = useState("");
  const [validLName, setValidLName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/profile");
    }
  }, [auth]);

  const handleUserChange = (e) => {
    const username = e.target.value;
    setUser(username);
    setValidName(USER_REGEX.test(username));
  };

  const handleFNameChange = (e) => {
    const firstName = e.target.value;
    setFName(firstName);
    setValidFName(NAME_REGEX.test(firstName));
  };

  const handleLNameChange = (e) => {
    const lastName = e.target.value;
    setLName(lastName);
    setValidLName(NAME_REGEX.test(lastName));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setvalidEmail(EMAIL_REGEX.test(email));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setValidPwd(PWD_REGEX.test(password));
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setValidMatch(confirmPassword === password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !validName ||
      !validFName ||
      !validLName ||
      !validEmail ||
      !validPwd ||
      !validMatch
    ) {
      setError("Please fill out the form correctly.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/register",
        { user, pwd: password, email, firstname: fname, lastname: lname },
        { headers: { "Content-Type": "application/json" }, Credentials: true }
      );

      setIsLoading(true);
      setTimeout(() => {
        navigate("/login");
      }, 4500);
    } catch (err) {
      if (!err?.response) {
        setError("No server response");
      } else if (err.response.status === 409) {
        setError(
          err.response.data?.error || "Username or email already exists."
        );
      } else if (err.response.data.error) {
        setError(err.response.data.errors.join(", "));
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Registration Form */}
      <div className="flex-1 flex justify-center items-center p-6 bg-white shadow-lg rounded-l-lg">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Create an Account
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={user}
              onChange={handleUserChange}
            />
            {!validName && user && (
              <p className="text-red-500 text-sm">
                Username must be at least 3 characters long and contain only
                letters/numbers.
              </p>
            )}
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={fname}
              onChange={handleFNameChange}
            />
            {!validFName && fname && (
              <p className="text-red-500 text-sm">
                First name must contain only letters.
              </p>
            )}
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={lname}
              onChange={handleLNameChange}
            />
            {!validLName && lname && (
              <p className="text-red-500 text-sm">
                Last name must contain only letters.
              </p>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={handleEmailChange}
            />
            {!validEmail && email && (
              <p className="text-red-500 text-sm">Invalid email address.</p>
            )}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={handlePasswordChange}
            />
            {!validPwd && password && (
              <p className="text-red-500 text-sm">
                Password must be at least 8 characters long and contain an
                uppercase letter, a lowercase letter, a number, and a special
                character.
              </p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!validMatch && confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
              disabled={
                !validName ||
                !validFName ||
                !validLName ||
                !validEmail ||
                !validPwd ||
                !validMatch
              }
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Animation */}
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
              User is being created... Redirecting to login page.
            </p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Register;
