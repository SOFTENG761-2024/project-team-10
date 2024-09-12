import React, { useState } from "react";
import { sendContactMessage } from "./api";
import "./ContactFormStyle.css";
import { TermsAndConditions } from "./TermsAndConditions";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    termsAccepted: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms to proceed.");
      return;
    }
    setIsLoading(true);

    sendContactMessage(formData)
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "", termsAccepted: false });
      })
      .catch((err) => console.error("Error sending message:", err))
      .finally(() => setIsLoading(false));
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contact-container">
      <div className="url">URL:</div>
      <div className="linkedln">Linkedln:</div>
      <h3>Contact</h3>
      <h4>Have a question? Send a message.</h4>
      {success && <p>Message sent successfully!</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..."
            required
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            I accept the{" "}
            <a href="#" onClick={handleTermsClick}>
              Terms
            </a>{" "}
            {/* Updated to trigger the modal */}
          </label>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TermsAndConditions />{" "}
            {/* Replace static content with TermsAndConditions component */}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
