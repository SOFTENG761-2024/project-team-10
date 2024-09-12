import React, { useState, useEffect } from "react";
import "./styles.css";
import { ContactForm } from "./ContactForm";
import { getProfileData } from "./api";

// Tabs array
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

  useEffect(() => {
    getProfileData()
      .then((data) => setProfileData(data))
      .catch((err) => console.error("Error fetching profile data:", err));
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div>
            <p>{profileData?.about || "About information is not available"}</p>
            <div className="about-content">
              <h3>Key Area: Showcase Work</h3>
              <p>One line summary of your work</p>
              <div className="about-icons">
                <div>
                  <h4>Unlock the Power of Collaboration</h4>
                  <p>
                    Connect with a diverse community of researchers and experts.
                  </p>
                </div>
                <div>
                  <h4>Discover Expertise Across Disciplines</h4>
                  <p>Find experts based on subject, skill, or expertise.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "Outputs":
        // Map through publications to dynamically create items
        return (
          <div>
            {profileData?.outputs?.length > 0 ? (
              profileData.outputs.map((output, index) => (
                <div key={index} className="output-item">
                  <h4>Publication {index + 1}</h4>
                  <p>{output}</p>
                </div>
              ))
            ) : (
              <p>No publications available.</p>
            )}
          </div>
        );

      case "Professional":
        return (
          <div>
            {profileData?.professional?.map((project, index) => (
              <div key={index} className="project-item">
                <h4>Project {index + 1}</h4>
                <p>{project || "No project data available"}</p>
              </div>
            ))}
          </div>
        );

      case "Teaching/Research":
        return (
          <div>
            {profileData?.teaching?.map((teachingItem, index) => (
              <div key={index} className="teaching-item">
                <h4>Teaching Item {index + 1}</h4>
                <p>{teachingItem || "No teaching/research data available"}</p>
              </div>
            ))}
          </div>
        );

      case "Contact":
        return <ContactForm />;
      default:
        return <div>No data available</div>;
    }
  };

  return (
    <div className="wrapper-container">
      <div className="profile-visitor-view">
        <div className="header">
          <div className="name-and-date">
            <h2>Welcome, {profileData?.name || "Alzxa Rawlus"}</h2>
            <p>Date: {profileData?.date || "Tue, 07 June 2024"}</p>
          </div>
          <div className="colourtheme-and-menuicon">
            <div className="colour-theme"></div>
            <div className="menu-icon"></div>
          </div>
        </div>
        <div className="sidebar"></div>

        <div className="profile-container">
          <div className="basic-info">
            <img
              src={profileData?.picture || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h3 className="title">{profileData?.title || "Loading..."}</h3>
            <h2 className="full-name">
              {profileData?.fullName || "Loading..."}
            </h2>
            <h3 className="orc-id">
              ORCID ID: {profileData?.orcId || "ORCID: XXX-XXXX-XXXX"}
            </h3>
            <h4 className="department">{profileData?.department}</h4>
            <h4 className="affiliation">{profileData?.affiliation}</h4>
            <h4 className="research-field">{profileData?.researchField}</h4>
            <h4 className="research-tags">{profileData?.researchTags}</h4>
            <h4 className="university">{profileData?.university}</h4>
          </div>

          {/* Profile tabs and content rendering */}
          <div className="profile-tabs-content">
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVisitorView;
