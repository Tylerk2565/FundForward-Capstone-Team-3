import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate sending the form data
    setTimeout(() => {
      alert("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h2 className="text-4xl font-semibold text-center">Contact Us</h2>
      <p className="text-gray-600 text-center mt-2">
        Have questions? We'd love to hear from you!
      </p>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mt-8 bg-white p-8 shadow-lg rounded-lg">
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
      </div>

      {/* Contact Information */}
      <div className="max-w-2xl mx-auto text-center mt-12">
        <h3 className="text-2xl font-semibold">Our Contact Information</h3>
        <p className="text-gray-600 mt-2">
          Feel free to reach out via any method below.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-lg">
            <strong>Email:</strong> support@fundforward.com
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p className="text-lg">
            <strong>Address:</strong> 123 Nonprofit Street, Charlotte, NC
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
