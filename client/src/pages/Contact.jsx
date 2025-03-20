import { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleContactForm = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/contactForm",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          comment: formData.message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res?.data);
      setFormData({ name: "", email: "", message: "" });
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setError("No server response");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleContactForm();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Contact Form */}
      <div className="flex-1 flex justify-center items-center p-6 bg-white shadow-lg rounded-l-lg">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-semibold text-center text-green-600 mb-6">
            Contact Us
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded mt-1"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded mt-1"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-3 text-white font-semibold rounded transition ${
                submitted ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitted ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Animation */}
      <div className="flex-1 bg-green-100 hidden lg:block relative">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-40 h-40 bg-green-300 rounded-full animate-spin"></div>
        </motion.div>
      </div>

      {isLoading && (
        <Dialog
          open={isLoading}
          onClose={() => {}}
          className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-[2px]" // Slightly dark background
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {" "}
            {/* Solid white modal */}
            <div className="w-12 h-12 mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#2E8B57" }}
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-800">
              Your message has been sent successfully!
            </p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Contact;
