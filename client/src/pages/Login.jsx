import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // If any field is invalid, return

    try {
      const res = await axios.post(
        "http://localhost:3000/auth",
        {
          user,
          pwd: password
        },
        {
          headers: { "Content-Type": "application/json" },
          Credentials: true,
        }
      );
      console.log(res.data);
      console.log(res.data.accessToken);
      console.log(JSON.stringify(res));

      alert("Login successful, taking you too home");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No server response");
        //error 409 means username or email already exists
      } else if (err.response.status === 409) {
        console.log(err);
        setError(err.response.data?.error || "Unknown error occurred.");
      } else if (err.response.data.error) {
        setError(err.response.data.error);
      }
      // setError("Registration failed! Try a different email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={user}
            onChange={(e) => setUser( e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
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
  );
};

export default Register;
