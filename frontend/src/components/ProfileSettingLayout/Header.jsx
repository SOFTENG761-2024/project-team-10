import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Picture icon1
import MenuIcon from '@mui/icons-material/Menu';  // Picture icon2

const Header = () => {
    const currentDate = new Date();
    
    const weekday = currentDate.toLocaleDateString('en-GB', { weekday: 'short' });
    const day = currentDate.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = currentDate.toLocaleDateString('en-GB', { month: 'long' });
    const year = currentDate.toLocaleDateString('en-GB', { year: 'numeric' });
  
    const formattedDate = `${weekday}, ${day} ${month} ${year}`;
  

  return (
    <header style={styles.headerContainer}>
      <div>
        <h2 style={styles.welcomeText}>Welcome, Alzxa Rawlus</h2>
        <p style={styles.dateText}>{formattedDate}</p>
      </div>
      <div style={styles.iconContainer}>
        <IconButton style={styles.iconButton}>
          <Brightness4Icon />
        </IconButton>
        <IconButton style={styles.iconButton}>
          <MenuIcon />
        </IconButton>
      </div>
    </header>
  );
};

const styles = {
  headerContainer: {
    marginLeft: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f7f7f7',
  },
  welcomeText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    margin: 0,
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',  
    fontWeight: 300,  
    color: '#aaa',  
  },
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  iconButton: {
    padding: '5px',
  },
};

export default Header;
