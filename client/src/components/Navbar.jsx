import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserIcon from "./icons/UserIcon";
import Logo from "../assets/Logo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { auth } = useAuth();

  const isLoggedIn = auth?.username || auth?.accessToken;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <nav className="w-full h-16 shadow-md z-50 relative">
      <div className="max-w-8xl h-16 mx-auto px-6 flex items-center justify-between">
        {/* Left Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            className="relative px-3 cursor-pointer rounded transition duration-300 ease-in-out hover:bg-gray-100"
            to="/"
          >
            <img src={Logo} alt="FundForward Logo" className="h-12 w-auto md:h-16" />
          </NavLink>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
              to="/fundraiser"
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
        </div>

        {/* Middle Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl md:text-2xl text-green-600">
          FundForward
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button 
          onClick={toggleMenu}
          className="outline-none mobile-menu-button">
            <svg
              className="w-6 h-6 text-gray-500"
              x-show="!showMenu"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-16 right-0 w-full bg-white shadow-md ${showMenu ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center">
            <li>
              <NavLink
                className="block text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full text-center"
                to="/fundraiser"
              >
                Fundraisers
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full text-center"
                to="/volunteer"
              >
                Volunteer
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full text-center"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full text-center"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>

                {isLoggedIn ? (
              <li className="flex flex-col items-center">
              <NavLink
                className="flex flex-col items-center text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full"
                to="/profile"
              >
                <UserIcon className="h-8 w-8" />
                {auth?.username && (
                  <span className="block text-black">{auth.username}</span>
                )}
              </NavLink>
            </li>
            ) : (
              <>
                <li>
                  <NavLink
                    className="block text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-100 w-full text-center"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block text-sm px-4 py-2 transition duration-300 ease-in-out bg-green-500 text-white hover:bg-green-600 w-full text-center rounded-md mt-2 mb-2 p-2"
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
              {/* </NavLink> */}
            </li>
          </ul>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-4">
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

          {isLoggedIn ? (
    <NavLink
      className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100 flex items-center space-x-2"
      to="/profile"
    >
      <UserIcon className="h-5 w-5" />
      {auth?.username && <span>{auth.username}</span>}
    </NavLink>
  ) : (
    <>
      <NavLink
        className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className="relative px-3 py-2 rounded transition duration-300 ease-in-out bg-green-500 text-white hover:bg-green-600"
        to="/register"
      >
        Sign Up
      </NavLink>
    </>
  )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
