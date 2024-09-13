import React from "react";
import "./SidebarAndHeaderStyle.css";

const ProfileHeader = ({ profileData }) => {
  return (
    <div className="header">
      <div className="name-and-date">
        <h2>Welcome, {profileData?.name || "Alzxa Rawlus"}</h2>
        <p>Date: {profileData?.date || "Tue, 07 June 2024"}</p>
      </div>
      <div className="colourtheme-and-menuicon">
        <div className="colour-theme"></div>
        <div className="menu-icon"></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
