import { Link } from "react-router-dom";

// component that navigates to other pages and allow users to customize paths and name
const Button = ({ name, routeName }) => {
  return (
    <>
      <Link to={`/${routeName}`}>
        <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition">
          {name}
        </button>
      </Link>
    </>
  );
};
export default Button;
