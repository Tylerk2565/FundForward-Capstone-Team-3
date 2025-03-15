import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuizPage from "../src/pages/QuizPage";
import Fundraisers from "./pages/Fundraisers";
const App = () => {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
            <Route path="/fundraiser" element={<Fundraisers />} />
              </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
