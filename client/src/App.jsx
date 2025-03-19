import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Results from "./pages/Results";

// const AdminRoute = ({ element, ...rest }) => {
//   const { user } = useAuth();

//   return user?.role === "admin" ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/" />
//   );
// };

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

            <Route path="/results" element={<Results />} />
            <Route element={<PersistLogin />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route
              path="/admin/messages"
              element={<AdminRoute element={<AdminMessages />} />}
            /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

