import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContactForm } from "./ContactForm";
import ProfileSidebar from "../SidebarAndHeader/ProfileSidebar";
import ProfileHeader from "../SidebarAndHeader/ProfileHeader";
import { useProfileAPI } from "./api";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  GlobalStyles,
  Divider,
  Button,
  Avatar,
  Link,
} from "@mui/material";
import { padding } from "@mui/system";
import { BorderAll } from "@mui/icons-material";

//TEMPORARY VARIABLE TO CHOOSE BETWEEN DUMMY DATA OR DATA FROM THE API - REMOVE LATER - HI
let useDummyData = false;
//Hard coded email address - this will later be provided by the sign-in/sign up module - HI
let userPrimaryEmailForTesting = "natalie.baird@canterbury.ac.nz";
//TODO: REMOVE THE ABOVE LINES LATER

const tabs = [
  "About",
  "Outputs",
  "Professional",
  "Teaching/Research",
  "Contact",
];

const ProfileVisitorView = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [profileData, setProfileData] = useState(null);
  const { getProfileByid, error } = useProfileAPI();
  const { id } = useParams();

  useEffect(() => {
    if (useDummyData) {
      const dummyProfileData = {
        first_name: "Alexa",
        last_name: "Rawlus",
        date: "Tue, 07 June 2024",
        bio: "This is the About section with some introductory information.",
        picture: "/default-profile.png",
        title: "Professor",
        orcid_identifier: "0000-0002-1825-0097",
        faculty_name: "Department of Engineering",
        affiliations: "Affiliation1, Affiliation2, Affiliation3",
        research_area: "Field1, Field2, Field3",
        research_tags: "Tag1, Tag2, Tag3",
        institution_name: "The University of Canterbury",
        publications: [
          {
            title: "Publication 1",
            description: "Description of Publication 1",
          },
          {
            title: "Publication 2",
            description: "Description of Publication 2",
          },
        ],
        projects: [
          {
            title: "Project 1",
            description: "Description of Project 1",
          },
          {
            title: "Project 2",
            description: "Description of Project 2",
          },
        ],
        teachingItems: [
          {
            title: "Teaching/Research Item 1",
            description: "Description of Teaching/Research Item 1",
          },
          {
            title: "Teaching/Research Item 2",
            description: "Description of Teaching/Research Item 2",
          },
        ],
      };

      //Simulate fetching data
      setProfileData(dummyProfileData);
    } else {
      // Fetch data from API if dummy data is false
      const loadProfile = async () => {
        const data = await getProfileByid(id);
        if (data) {
          setProfileData(data);
        }
      };
      loadProfile();
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <Box sx={styles.contentBox}>
            <Typography variant="h6" sx={styles.descriptionSectionParagraph}>
              {profileData?.bio || "No data available"}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography
                variant="body1"
                sx={styles.descriptionSectionParagraph}
              >
                --BLANK FOR NOW-------
              </Typography>
              <Typography
                variant="body1"
                sx={styles.descriptionSectionParagraph}
              >
                --BLANK FOR NOW-------
              </Typography>
            </Box>

            <Box sx={styles.showcaseSection}>
              <Typography variant="h4" sx={styles.showcaseSectionHeading}>
                Key area
              </Typography>
              <Grid container spacing={2} sx={styles.showcaseGrid}>
                {[
                  {
                    title: "Showcase Work",
                    link: "/showcase-work",
                    description: "One line summary",
                    icon: "./landing/cube.png",
                  },
                  {
                    title: "Unlock the Power of Collaboration and Networking",
                    link: "/collaboration",
                    description:
                      "Connect with a diverse community of researchers and experts.",
                    icon: "./landing/cube.png",
                  },
                  {
                    title: "Discover Expertise Across Disciplines",
                    link: "/expertise",
                    description:
                      "Find experts based on subject, skill, or expertise.",
                    icon: "./landing/cube.png",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Card sx={styles.showcaseCard}>
                        <CardMedia
                          component="img"
                          sx={styles.cubeIcon}
                          image={item.icon}
                          alt={item.title}
                        />
                        <CardContent>
                          <Typography
                            variant="h5"
                            sx={styles.showcaseCardHeading}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={styles.showcaseCardParagraph}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        );

      case "Outputs":
        return (
          <Box sx={styles.contentBox}>
            {profileData?.publication?.length > 0 ? (
              profileData.publication.map((output, index) => (
                <Card key={index} sx={styles.contentItem}>
                  <CardContent>
                    <Typography variant="h6" sx={styles.contentItemHeading}>
                      {output.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.contentItemParagraph}
                    >
                      {output.link}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No publications available.
              </Typography>
            )}
          </Box>
        );

      case "Professional":
        return (
          <Box sx={styles.contentBox}>
            {profileData?.projects?.length > 0 ? (
              profileData.projects.map((project, index) => (
                <Card key={index} sx={styles.contentItem}>
                  <CardContent>
                    <Typography variant="h6" sx={styles.contentItemHeading}>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.contentItemParagraph}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No projects available.
              </Typography>
            )}
          </Box>
        );

      case "Teaching/Research":
        return (
          <Box sx={styles.contentBox}>
            {profileData?.teachingItems?.length > 0 ? (
              profileData.teachingItems.map((teaching, index) => (
                <Card key={index} sx={styles.contentItem}>
                  <CardContent>
                    <Typography variant="h6" sx={styles.contentItemHeading}>
                      {teaching.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.contentItemParagraph}
                    >
                      {teaching.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No teaching items available.
              </Typography>
            )}
          </Box>
        );

      case "Contact":
        return <ContactForm />;

      default:
        return <Box sx={styles.contentBox}>No data available</Box>;
    }
  };

  return (
    <>
      <GlobalStyles styles={styles.global} />
      <Box sx={styles.wrapperContainer}>
        <ProfileSidebar profileData={profileData} />
        <ProfileHeader profileData={profileData} />
        <Box sx={styles.profileViewContainer}>
          <Box sx={styles.basicInfo}>
            <Box sx={styles.basicInfoTopBottom}>
              <Avatar
                alt={
                  profileData?.first_name + " " + profileData?.last_name ||
                  "Profile"
                }
                src={profileData?.profile_picture || "/default-profile.png"}
                sx={styles.profilePic}
              />
              <Typography variant="h6" sx={styles.title}>
                {profileData?.title || "Title"}
              </Typography>
              <Typography variant="h5" sx={styles.headings}>
                {profileData?.first_name + " " + profileData?.last_name ||
                  "Alzxa Rawlus"}
              </Typography>
              <Divider sx={styles.lineSeparator} />

              <Typography variant="h5" sx={styles.headings}>
                <span style={styles.labelText}>ORCID ID:</span>
                <br />
                <span style={styles.contentText}>
                  {profileData?.orcid_identifier || "XXX-XXXX-XXXX"}
                </span>
              </Typography>
              <Divider sx={styles.lineSeparator} />

              <Typography variant="h6" sx={styles.headings}>
                {profileData?.department || "Department of Engineering"}
              </Typography>
              <Divider sx={styles.lineSeparator} />
            </Box>

            <Box sx={styles.basicInfoMiddle}>
              <Typography variant="h4" sx={styles.affiliations}>
                <span style={styles.labelText}>Affiliations:</span>
                <Box sx={styles.contentList}>
                  {profileData?.affiliations?.split(", ").map((item, index) => (
                    <Typography key={index} sx={styles.contentText}>
                      {item}
                    </Typography>
                  )) || (
                    <Typography sx={styles.contentText}>
                      abcd, abcd, abcd
                    </Typography>
                  )}
                </Box>
              </Typography>

              <Typography variant="h4" sx={styles.researchField}>
                <span style={styles.labelText}>Research Field:</span>
                <Box sx={styles.contentList}>
                  {profileData?.research_area?.split(",").map((item, index) => (
                    <Typography key={index} sx={styles.contentText}>
                      {item}
                    </Typography>
                  )) || (
                    <Typography sx={styles.contentText}>
                      abcd, abcd, abcd
                    </Typography>
                  )}
                </Box>
              </Typography>

              <Typography variant="h4" sx={styles.researchTags}>
                <Typography component="span" sx={styles.labelText}>
                  Research Tags:
                </Typography>
                <Box sx={styles.contentList}>
                  {profileData?.research_tags?.split(",").map((item, index) => (
                    <Typography key={index} sx={styles.contentText}>
                      {item}
                    </Typography>
                  )) || (
                    <Typography sx={styles.contentText}>
                      abcd, abcd, abcd
                    </Typography>
                  )}
                </Box>
              </Typography>
            </Box>

            <Box sx={styles.basicInfoTopBottom}>
              <Box sx={styles.university}>
                {profileData?.institution?.name || "Dummy Data University"}
              </Box>
            </Box>
          </Box>

          {/* Profile tabs and content rendering */}
          <Box sx={styles.profileTabsContent}>
            <Box sx={styles.tabs}>
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "contained" : "outlined"}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    ...styles.tabButton,
                    ...(activeTab === tab && styles.tabButtonActive),
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Box>
            <div className="tab-content">{renderTabContent()}</div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileVisitorView;

// styles.js
const styles = {
  global: {
    "html, body": {
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "hidden",
    },
  },
  wrapperContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#fff",
    position: "relative",
  },
  profileViewContainer: {
    display: "flex",
    width: "calc(100% - 130px)",
    padding: "30px",
    paddingLeft: "40px",
    marginTop: "90px",
    marginLeft: "115px",
    marginBottom: "10px",
    marginRight: "5px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  basicInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f3f5f7",
    width: "300px",
    padding: "20px",
    textAlign: "center",
    margin: "1px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    minHeight: "500px",
    height: "auto",
  },
  basicInfoTopBottom: {
    flexShrink: 0,
  },
  basicInfoMiddle: {
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5%",
  },
  headings: {
    margin: "10px 0",
  },
  affiliations: {
    textAlign: "left",
    width: "100%",
  },
  researchField: {
    textAlign: "left",
    width: "100%",
  },
  researchTags: {
    textAlign: "left",
    width: "100%",
  },
  labelText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4b5a68",
    textAlign: "left",
  },
  contentText: {
    fontSize: "14px",
    color: "#333",
    textAlign: "left",
  },
  contentList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    color: "#333",
  },
  lineSeparator: {
    width: "98%",
    height: "1px",
    background: "#000",
  },
  profilePic: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#4b5a68",
    display: "block",
    marginTop: "10px",
    marginBottom: "20px",
    margin: "0 auto",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
  },
  university: {
    background: "#4b5a6833",
    borderRadius: "8px",
    width: "226px",
    height: "40px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  profileTabsContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f3f5f7",
    marginLeft: "20px",
    marginRight: "0px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    width: "950px",
    overflowY: "auto",
    maxHeight: "calc(100vh - 160px)",
  },
  tabs: {
    display: "flex",
    height: "40px",
    top: "171px",
    left: "436px",
    gap: "0px",
    borderRadius: "8px 8px 0px 0px",
    opacity: 1,
    background: "#c0c3c680",
  },
  tabButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    border: "none",
    outline: "2px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#ddd",
    transition: "background-color 0.3s ease",
    width: "250px",
    "&:hover": {
      backgroundColor: "#bbb",
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  tabButtonActive: {
    backgroundColor: "#4b5a6880",
    color: "black",
    border: "none",
    outline: "none",
    borderRadius: "8px 8px 0 0",
  },
  contentBox: {
    flexGrow: 1,
    padding: "20px",
    backgroundColor: "#f3f5f7",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minHeight: "300px",
    overflowY: "auto",
  },
  tabContent: {
    padding: "20px",
    backgroundColor: "#f3f5f7",
    borderRadius: "4px",
    overflowY: "auto",
  },
  contentItem: {
    backgroundColor: "#fff",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "18px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  contentItemHeading: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#333",
  },
  contentItemParagraph: {
    fontSize: "16px",
    color: "#666",
  },
  aboutTab: {
    backgroundColor: "#f3f5f7",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  descriptionSectionParagraph: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#333",
    textAlign: "justify",
    marginBottom: "30px",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    marginLeft: "20px",
  },

  showcaseSection: {
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "20px",
    border: "none",
    backgroundColor: "#f3f5f7",
  },

  showcaseGrid: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  showcaseCard: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f3f5f7",
    textAlign: "left",
  },

  showcaseCardHeading: {
    color: "#333",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      color: "#1a73e8",
    },
  },

  showcaseCardParagraph: {
    fontSize: "16px",
    color: "#666",
  },

  cubeIcon: {
    padding: "5px",
    width: 40, // maintain uniform size across all cards
    height: 40,
    objectFit: "cover", // ensures the image covers the designated space well
    marginBottom: 2, // adds space below the icon
  },

  mediaQueries: {
    showcaseGrid: {
      "@media (max-width: 768px)": {
        flexDirection: "column",
        gap: "20px",
      },
    },
  },
};
