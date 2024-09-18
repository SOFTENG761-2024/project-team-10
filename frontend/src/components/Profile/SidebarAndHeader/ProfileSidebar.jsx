import React from "react";
import { Box, Typography } from "@mui/material";

const ProfileSidebar = () => {
  return (
    <Box sx={styles.sidebar}>
      <Box sx={styles.sidebarContent}>
        <Typography variant="h6" sx={{ margin: "20px 0" }}>
          Sidebar Title
        </Typography>
        <Box component="ul" sx={styles.sidebarList}>
          <Box component="li" sx={styles.sidebarItem}>
            Link 1
          </Box>
          <Box component="li" sx={styles.sidebarItem}>
            Link 2
          </Box>
          <Box component="li" sx={styles.sidebarItem}>
            Link 3
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;

const styles = {
  sidebar: {
    width: 135,
    height: "100%",
    bgcolor: "#4b5a68",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    paddingTop: 2,
    marginRight: 5,
  },
  sidebarContent: {
    textAlign: "left",
  },
  sidebarList: {
    listStyle: "none",
    p: 0,
    m: 0,
    width: "100%",
  },
  sidebarItem: {
    my: 2,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    textAlign: "center",
  },
};
