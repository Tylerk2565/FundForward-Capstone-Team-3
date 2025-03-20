import {
  FaEnvelope,
  FaProjectDiagram,
  FaUsers,
  FaCogs,
  FaBell,
} from "react-icons/fa";

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-blue-600 text-white p-6">
          <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-lg hover:text-blue-300 transition duration-300"
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/admin-messages"
                  className="text-lg hover:text-blue-300 transition duration-300"
                >
                  Messages
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-lg hover:text-blue-300 transition duration-300"
                >
                  Projects
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-lg hover:text-blue-300 transition duration-300"
                >
                  Users
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-lg hover:text-blue-300 transition duration-300"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin</h1>
            <div className="flex items-center space-x-4">
              <FaBell className="text-2xl text-gray-700 cursor-pointer" />
            </div>
          </header>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Dashboard Cards */}
            <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transform transition duration-300">
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-4xl text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Unread Messages</h3>
                  <p className="text-2xl font-bold text-gray-800">15</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transform transition duration-300">
              <div className="flex items-center mb-4">
                <FaProjectDiagram className="text-4xl text-green-600" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Total Projects</h3>
                  <p className="text-2xl font-bold text-gray-800">42</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transform transition duration-300">
              <div className="flex items-center mb-4">
                <FaUsers className="text-4xl text-orange-600" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Users</h3>
                  <p className="text-2xl font-bold text-gray-800">300</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <ul>
              <li className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <FaProjectDiagram className="text-green-600 text-xl" />
                  <span className="text-lg">
                    New Project Submitted: "Eco-Friendly Initiative"
                  </span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-orange-600 text-xl" />
                  <span className="text-lg">
                    New User Registered: "Sarah Lee"
                  </span>
                </div>
                <span className="text-sm text-gray-500">4 hours ago</span>
              </li>
              <li className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-blue-600 text-xl" />
                  <span className="text-lg">
                    Message Received from "John Doe"
                  </span>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              <h4 className="text-lg font-semibold mb-4">Create New Project</h4>
              <button className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 transition duration-300">
                Add Project
              </button>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              <h4 className="text-lg font-semibold mb-4">Manage Users</h4>
              <button className="bg-white text-green-600 py-2 px-4 rounded-lg hover:bg-green-200 transition duration-300">
                Manage Users
              </button>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg hover:bg-orange-700 transition duration-300">
              <h4 className="text-lg font-semibold mb-4">View Messages</h4>
              <button className="bg-white text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-200 transition duration-300">
                View Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
