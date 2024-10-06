import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Picture icon1
import MenuIcon from '@mui/icons-material/Menu';  // Picture icon2
import { useMuiTheme } from '../GlobalProviders';

const Header = () => {
  const currentDate = new Date();

  const weekday = currentDate.toLocaleDateString('en-GB', { weekday: 'short' });
  const day = currentDate.toLocaleDateString('en-GB', { day: '2-digit' });
  const month = currentDate.toLocaleDateString('en-GB', { month: 'long' });
  const year = currentDate.toLocaleDateString('en-GB', { year: 'numeric' });

  const formattedDate = `${weekday}, ${day} ${month} ${year}`;

  const { toggleLightDarkTheme, theme } = useMuiTheme();

  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={styles.welcomeText}>
            Welcome, Alzxa Rawlus
          </Typography>
          <Typography variant="body2" sx={styles.dateText}>
            {formattedDate}
          </Typography>
        </Box>
        <Box sx={styles.iconContainer}>
          <IconButton onClick={handleThemeSwitchClick} color="inherit">
            <Brightness4Icon />
          </IconButton>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: {
    backgroundColor: '#f7f7f7',
    color: '#333',
    // Adjust based on your layout
  },
  welcomeText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: '14px',
    fontWeight: 300,
    color: '#aaa',
  },
  iconContainer: {
    display: 'flex',
    
    gap: '5px',
  },
};

export default Header;
