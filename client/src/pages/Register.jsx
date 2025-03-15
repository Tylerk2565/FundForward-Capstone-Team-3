import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      await axios.post("http://localhost:5000/register", { email, password });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed! Try a different email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full p-2 border rounded" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
