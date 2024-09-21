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
  Typography,
} from "@mui/material";

const LinkedinAdminVerification = () => {
  const [value, setValue] = useState(0);

  // Used Dummy data to check
  const [newRequests, setNewRequests] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      organization: "Tech Corp",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      organization: "Innovate Inc",
    },
    {
      firstName: "Sam",
      lastName: "Wilson",
      email: "sam.wilson@example.com",
      organization: "Design Co",
    },
    {
      firstName: "Alice",
      lastName: "Brown",
      email: "alice.brown@example.com",
      organization: "DevHub",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      organization: "Tech Corp",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      organization: "Innovate Inc",
    },
    {
      firstName: "Sam",
      lastName: "Wilson",
      email: "sam.wilson@example.com",
      organization: "Design Co",
    },
    {
      firstName: "Alice",
      lastName: "Brown",
      email: "alice.brown@example.com",
      organization: "DevHub",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      organization: "Tech Corp",
    },
  ]);

  const [approvedPeople, setApprovedPeople] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle approving a person
  const handleApprove = (index) => {
    const personToApprove = newRequests[index];

    // remove the approved person
    const updatedNewRequests = [...newRequests];
    updatedNewRequests.splice(index, 1);

    // add the approved person to the approved array
    setApprovedPeople([...approvedPeople, personToApprove]);
    setNewRequests(updatedNewRequests);
  };

  // decide that which data to show based on the selected tab
  const dataToShow = value === 0 ? newRequests : approvedPeople;

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
            sx={styles.tabContainerStyle}
          >
            <Tab label="New Request" sx={styles.tabStyle} />
            <Tab label="Approved" sx={styles.tabStyle} />
          </Tabs>

          <Grid container spacing={2} sx={styles.gridContentContainer}>
            {dataToShow.length === 0 ? (
              <p style={styles.noDataStyle}>
                No {value === 0 ? "new requests" : "approved people"} available.
              </p>
            ) : (
              dataToShow.map((item, index) => (
                <Paper sx={styles.paperStyle} key={index}>
                  <Grid container spacing={2} alignItems="center">
                    {value === 0 ? (
                      <>
                        <Grid item xs={12} sm={3} md={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={item.firstName}
                            sx={{
                              ...styles.textFieldStyle,
                              mr: "20px",
                              width: "480px",
                            }}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={item.lastName}
                            sx={{
                              ...styles.textFieldStyle,
                              ml: "180px",
                              width: "480px",
                            }}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              ...styles.buttonStyle,
                              ml: "400px",
                              mb: "10px",
                              width: "237px",
                            }}
                            onClick={() => handleApprove(index)}
                          >
                            Approve
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={item.email}
                            sx={{
                              ...styles.textFieldStyle,
                              mr: "0px",
                              width: "630px",
                            }}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={item.organization}
                            sx={{
                              ...styles.textFieldStyle,
                              ml: "230px",
                              width: "630px",
                            }}
                            disabled
                          />
                        </Grid>
                      </>
                    ) : (
                      // Approved tab - displaying text
                      <>
                        <Grid item xs={12} sm={3} md={3}>
                          <Typography sx={styles.typographyStyle}>
                            {item.firstName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Typography sx={styles.typographyStyle}>
                            {item.lastName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Typography sx={styles.typographyStyle}>
                            {item.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Typography sx={styles.typographyStyle}>
                            {item.organization}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Paper>
              ))
            )}
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
    margin: "80px 25px 50px 155px",
    backgroundColor: "#F9F9F9",
    borderRadius: "15px",
  },
  tabStyle: {
    fontWeight: "500px",
    fontSize: "20px",
    color: "black",
    textTransform: "none",
    "&.Mui-selected": {
      color: "white",
    },
  },
  tabContainerStyle: {
    "& .MuiTabs-flexContainer": {
      width: "500px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "8px 8px 0 0",
    },
    "& .MuiTab-root": {
      minWidth: "200px",
      height: "40px",
      marginRight: "24px",
      borderRadius: "8px 8px 0 0",
      background: "#c0c3c680",
    },
    "& .Mui-selected": {
      backgroundColor: "#4B5A68",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },

  gridContentContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxHeight: "calc(120vh - 250px)",
    overflowY: "auto",
    padding: "10px",
    paddingLeft: "15px",
    marginTop: "5px",
    marginRight: "5px",
    backgroundColor: "white",
    borderRadius: "25px",
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
    maxHeight: "calc(120vh - 250px)",
  },
  textFieldStyle: {
    margin: "8px 0",
    backgroundColor: "#E0E0E0B2",
    "& .MuiInputBase-input": {
      fontSize: "18px",
      color: "#000000",
      fontWeight: "600",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0,0,0,0.12)",
      },
    },
  },
  buttonStyle: {
    marginTop: "10px",
    alignSelf: "flex-end",
    backgroundColor: "#4b5a68",
    color: "white",
    fontSize: "16px",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: "#4B5A6880",
      color: "#000000",
    },
  },
  typographyStyle: {
    mb: "20px",
    mt: "1px",
    borderRadius: "4px",
    width: "100%",
    height: "10px",
    fontSize: "20px",
    color: "#606060",
    fontWeight: "500",
  },

  noDataStyle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#606060",
    textAlign: "center",
    padding: "20px",
    width: "100%",
  },
};
