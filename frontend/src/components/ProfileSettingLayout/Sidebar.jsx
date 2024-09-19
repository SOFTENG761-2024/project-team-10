import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Avatar, IconButton } from '@mui/material';
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
    <div className={styles.sidebar}>
      <div className={styles.profileContainer}>
        <Avatar 
          src="https://example.com/your-profile-pic.jpg" 
          alt="Profile" 
          className={styles.profilePic}
        />
      </div>
      <div className={styles.iconContainer}>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'dashboard' ? styles.active : ''}`}
          onClick={() => handleIconClick('dashboard')}
        >
          <DashboardIcon />
        </IconButton>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'group' ? styles.active : ''}`}
          onClick={() => handleIconClick('group')}
        >
          <GroupIcon />
        </IconButton>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'apps' ? styles.active : ''}`}
          onClick={() => handleIconClick('apps')}
        >
          <AppsIcon />
        </IconButton>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'calendar' ? styles.active : ''}`}
          onClick={() => handleIconClick('calendar')}
        >
          <CalendarTodayIcon />
        </IconButton>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'time' ? styles.active : ''}`}
          onClick={() => handleIconClick('time')}
        >
          <AccessTimeIcon />
        </IconButton>
        <IconButton 
          className={`${styles.sidebarIcon} ${selected === 'chat' ? styles.active : ''}`}
          onClick={() => handleIconClick('chat')}
        >
          <ChatIcon />
        </IconButton>
      </div>
      <div 
        className={`${styles.settingsContainer} ${styles.sidebarIcon} ${selected === 'settings' ? styles.active : ''}`}
        onClick={() => handleIconClick('settings')}
      >
        <SettingsIcon />
      </div>
    </div>
  );
};

export default Sidebar;
