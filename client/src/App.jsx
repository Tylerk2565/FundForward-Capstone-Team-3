import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Fundraisers from "./pages/Fundraisers";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PersistLogin from "./components/PersistLogin";
import Contact from "./pages/Contact";
import Volunteer from "./pages/Volunteer";
import { LoadScript } from "@react-google-maps/api";
import About from "./pages/About";
import AdminMessages from "./pages/AdminMessages";
import AdminHomePage from "./pages/AdminHome";
import Results from "./pages/Results";

const App = () => {
  const libraryArray = ["places"];

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraryArray}
    >
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fundraiser" element={<Fundraisers />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/results" element={<Results />} />
              <Route element={<PersistLogin />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/admin-messages" element={<AdminMessages />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LoadScript>
  );
};

export default App;
