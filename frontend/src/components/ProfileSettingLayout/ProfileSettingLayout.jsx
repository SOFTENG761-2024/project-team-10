import React from 'react';
import Sidebar from "./Sidebar";
import Header from './Header';
import ContentComponent from './ContentComponent';
import './ProfileSettingLayout.css'


const ProfileSettingLayout = () => {
  return (
    <>
      <div className="profile-setting-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <ContentComponent />
        </div>
        </div>
    </>
  );
}

export default ProfileSettingLayout;

