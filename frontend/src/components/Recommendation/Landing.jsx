import React, { useEffect, useState, useRef } from "react";
import { Box, Container, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import style from './Landing.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { useMediaQuery } from '@mui/material';
import {
  MuiTheme,
  useAuth,
  useLocalStorage,
  useMuiTheme,
  useRoute,
} from "../GlobalProviders";

export const Landing = () => {
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const [activeSection, setActiveSection] = useState('search');
  const [positions, setPositions] = useState({ networkTop: 0, memberTop: 0 });
  const { toggleLightDarkTheme, theme } = useMuiTheme();
  const [navTop, setNavTop] = useState('33vh');
  const isTablet = useMediaQuery('(max-width:1024px)'); 
  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };
  const handleMenuClick = () => {
    navigate("/signup");  // This navigates to the /signup page
  };
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let currentSection = '';
    const searchBar = searchBarRef.current;
    if (!searchBar) return;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const middleOfWindow = window.scrollY + window.innerHeight / 2;

      if (middleOfWindow >= sectionTop && middleOfWindow < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
    const searchSection = document.getElementById('search');
    if (searchSection) {
      const searchSectionBottom = searchSection.offsetTop + searchSection.offsetHeight;
      if (currentScrollPosition < searchSectionBottom - 50) {
        setNavTop('33vh');
      } else {
        setNavTop('16vh');
      }
    }

    // if (searchSection) {
    //   const searchSectionBottom = searchSection.offsetTop + searchSection.offsetHeight;

    //   const screenWidth = window.innerWidth;

    //   let topValue;
      
    //   if (screenWidth <= 768) {
   
    //     topValue = window.innerHeight * 0.20;
    //   } else if (screenWidth <= 1024) {
     
    //     topValue = window.innerHeight * 0.34; 
    //   } else {

    //     topValue = window.innerHeight * 0.33; 
    //   }
    //   if (currentScrollPosition < searchSectionBottom - 50) {
    //     setNavTop(`${topValue}px`); 
    //   } else {
    //     setNavTop('11vh'); 
    //   }
    // }
  
    const networkSection = document.getElementById('network');
    const memberSection = document.getElementById('member');

    if (networkSection && memberSection) {
      const networkTop = networkSection ? networkSection.offsetTop : 0;
      const memberTop = memberSection ? memberSection.offsetTop : 0;
      setPositions({ networkTop, memberTop });
    }

    setPositions({
      networkTop: networkSection.offsetTop,
      memberTop: memberSection.offsetTop,
    });

    const scrollPosition = window.scrollY || window.pageYOffset;
    // const buffer = 25;
    const { networkTop, memberTop } = positions;

    const buffer = 30;
    // Add or remove sticky class based on scroll position
    if (scrollPosition >= networkTop - buffer && scrollPosition <= memberTop + buffer) {
      if (!searchBarRef.current.classList.contains(style.sticky)) {
        searchBarRef.current.classList.add(style.sticky);
      }
    } else {
      if (searchBarRef.current.classList.contains(style.sticky)) {
        searchBarRef.current.classList.remove(style.sticky);
      }
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.body.setAttribute("data-theme", theme);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, theme, handleScroll]);

  const styles = {
    navContainer: {
      position: 'fixed',
      right: '21px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      zIndex: 1000,
    },
    verticalLine: {
      width: '2px',
      backgroundColor: 'rgb(205 199 199)',
      position: 'relative',
      top: '0px',
      bottom: '0px',
      left: '-10px',
      height: '260px', // Adjust height to cover "Join Today" and "About Us"
      alignSelf: 'flex-start',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      padding: '10px',
      alignItems: 'flex-start',
      position: 'relative',
      top: navTop,
      transition: 'top 0.1s',
    },
    navLink: {
      color: 'var(--body_color)',
      textDecoration: 'none',
      padding: '5px 0px',
      textAlign: 'left',
      position: 'relative',
      cursor: 'pointer',
    },
    activeNavLink: {
      color: 'var(--body_color)',
      textDecoration: 'none',
      padding: '5px 0px 30px 0px',
      marginBottom: '10px',
      textAlign: 'left',
      borderRadius: '4px',
      fontWeight: 'bolder',
      position: 'relative',
    },
    section: {
      height: '100vh',
      padding: '20px',
      marginTop: '50px',
      border: '1px solid #ccc',
    },
  };

  // Adding the pseudo-elements through CSS
  const css = `
   nav a.active::before {
    content: '';
    position: absolute;
    left: 83px; /* Adjust this to position the dot closer or further */
    top: 31%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: var(--body_color); /* Active dot color */
    border-radius: 50%;
  }
  .new {
    margin-bottom: 129px !important;
  }
  .active {
    color: var(--body_color);
    font-weight: normal;
    background-color: transparent;
  }
  .new::after {
    content: '';
    position: absolute;
    left: 86px;
    top: 30%;
    height: 24vh;
    width: 2px;
    z-index: 0;
    background-color: gray; /* Line color */
  }
  .new.about-active::after {
    height: 24vh; /* Height change when About Us is active */
  }
  nav a::before {
    content: '';
    position: absolute;
    left: 83px; /* Adjust this to position the dot */
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: gray; /* Default dot color */
    border-radius: 50%;
  }
  `;

  // Injecting the CSS into the page
  const styleNew = document.createElement('style');
  styleNew.innerHTML = css;
  document.head.appendChild(styleNew);

  return (
    <Box sx={{ position: 'relative', minHeight: '100%', }}>
      {/* Vertical Lines */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Leftmost Line */}
        <Box sx={{ position: 'absolute', left: '8%', width: '1px', backgroundColor: 'gray', height: '100%', opacity: 0.2 }} />

        {/* Custom spacing between center lines */}
        <Box sx={{ position: 'absolute', left: '29%', width: '1px', backgroundColor: 'gray', height: '100%', opacity: 0.2 }} />
        <Box sx={{ position: 'absolute', left: '51%', width: '1px', backgroundColor: 'gray', height: '100%', opacity: 0.2 }} />
        <Box sx={{ position: 'absolute', left: '73%', width: '1px', backgroundColor: 'gray', height: '100%', opacity: 0.2 }} />
        {/* Rightmost Line */}
        <Box sx={{ position: 'absolute', right: '8%', width: '1px', backgroundColor: 'gray', height: '100%', opacity: 0.2 }} />
      </Box>
      {/* Header with Theme Toggle and Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, height: '18vh', position: 'fixed', width: '100%' }}>
        <button onClick={handleThemeSwitchClick} className={style.themeIcon}>
          <img src='./landing/theme.png' className={style.themeStyle} alt="themeicon" />
        </button>
        <button className={style.menuIcon} onClick={handleMenuClick}>
          <img src='./landing/outline-1.png' className={style.menuIconStyle} alt="menuicon" />
        </button>
      </Box>
      <Box sx={{ display: 'flex'}}>
        {/* Main Content Area */}
        <Container sx={{ maxWidth: 'md', textAlign: 'center', mt: 4, top: '16vh',marginLeft:'7%' }}>
          <Box sx={{ position: 'relative', top: '17vh' }} aria-label="connecting video">
            <video className={style.topImage} autoPlay muted playsInline loop>
              <source src="./landing/design.mp4" type="video/mp4" />
            </video>
          </Box>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '22vh' }}>
            <section id="search">
              <div className={style.searchBar} ref={searchBarRef}>
                <input
                  type="text"
                  placeholder="Search"
                  className={style.searchInput}
                />
                <button className={style.searchIconButton}>
                  <SearchIcon />
                </button>
              </div>
            </section>
          </Box>
          <Box sx={{ display: 'flex', width: isTablet? '61vw':''}}>
            <section id="network">
              <div className={style.flexContainer}>
                {/* Circle Divs */}
                <div className={style.circleContainer}>
                  <div className={`${style.circle} ${style.circle1}`}><span>AUT(3)</span></div>
                  <div className={`${style.circle} ${style.circle2}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle3}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle4}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle5}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle6}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle7}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle8}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle9}`}><span>UOA(2)</span></div>
                  <div className={`${style.circle} ${style.circle11}`}><span>UOA(2)</span></div>
                </div>
              </div>
            </section>
          </Box>
          <Box sx={{ display: 'flex', width: isTablet? '77%':'85%'}}>
            <section id="member">
              <div className={style.contentSections}>
                <div className={`${style.sectId} ${style.search}`}>
                  <h5>Connecting</h5>
                  <h2>Unlock the Power of Collaboration and Networking</h2>
                  <p>Discover a vibrant community of researchers and fellows,where you
                    can connect,collaborate, and grow together.Find experts based on
                    subject, skill or expertise and promot interdisciplinary collaboration.
                  </p>
                  <div className={style.memberButtons}>
                    <button className={style.learnMoreButton}>Learn More</button>
                    <button className={style.signUp}>Sign Up <span className={style.arrowButton}>{'>'}</span></button>
                  </div>
                </div>
                <div className={style.rightMemberDiv}>
                  <div className={`${style.section} ${style.secMemberWidth}`}>
                    <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                    <h2>
                      Unlock the Power of Collaboration and Networking</h2>
                    <p>Connect with a diverse community of researchers and experts.</p>
                  </div>
                  <div className={`${style.section} ${style.secMemberMargin}`}>
                    <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                    <h2>Promote Interdisciplinary Collaboration</h2>
                    <p>Break down barriers and foster collaboration across disciplines.</p>
                  </div>
                </div>
                <div className={style.rightMemberDiv}>
                  <div className={`${style.section} ${style.secMemberWidth}`}>
                    <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                    <h2>Discover Expertise Across Disciplines</h2>
                    <p>Find experts based on subject, skill, or expertise.</p>
                  </div>
                  <div className={`${style.section} ${style.secMargin}`}>
                    <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                    <h2>Discover Expertise Across Disciplines</h2>
                    <p>Find experts based on subject, skill, or expertise.</p>
                  </div>
                </div>
              </div>
            </section>
          </Box>
          <Box sx={{ display: 'flex'}}>
            <section id="about-us">
              <div className={style.joinDiv}>
                <div className={`${style.leftJoin} ${style.left}`}>
                  <h2>Join Today!----------</h2>
                  <span>Discover the power of collaboration and innovation</span>
                </div>
                <div className={style.joinButtons}>
                  <button className={style.joinButton}>Join</button>
                  <button className={style.learnMoreButton}>Learn More</button>
                </div>
              </div>
              <div className={style.footerContainer}>
                <div className={style.leftLogo}>
                  <h2>Logo</h2></div>
                <div className={style.about}>
                  <ul className={style.aboutList}>
                    <li>About us</li>
                    <li>Link Two</li>
                    <li>Link Three</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </section>
          </Box>
          <Box sx={{ width: '90%', maxWidth: '100%' }}>
            {/* <section id="about-us"> */}
              {/* <div className={style.footerContainer}>
                <div className={style.leftLogo}>
                  <h2>Logo</h2></div>
                <div className={style.about}>
                  <ul className={style.aboutList}>
                    <li>About us</li>
                    <li>Link Two</li>
                    <li>Link Three</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div> */}
            {/* </section> */}
          </Box>
          <Box sx={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className={style.borderLine}></div>
            <footer className={style.foot}>
              <div className={style.footerIconDiv}>
                <LinkedInIcon className={style.iconMargin}></LinkedInIcon>
                <XIcon className={style.iconMargin}></XIcon>
              </div>
              <div className={style.footerServices}>
                <div className={style.padd}>
                  <span>
                    &copy;2024.All rights reserved.
                  </span>
                </div>
                <div className={style.padd}>
                  <a href="">Privacy Policy</a>
                </div>
                <div className={style.padd}>
                  <a href="">Terms of Service</a>
                </div>
                <div className={style.padd}>
                  <a href="">Cookies Settings</a>
                </div>
              </div>
            </footer>
          </Box>
        </Container>
      </Box>
      {/* Right Sidebar with Navigation */}
      <Box sx={{ position: 'fixed', right: '7%', top: '50%', transform: 'translateY(-50%)', width: '10%' }}>
        <nav style={styles.navContainer}>
          <div style={{ ...styles.nav, top: navTop }}>
            <a
              href="#search"
              className={activeSection === 'search' ? 'active' : ''}
              style={activeSection === 'search' ? styles.activeNavLink : styles.navLink}
            >
              Search
            </a>
            <a
              href="#network"
              className={activeSection === 'network' ? 'active' : ''}
              style={activeSection === 'network' ? styles.activeNavLink : styles.navLink}
            >
              Network
            </a>
            <a
              href="#member"
              className={activeSection === 'member' ? 'active' : ''}
              style={activeSection === 'member' ? styles.activeNavLink : styles.navLink}
            >
              Members
            </a>
            <a
              href="#about-us"
              className={activeSection === 'about-us' ? 'active' : ''}
              style={activeSection === 'about-us' ? styles.activeNavLink : styles.navLink}
            >
              About Us
            </a>
          </div>
        </nav>
      </Box>
    </Box>
  );
};
export default Landing;
