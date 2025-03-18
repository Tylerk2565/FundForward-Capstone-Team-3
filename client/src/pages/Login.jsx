import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const { setAuth, auth } = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("here's the auth bois", auth);
    if (auth.accessToken) {
      //redirect to home page
      navigate("/");
    }
  }, auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // If any field is invalid, return

    try {
      const res = await axios.post(
        "http://localhost:3000/auth",
        JSON.stringify({
          user,
          pwd: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      const accessToken = res?.data.accessToken;
      const roles = res?.data.roles;
      console.log(roles);
      setAuth({ user, password, roles, accessToken });
      setUser("");
      setPassword("");

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
            onChange={(e) => setUser(e.target.value)}
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

export default Login;
