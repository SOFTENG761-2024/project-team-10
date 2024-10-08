import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {
  DashboardIcon,
  SettingsIcon,
  NetworkChartIcon,
  CalenderIcon,
  CircleIcon,
  CategoryIcon,
  MessageIcon,
} from "./SidebarIcons";
import { useOwnProfileAPI } from "./api";

const ProfileSidebar = () => {
  const [activeIcon, setActiveIcon] = useState();
  const { getOwnProfileData, error } = useOwnProfileAPI();
  const [ownProfileData, setOwnProfileData] = useState(null);
  const navigate = useNavigate();

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
  }, []);

  const handleIconClick = (iconName, route) => {
    setActiveIcon(iconName);
    if (route) {
      navigate(route); // Navigate only if the route is provided
    } else {
      console.log(`${iconName} page is not yet implemented.`);
    }
  };

  return (
    <Box sx={styles.sidebar}>
      <Box sx={styles.profile}>
        <img
          src={ownProfileData?.profile_picture || "/default-profile.png"}
          alt={`${ownProfileData?.first_name} ${ownProfileData?.last_name}`}
          style={styles.profileImage}
        />
      </Box>
      <Box sx={styles.sidebarContent}>
        <Box component="ul" sx={styles.sidebarList}>
          {[
            { name: "Dashboard", Icon: DashboardIcon, route: "/dashboard" },
            {
              name: "Network",
              Icon: NetworkChartIcon,
              route: "/search-profile",
            },
            { name: "Category", Icon: CategoryIcon, route: "" },
            { name: "Calendar", Icon: CalenderIcon, route: "/calendar" }, // Calendar route
            { name: "Quarter", Icon: CircleIcon, route: "" },
            { name: "Message", Icon: MessageIcon, route: "" },
            { name: "Settings", Icon: SettingsIcon, route: "/profile-setting" },
          ].map((item) => (
            <Button
              key={item.name}
              component="li"
              sx={{
                ...styles.sidebarItem,
                backgroundColor:
                  activeIcon === item.name ? "#FFFFFF" : "#4b5a68",
                marginBottom: item.name === "Message" ? "50px" : "0",
              }}
              onClick={() => handleIconClick(item.name, item.route)}
            >
              <item.Icon
                fillColor={activeIcon === item.name ? "#4b5a68" : "#FFFFFF"}
              />
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;

// Adjust styles as needed
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
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginBottom: "10px",
  },
  sidebarContent: {
    width: "100%",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  sidebarItem: {
    padding: "20px 0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    marginBottom: "0",
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#4b5a68",
    },

    "&.active": {
      backgroundColor: "#FFFFFF",
      color: "#4b5a68",
    },

    "&[data-icon='Message']": {
      marginBottom: "50px",
    },
  },

  icon: {
    width: 35,
    height: 35,
  },

  additionalGap: {
    marginBottom: "180px",
  },
};
