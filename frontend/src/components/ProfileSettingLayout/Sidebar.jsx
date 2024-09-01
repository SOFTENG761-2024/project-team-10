import React, { useState } from 'react';
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const [selected, setSelected] = useState(null);

  const handleIconClick = (iconName) => {
    setSelected(iconName);
  };

  return (
    <div className="sidebar">
      <div className="profile-container">
        <img 
          src="https://example.com/your-profile-pic.jpg" 
          alt="Profile" 
          className="profile-pic"
        />
      </div>
      <div className="icon-container">
        <div 
          className={`sidebar-icon ${selected === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleIconClick('dashboard')}
        >
          <DashboardIcon />
        </div>
        <div 
          className={`sidebar-icon ${selected === 'group' ? 'active' : ''}`}
          onClick={() => handleIconClick('group')}
        >
          <GroupIcon />
        </div>
        <div 
          className={`sidebar-icon ${selected === 'apps' ? 'active' : ''}`}
          onClick={() => handleIconClick('apps')}
        >
          <AppsIcon />
        </div>
        <div 
          className={`sidebar-icon ${selected === 'calendar' ? 'active' : ''}`}
          onClick={() => handleIconClick('calendar')}
        >
          <CalendarTodayIcon />
        </div>
        <div 
          className={`sidebar-icon ${selected === 'time' ? 'active' : ''}`}
          onClick={() => handleIconClick('time')}
        >
          <AccessTimeIcon />
        </div>
        <div 
          className={`sidebar-icon ${selected === 'chat' ? 'active' : ''}`}
          onClick={() => handleIconClick('chat')}
        >
          <ChatIcon />
        </div>
      </div>
      <div 
        className={`settings-container ${selected === 'settings' ? 'active' : ''}`}
        onClick={() => handleIconClick('settings')}
      >
        <SettingsIcon className="sidebar-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
