import { NavLink } from "react-router-dom";
import UserIcon from "./icons/UserIcon";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="w-full h-16 shadow-md z-50 relative">
      <div className="max-w-8xl h-16 mx-auto px-6 flex items-center justify-between">
        {/* Left Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            className="relative px-3 cursor-pointer rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            <img src={Logo} alt="FundForward Logo" className="h-16 w-auto" />
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/fundraisers"
          >
            Fundraisers
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/volunteer"
          >
            Volunteer
          </NavLink>
        </div>

        {/* Middle Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl text-green-600">
          FundForward
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/profile"
          >
            <UserIcon className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
