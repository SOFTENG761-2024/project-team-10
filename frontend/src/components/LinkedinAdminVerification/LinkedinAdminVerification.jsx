import React, { useState } from "react";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";
import { ProfileHeader } from "../Profile/SidebarAndHeader";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  TextField,
  Paper,
  Button,
  GlobalStyles,
} from "@mui/material";
import { borderRadius, display, height, padding, width } from "@mui/system";

const LinkedinAdminVerification = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <GlobalStyles styles={styles.global} />
      <Box sx={styles.wrapperContainer}>
        <ProfileSidebar />
        <ProfileHeader />
        <Box sx={styles.adminTabContainer}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={styles.tabStyle}
          >
            <Tab label="New Request" />
            <Tab label="Approved" />
          </Tabs>
          <Grid container spacing={2} sx={styles.gridContentContainer}>
            {[1, 2, 3, 4].map((item, index) => (
              <Paper sx={styles.paperStyle} key={index}>
                <Grid container spacing={2} alignItems="center">
                  {/* First row: First Name, Last Name, and Approve Button */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      size="small"
                      sx={styles.textFieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      sx={styles.textFieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={styles.buttonStyle}
                    >
                      Approve
                    </Button>
                  </Grid>

                  {/* Second row: Email ID and Organization */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Email ID"
                      variant="outlined"
                      size="small"
                      sx={styles.textFieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Organization"
                      variant="outlined"
                      size="small"
                      sx={styles.textFieldStyle}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LinkedinAdminVerification;

// styles.js
const styles = {
  global: {
    "html, body": {
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "hidden",
    },
  },
  wrapperContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#F9F9F9",
    position: "relative",
  },
  adminTabContainer: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 135px)",
    padding: "30px",
    paddingLeft: "20px",
    marginTop: "80px",
    marginLeft: "155px",
    marginBottom: "50px",
    marginRight: "25px",
    backgroundColor: "#F9F9F9",
    borderRadius: "15px",
  },
  tabStyle: {
    "& .MuiTabs-flexContainer": {
      width: "500px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "8px 8px 0 0",
    },
    "& .MuiTab-root": {
      minWidth: "200px",
      height: "40px",
      color: "#000000",
      fontSize: "20px",
      fontWeight: "500",
      textTransform: "none",
      marginRight: "24px",
      borderRadius: "8px 8px 0 0",
      background: "#c0c3c680",

      "&:last-child": {
        marginRight: 0,
      },
    },
    "& .Mui-selected": {
      backgroundColor: "#4B5A6880",
      color: "#000000",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },

  gridContentContainer: {
    display: "flex",
    width: "100%",
    padding: "10px",
    paddingLeft: "15px",
    marginBottom: "50px",
    marginRight: "5px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  paperStyle: {
    margin: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    width: "1350px",
    padding: "30px",
  },
  textFieldStyle: {
    margin: "8px 0",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0,0,0,0.12)", // Subtle border for text fields
      },
    },
  },
  buttonStyle: {
    marginTop: "10px",
    alignSelf: "flex-end", // Align the button to the end of the flex container
    backgroundColor: "#4CAF50", // Primary button color
    color: "white",
    "&:hover": {
      backgroundColor: "#388E3C",
    },
  },
};
