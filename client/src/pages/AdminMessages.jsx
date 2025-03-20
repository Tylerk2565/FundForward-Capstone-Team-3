import { useState, useEffect } from "react";
import { FaCheck, FaReply, FaTrashAlt, FaBookmark } from "react-icons/fa";

const AdminMessages = () => {
  // Dummy data for messages
  const dummyMessages = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      message:
        "I love your service! I would love to see more features in the future, especially a dark mode option.",
      date: "2025-03-19T14:20:00Z",
      isRead: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      message:
        "Great website! It was easy to use and the products are fantastic. Keep up the good work!",
      date: "2025-03-18T10:45:00Z",
      isRead: false,
    },
    {
      id: 3,
      name: "Mark Brown",
      email: "markbrown@example.com",
      message:
        "I encountered a bug while trying to log in. Could you fix it as soon as possible? Thanks.",
      date: "2025-03-17T16:30:00Z",
      isRead: true,
    },
  ];

  const [messages, setMessages] = useState(dummyMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(false);
  }, []);

  // Filtering messages
  const filteredMessages =
    filter === "unread" ? messages.filter((msg) => !msg.isRead) : messages;

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  const handleReply = (id) => {
    alert(`Replying to message: ${id}`);
  };

  const toggleFilter = (status) => {
    setFilter(status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Contact Us - Message Review
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mr-4 rounded-md text-lg font-semibold ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
            onClick={() => toggleFilter("all")}
          >
            All Messages
          </button>
          <button
            className={`px-4 py-2 rounded-md text-lg font-semibold ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
            onClick={() => toggleFilter("unread")}
          >
            Unread Messages
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-blue-100">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Message
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`border-b hover:bg-gray-100 ${
                      msg.isRead ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6">{msg.name}</td>
                    <td className="py-4 px-6">{msg.email}</td>
                    <td className="py-4 px-6 text-ellipsis overflow-hidden max-w-xs">
                      {msg.message.length > 100
                        ? `${msg.message.substring(0, 100)}...`
                        : msg.message}
                    </td>
                    <td className="py-4 px-6">
                      {new Date(msg.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 flex gap-3">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="text-green-500 hover:text-green-700 flex items-center"
                        >
                          <FaCheck className="mr-1" />
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleReply(msg.id)}
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        <FaReply className="mr-1" />
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <FaTrashAlt className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-6 text-center text-gray-600"
                  >
                    No messages available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
