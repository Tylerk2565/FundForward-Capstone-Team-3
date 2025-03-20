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
    console.log("here's the auth bois", auth);
    if (auth.accessToken) {
      //redirect to home page
      navigate("/profile");
    }
  }, [auth]);

  // Validate inputs in real-time
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

    // If any field is invalid, return
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
        "/register",
        {
          user,
          pwd: password,
          email,
          firstname: fname,
          lastname: lname,
        },
        {
          headers: { "Content-Type": "application/json" },
          Credentials: true,
        }
      );
      console.log(res.data);
      console.log(res.accessToken);
      console.log(JSON.stringify(res));

      setIsLoading(true);
      setTimeout(() => {
        navigate("/login");
      }, 4500);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No server response");
        //error 409 means username or email already exists
      } else if (err.response.status === 409) {
        console.log(err);
        setError(err.response.data?.error || "Unknown error occurred.");
      } else if (err.response.data.error) {
        setError(err.response.data.errors.join(", "));
      }
      // setError("Registration failed! Try a different email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            value={email}
            onChange={handleEmailChange}

          />
          {!validEmail && email && (
            <p className="text-red-500 text-sm">Invalid email address.</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}

          />
          {!validMatch && confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match.</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
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

      {isLoading && (
        <Dialog
        open={isLoading}
        onClose={() => {}}
        className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-[2px]" // Slightly dark background
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center"> {/* Solid white modal */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <p className="text-gray-800">User is being created... Redirecting to login page.</p>
        </div>
      </Dialog>
      )}

    </div>
  );
};

export default Register;
