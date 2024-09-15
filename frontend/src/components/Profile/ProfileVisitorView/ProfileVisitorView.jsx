import React, { useState, useEffect } from "react";
import "./styles.css";
import { ContactForm } from "./ContactForm";
import ProfileSidebar from "../SidebarAndHeader/ProfileSidebar";
import ProfileHeader from "../SidebarAndHeader/ProfileHeader";
import { getProfileByEmail } from "./api";

//TEMPORARY VARIABLE TO CHOOSE BETWEEN DUMMY DATA OR DATA FROM THE API - REMOVE LATER - HI
let useDummyData = false;
//Hard coded email address - this will later be provided by the sign-in/sign up module - HI
let userPrimaryEmailForTesting ="natalie.baird@canterbury.ac.nz"; 
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

  useEffect(() => {
    if(useDummyData)
    {
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
  }


  else
  { 
    getProfileByEmail(userPrimaryEmailForTesting)
      .then((data) => setProfileData(data))
      .catch((err) => console.error("Error fetching profile data:", err));
  }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div>
            {profileData?.bio || "No data available"}

            <div className="description-section">
              <p>
                --BLANK FOR NOW-------
              </p>
              <p>
                --BLANK FOR NOW-------
              </p>
            </div>
            {/* Showcase Work Section */}
            <div className="showcase-section">
              <h4>Key area</h4>

              <div className="showcase-grid">
                {/* Card 1 */}
                <div className="showcase-card">
                  <h3>Showcase Work</h3>
                  <p>One line summary</p>
                </div>

                {/* Card 2 */}
                <div className="showcase-card">
                  <img src="./landing/cube.png" alt="Cube" class="cube-icon" />
                  <h3>Unlock the Power of Collaboration and Networking</h3>
                  <p>
                    Connect with a diverse community of researchers and experts.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="showcase-card">
                  <img src="./landing/cube.png" alt="Cube" class="cube-icon" />
                  <h3>Discover Expertise Across Disciplines</h3>
                  <p>Find experts based on subject, skill, or expertise.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "Outputs":
        return (
          <div>
            {profileData?.publications?.length > 0 ? (
              profileData.publications.map((publication, index) => (
                <div key={index} className="content-item">
                  <h4>{publication.title}</h4>
                  <p>{publication.description}</p>
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
            {profileData?.projects?.length > 0 ? (
              profileData.projects.map((project, index) => (
                <div key={index} className="content-item">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        );

      case "Teaching/Research":
        return (
          <div>
            {profileData?.teachingItems?.length > 0 ? (
              profileData.teachingItems.map((teaching, index) => (
                <div key={index} className="content-item">
                  <h4>{teaching.title}</h4>
                  <p>{teaching.description}</p>
                </div>
              ))
            ) : (
              <p>No teaching items available.</p>
            )}
          </div>
        );

      case "Contact":
        return <ContactForm />;

      default:
        return <div>No data available</div>;
    }
  };

  return (
    <div className="profile-visitor-view-wrapper-container">
      <ProfileSidebar />
      <ProfileHeader profileData={profileData}  />
      <div className="profile-view-container">
        <div className="basic-info">
          <div className="basic-info-top">
            <img
              src={profileData?.picture || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h3 className="title">{profileData?.title || "Title"}</h3>
            <h2 className="full-name">
              {profileData?.first_name + " " + profileData?.last_name || "Alzxa Rawlus"}
            </h2>
            <hr className="line-separator" />
            <h3 className="orc-id">
              <span className="label-text">ORCID ID:</span>
              <br />
              <span className="content-text">
                {profileData?.orcid_identifier || "XXX-XXXX-XXXX"}
              </span>
            </h3>
            <hr className="line-separator" />
            <h4 className="department">
              {profileData?.faculty_name || "Department of Engineering"}
            </h4>
            <hr className="line-separator" />
          </div>
          <div className="basic-info-middle">
            <h4 className="affiliations">
              <span className="label-text">Affiliations:</span>
              <div className="content-list">
                {["N/A", "N/A"].map((item, index) => (
                  <span key={index} className="content-text">
                    {item}
                  </span>
                )) || "abcd, abcd, abcd"}
              </div>
            </h4>
            <h4 className="research-field">
              <span className="label-text">Research Field:</span>
              <div className="content-list">
                {profileData?.research_area?.split(',').map((item, index) => (
                  <span key={index} className="content-text">
                    {item}
                  </span>
                )) || "abcd, abcd, abcd"}
              </div>
            </h4>
            {/* <h4 className="research-tags">
              <span className="label-text">Research Tags:</span>
              <div className="content-list">
                  {profileData?.research_tags?.split(',')
                   .map((item, index) => (
                    <span key={index} className="content-text">
                        {item.trim()}
                   </span>
                    )) || "abcd, abcd, abcd"}
              </div>

            </h4> */}
            <h4 className="research-tags">
              <span className="label-text">Research Tags:</span>
              <div className="content-list">
              {profileData?.research_tags?.split(',')
                   .map((item, index) => (
                    <span key={index} className="content-text">
                        {item.trim()}
                   </span>
                    )) || "abcd, abcd, abcd"}
              </div>
              </h4>
          </div>

          <div className="basic-info-bottom">
            <div className="university">
              {profileData?.institution_name || "The University of Canterbury"}
            </div>
          </div>
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
  );
};

export default ProfileVisitorView;

/*import React, { useState, useEffect } from "react";
import "./styles.css";
import { ContactForm } from "./ContactForm";
import { getProfileData } from "./api";

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
        return <div>{profileData?.about || "No data available"}</div>;

      // Outputs Tab (Publications)
      case "Outputs":
        return (
          <div>
            {profileData?.publications?.length > 0 ? (
              profileData.publications.map((publication, index) => (
                <div key={index} className="content-item">
                  <h4>{publication.title}</h4>
                  <p>{publication.description}</p>
                </div>
              ))
            ) : (
              <p>No publications available.</p>
            )}
          </div>
        );

      // Professional Tab (Projects)
      case "Professional":
        return (
          <div>
            {profileData?.projects?.length > 0 ? (
              profileData.projects.map((project, index) => (
                <div key={index} className="content-item">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        );

      // Teaching/Research Tab
      case "Teaching/Research":
        return (
          <div>
            {profileData?.teachingItems?.length > 0 ? (
              profileData.teachingItems.map((teaching, index) => (
                <div key={index} className="content-item">
                  <h4>{teaching.title}</h4>
                  <p>{teaching.description}</p>
                </div>
              ))
            ) : (
              <p>No teaching items available.</p>
            )}
          </div>
        );

      // Contact Tab with Contact Form
      case "Contact":
        return <ContactForm />;

      default:
        return <div>No data available</div>;
    }
  };

  return (
    <div className="profile-visitor-view-wrapper-container">
      <div className="sidebar"></div>
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

      <div className="profile-view-container">
        <div className="basic-info">
          <div className="basic-info-top">
            <img
              src={profileData?.picture || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h3 className="title">{profileData?.title || "Title"}</h3>
            <h2 className="full-name">
              {profileData?.fullName || "Alzxa Rawlus"}
            </h2>
            <hr className="line-separator" />
            <h3 className="orc-id">
              <span className="label-text">ORCID ID:</span>
              <br />
              <span className="content-text">
                {profileData?.orcId || "XXX-XXXX-XXXX"}
              </span>
            </h3>
            <hr className="line-separator" />
            <h4 className="department">
              {profileData?.department || "Department of Engineering"}
            </h4>
            <hr className="line-separator" />
          </div>

          <div className="basic-info-middle">
            <h4 className="affiliations">
              <span className="label-text">Affiliations:</span>
              <div className="content-list">
                {profileData?.affiliations?.map((item, index) => (
                  <span key={index} className="content-text">
                    {item}
                  </span>
                )) || "abcd, abcd, abcd"}
              </div>
            </h4>
            <h4 className="research-field">
              <span className="label-text">Research Field:</span>
              <div className="content-list">
                {profileData?.researchField?.map((item, index) => (
                  <span key={index} className="content-text">
                    {item}
                  </span>
                )) || "abcd, abcd, abcd"}
              </div>
            </h4>
            <h4 className="research-tags">
              <span className="label-text">Research Tags:</span>
              <div className="content-list">
                {profileData?.researchTags?.map((item, index) => (
                  <span key={index} className="content-text">
                    {item}
                  </span>
                )) || "abcd, abcd, abcd"}
              </div>
            </h4>
          </div>

          <div className="basic-info-bottom">
            <div className="university">
              {profileData?.university || "The University of Canterbury"}
            </div>
          </div>
        </div>

       }
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
  );
};

export default ProfileVisitorView;
*/
