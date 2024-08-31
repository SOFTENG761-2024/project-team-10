import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, useMediaQuery } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import CopyrightIcon from '@mui/icons-material/Copyright';
import style from './Landing.module.css';

export const Landing = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [activeSection, setActiveSection] = useState('search');

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

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
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <Box mt={10}>
      <nav style={styles.navContainer}>
        <div style={styles.verticalLine}></div>
        <div style={styles.nav}>
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
            href="#join-today"
            className={activeSection === 'join-today' ? 'active' : ''}
            style={activeSection === 'join-today' ? styles.activeNavLink : styles.navLink}
          >
            Join Today
          </a>
          <a
            href="#about-us"
            className={activeSection === 'about-us' ? 'active' : ''}
            style={activeSection === 'about-us' ? styles.activeNavLink : styles.navLink}
          >
            About us
          </a>
        </div>
      </nav>
      <section id="search">
        <div className={style.flexContainer}>
          <div className={style.topIcons}>
            <div className={style.menuIcon}>
              <img src='./landing/theme.png' className={style.themeStyle} alt="themeicon" />
            </div>
            <div className={style.menuIcon}>
              <img src='./landing/outline-1.png' className={style.menuIconStyle} alt="menuicon" />
            </div>
          </div>
          <div>
            <img src="./landing/top-image.png" className={style.topImage}></img>
          </div>
          <div className={style.searchBar}>
            <input
              type="text"
              placeholder="Search"
              className={style.searchInput}
            />
            <button className={style.searchIconButton}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </section>
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
      <section id="member">
        <div className={style.flexContainer}>
          {/* Content Sections */}
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
            <div className={style.rightSectionDiv}>
              <div className={style.rightMemberDiv}>
                <div className={`${style.section} ${style.secMemberWidth}`}>
                  <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                  <h2>
                    Unlock the Power of Collaboration and Networking</h2>
                  <p>Connect with a diverse community of researchers and experts.</p>
                </div>
                <div className={`${style.section} ${style.secMemberWidth}`}>
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
                <div className={`${style.section} ${style.secMemberWidth}`}>
                  <img src='./landing/cube.png' className={style.cubeStyle} alt="icon" />
                  <h2>Discover Expertise Across Disciplines</h2>
                  <p>Find experts based on subject, skill, or expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="join-today">
        <div className={style.flexContainer}>
          <div className={style.joinDiv}>
            <div className={`${style.leftJoin} ${style.left}`}>
              <h1>Join Today!----------</h1>
              <span>Discover the power of collaboration and innovation</span>
            </div>
            <div className={style.joinButtons}>
              <button className={style.joinButton}>Join</button>
              <button className={style.learnMoreButton}>Learn More</button>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us">
        <div className={style.footerContainer}>
          {/* <Container className={style.footer-container"> */}
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
        <div className={style.borderLine}></div>
      </section>
      <section id="about-us">
        <footer className={style.foot}>
          <div className={style.footerIconDiv}>
            <LinkedInIcon className={style.iconMargin}></LinkedInIcon>
            <XIcon className={style.iconMargin}></XIcon>
            <YouTubeIcon></YouTubeIcon>
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
      </section>
    </Box>
  );
};

// Styles for the Vertical Navigation Bar
const styles = {
  navContainer: {
    position: 'fixed',
    top: '47%',
    right: '4%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1000,
  },
  verticalLine: {
    width: '2px',
    backgroundColor: 'rgb(205 199 199)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-10px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: '10px',
    alignItems: 'flex-start',
    position: 'relative',
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
    padding: '39% 0%',
    marginBottom: '10px',
    textAlign: 'left',
    position: 'relative',
    cursor: 'pointer',
  },
  activeNavLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 0',
    marginBottom: '10px',
    textAlign: 'left',
    backgroundColor: '#3f51b5',  // Highlight color for active link
    borderRadius: '4px',  // Optional: Add some rounding for a nicer look
    fontWeight: 'bold',  // Make the text bold
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
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
  }

  nav a::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: transparent;
    border-radius: 50%;
  }
`;

// Injecting the CSS into the page
// const style = document.createElement('style');
// style.innerHTML = css;
// document.head.appendChild(style);

export default Landing;
