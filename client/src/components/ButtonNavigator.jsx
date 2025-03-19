// component that navigates to other pages and allow users to customize paths and name
const Button = ({ name, onClick }) => {
  return (
        <button 
        onClick={onClick}
        className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition">
          {name}
        </button>
  );
};
export default Button;
