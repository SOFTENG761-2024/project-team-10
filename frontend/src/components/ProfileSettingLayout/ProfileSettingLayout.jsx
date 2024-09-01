import React from 'react';
import Sidebar from "./Sidebar";
import Header from './Header';

const ProfileSettingLayout = ({ children }) => {
    return (
    
      <div className="profile-setting-layout">
        <Header/>
        <Sidebar /> 
        
        <div className="main-content">
        
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfileSettingLayout;
  
