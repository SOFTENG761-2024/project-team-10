import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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
  const [activeIcon, setActiveIcon] = useState("Network");
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

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
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
            { name: "Dashboard", Icon: DashboardIcon },
            { name: "Network", Icon: NetworkChartIcon },
            { name: "Category", Icon: CategoryIcon },
            { name: "Calendar", Icon: CalenderIcon },
            { name: "Quarter", Icon: CircleIcon },
            { name: "Message", Icon: MessageIcon },
            { name: "Settings", Icon: SettingsIcon },
          ].map((item) => (
            <Box
              key={item.name}
              component="li"
              role="button"
              data-testid={`sidebar-icon-${item.name.toLowerCase()}`}
              sx={{
                ...styles.sidebarItem,
                backgroundColor:
                  activeIcon === item.name ? "#FFFFFF" : "#4b5a68",
                marginBottom: item.name === "Message" ? "50px" : "0",
              }}
              onClick={() => handleIconClick(item.name)}
            >
              <item.Icon
                fillColor={activeIcon === item.name ? "#4b5a68" : "white"}
              />
            </Box>
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
