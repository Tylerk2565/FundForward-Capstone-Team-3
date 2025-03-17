import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Fundraisers from "./pages/Fundraisers";
import QuizPage from "../src/pages/QuizPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Volunteer from "./pages/Volunteer";
import Profile from "./pages/Profile";

const App = () => {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/fundraiser" element={<Fundraisers />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
            <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
};

export default App;

