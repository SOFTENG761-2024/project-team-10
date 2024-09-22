import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOwnProfileAPI } from "./api";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { getOwnProfileData, error } = useOwnProfileAPI();
  const [ownProfileData, setOwnProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getOwnProfileData();
        setOwnProfileData(profileData);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [getOwnProfileData]);

  //get the current date in a readable format
  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("en-GB", options);
  };

  const handleMenuClick = () => {
    navigate("/");
  };

  const handleThemeSwitchClick = () => {
    // Logic to handle theme toggle
  };

  return (
    <Box sx={styles.header}>
      <Box sx={styles.nameAndDate}>
        <Typography variant="h5" component="h2" sx={styles.headerTitle}>
          Welcome,{" "}
          {ownProfileData?.first_name + " " + ownProfileData?.last_name ||
            "Alexa Rawus"}
        </Typography>
        <Typography variant="body2" sx={styles.headerDate}>
          {getCurrentDate()}
        </Typography>
      </Box>
      <Box sx={styles.iconContainer}>
        <button onClick={handleThemeSwitchClick} style={styles.themeIcon}>
          <img
            src="/landing/theme.png"
            style={styles.iconImage}
            alt="Theme Icon"
          />
        </button>
        <button onClick={handleMenuClick} style={styles.menuIcon}>
          <img
            src="/landing/outline-1.png"
            style={styles.iconImage}
            alt="Menu Icon"
          />
        </button>
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
    height: "118px",
    position: "fixed",
    left: "135px",
    background: "#F9F9F9",
  },
  nameAndDate: {
    width: "400px",
    textAlign: "left",
    pl: "2.5rem",
    mb: "1.25rem",
    color: "#4b5a68",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#4b5a68",
    mb: "0.5rem",
  },
  headerDate: {
    fontSize: "1rem",
    fontWeight: "300",
    color: "#ada7a7",
    margin: "0",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mr: "50px",
    gap: "10px",
  },
  themeIcon: {
    width: "42px",
    height: "33px",
    border: "2px solid black",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  menuIcon: {
    width: "42px",
    height: "33px",
    border: "2px solid black",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};
