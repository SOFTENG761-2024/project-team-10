import React from 'react';
import Sidebar from "./Sidebar";
import Header from './Header';
import ContentComponent from './ContentComponent';


const ProfileSettingLayout = ({ children }) => {
  return (

    <div className="profile-setting-layout">
      <Header />
      <Sidebar />

      <div className="main-content">
        <ContentComponent />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingLayout;

