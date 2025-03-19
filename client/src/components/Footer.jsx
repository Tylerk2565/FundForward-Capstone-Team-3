import { NavLink } from "react-router-dom";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 mt-auto z-50">
      <div className="max-w-8xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center relative">
        {/* Left Copyright */}
        <div className="text-gray-600 whitespace-nowrap">
          © {new Date().getFullYear()} FundForward. All rights reserved.
        </div>

        {/* Middle Social Icons */}
          <div className="flex space-x-4 my-4 md:my-0">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
          </div>

          {/* Right Links */}
        <div className="flex space-x-4">
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100 flex items-center space-x-2"
            to="/"
          >
            Contact
          </NavLink>
          <NavLink
            className="relative px-3 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100 flex items-center space-x-2"
            to="/"
          >
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
