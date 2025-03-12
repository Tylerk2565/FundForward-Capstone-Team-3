import { NavLink } from "react-router-dom";
import UserIcon from "./icons/UserIcon";

const Navbar = () => {
  return (
    <nav className="w-full h-16 shadow-md">
      <div className="max-w-8xl h-16 mx-auto px-6 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex space-x-4">
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/fundraiser"
          >
            Fundraisers
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            Volunteer
          </NavLink>
        </div>
        {/* Middle Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl text-green-600">
          FundForward
        </div>
        {/* Right Links */}
        <div className="flex space-x-4">
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            Contact
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            Sign-Up
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            <UserIcon className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
