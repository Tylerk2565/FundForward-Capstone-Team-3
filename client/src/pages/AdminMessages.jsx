import { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/contact/admin/messages",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMessages(response.data.messages);
      } catch (error) {
        setError(
          "Failed to fetch messages. Ensure you are logged in as an admin."
        );
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User Messages</h2>
      {error && <p className="text-red-600">{error}</p>}
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded">
              <h3 className="font-semibold">
                {msg.name} ({msg.email})
              </h3>
              <p className="text-gray-700">{msg.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
