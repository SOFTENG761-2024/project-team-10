import React from "react";
import { Box, Typography } from "@mui/material";
import { color } from "@mui/system";

const ProfileHeader = ({ profileData }) => {
  return (
    <Box sx={styles.header}>
      <Box sx={styles.nameAndDate}>
        <Typography variant="h5" component="h2" sx={styles.headerTitle}>
          Welcome,{" "}
          {profileData?.first_name + " " + profileData?.last_name ||
            "Alexa Rawus"}
        </Typography>
        <Typography variant="body2" sx={styles.headerDate}>
          Date: {profileData?.date || "Tue, 07 June 2024"}
        </Typography>
      </Box>
      <Box sx={styles.colourThemeAndMenuIcon}>
        <Box sx={styles.colourTheme}></Box>
        <Box sx={styles.menuIcon}></Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "calc(100% - 135px)",
    height: 118,
    position: "fixed",
    left: 135,
    bgcolor: "background.paper",
  },
  nameAndDate: {
    width: 300,
    textAlign: "left",
    pl: 2.5,
    mb: 1.25,
    color: "#4b5a68",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#4b5a68",
    mb: 0.5,
  },
  headerDate: {
    fontSize: "1rem",
    fontWeight: 300,
    color: "#ada7a7",
    m: 0,
  },
};
