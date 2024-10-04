import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  GlobalStyles,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAccountCreationAPI } from "./api";

const AccountCreation = () => {
  const navigate = useNavigate();
  const { createAccount } = useAccountCreationAPI();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const [navToLandinPage, setNavToLandingPage] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    if (navToLandinPage)
      navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createAccount(
        {
          'first_name': formData.firstName,
          'last_name': formData.lastName,
          'organization_name': formData.organization,
          'email': formData.email,
        }
      ).then((response) => {
        if (response === true) {
          setDialogMessage("Your account is in the verification process. You can now navigate to the landing page.");
          setNavToLandingPage(true);

        } else if (response === false) {
          setDialogMessage("Failed to create account. Please try again.");
        } else {
          setDialogMessage("Failed to create account. Please go to the sign up page and try again.");
        }
        setOpen(true);
      });

    } catch (error) {
      console.error("Error:", error);
      setDialogMessage("Failed to create account. Please try again.");
      setOpen(true);
    }
  };

  return (
    <>
      <GlobalStyles styles={styles.global} />
      <Container component="main" minWidth="xs" sx={styles.container}>
        <Box sx={styles.welcomeBoxContainer}>
          <Typography variant="body2" sx={{ ...styles.typographyBody, mb: 1 }}>
            Welcome! Since this is your first time accessing the platform,
            please create an account by providing your organization name and
            official email address.
          </Typography>
          <Typography variant="body2" sx={{ ...styles.typographyBody, mt: 1 }}>
            Once your account is approved, you&apos;ll receive a confirmation
            email where you can set your password or log in using your LinkedIn
            ID.
          </Typography>
          <Typography variant="body2" sx={styles.supportText}>
            For any questions, reach out to us at Support@academicfellows.com.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={styles.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="fname"
                value={formData.firstName}
                onChange={handleChange}
                sx={styles.textFieldStyle}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                onChange={handleChange}
                sx={styles.textFieldStyle}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Organization"
                name="organization"
                autoComplete="organization"
                value={formData.organization}
                onChange={handleChange}
                sx={styles.textFieldStyle}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={styles.textFieldStyle}
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onSubmit={handleSubmit}
                sx={styles.submitButton}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {"Account Creation Status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "1.25rem",
              color: "#333",
            }}
            id="alert-dialog-description"
          >
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            sx={{
              minWidth: "150px",
              backgroundColor: "#4b5a68",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#5c6b7a",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountCreation;

const styles = {
  global: {
    html: {
      height: "100%",
      margin: 0,
      padding: 0,
    },
    body: {
      width: "100%",
      height: "100vh",
      margin: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "960px",
    height: "600px",
  },
  welcomeBoxContainer: {
    width: "100%",
    height: "55%",
    backgroundColor: "#4b5a68",
    borderRadius: "30px 30px 0 0",
    mr: "0",
    padding: 2,
    textAlign: "center",
    color: "white",
  },
  typographyBody: {
    mt: "25px",
    display: "flex",
    fontFamily: "Ramaraja",
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "center",
    padding: 2,
  },

  supportText: {
    fontSize: "19px",
    fontFamily: "Ramaraja",
    mt: "30px",
  },
  form: {
    width: "100%",
    height: "45%",
    backgroundColor: "#F1F4F6",
    padding: 5,
    boxSizing: "border-box",
    borderRadius: "0 0 30px 30px",
  },
  textFieldStyle: {
    background: "#D6D8D9",
    borderRadius: "55px",
    outline: "none",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },

  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    type: "submit",
    fullWidth: true,
    variant: "contained",
    mt: 1,
    mb: 2,
    backgroundColor: "#4b5a68",
    color: "#fff",
    borderRadius: "25px",
    width: "150px",
    border: "1px solid transparent",

    "&:hover": {
      backgroundColor: "#F1F4F6",
      color: "#4b5a68",
      borderColor: "#4b5a68",
    },
    "&:active": {
      backgroundColor: "#F1F4F6",
      color: "#4b5a68",
      borderColor: "#4b5a68",
    },
  },
};
