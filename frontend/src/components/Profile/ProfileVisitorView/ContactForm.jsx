import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Modal,
  Link,
} from "@mui/material";

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

    //TODO message send
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#f3f5f7",
        borderRadius: 2,
        maxWidth: 600,
        ml: 5,
        mt: 3,
        mr: "auto",
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        URL: <Link href="#">YourURL.com</Link>
      </Typography>{" "}
      <Typography variant="body1" sx={{ mb: 4 }}>
        LinkedIn: <Link href="#">YourLinkedInProfile</Link>
      </Typography>{" "}
      <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
        Contact
      </Typography>
      <Typography gutterBottom>Have a question? Send a message.</Typography>
      {success && (
        <Typography color="success.main">Message sent successfully!</Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#f3f5f7", mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Type your message..."
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          required
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.termsAccepted}
              onChange={handleChange}
              name="termsAccepted"
            />
          }
          label={
            <span>
              I accept the{" "}
              <Link
                component="button"
                onClick={handleTermsClick}
                underline="hover"
                style={{ cursor: "pointer" }}
              >
                Terms and Conditions
              </Link>
            </span>
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 2,
            backgroundColor: "#4b5a68",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "20%",
            "&:hover": {
              backgroundColor: "#3a4858",
            },
            "&.Mui-disabled": {
              backgroundColor: "#ccc",
              color: "rgba(0, 0, 0, 0.26)",
            },
          }}
        >
          {isLoading ? "Sending..." : "Submit"}
        </Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)",
          zIndex: 1000,
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            width: { xs: "90vw", md: "400px" },
            textAlign: "center",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" id="modal-title">
            Terms and Conditions
          </Typography>
          <TermsAndConditions />
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              marginTop: 2,
              padding: "10px 20px",
              backgroundColor: "#4b5a68",
              color: "white",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#3a4858",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
