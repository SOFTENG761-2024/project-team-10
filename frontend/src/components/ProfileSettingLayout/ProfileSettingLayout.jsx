import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import ProfileCantEdit from './ProfileCantEdit';
import Career from './Career';
import Header from './Header'; 
import './ProfileSettingLayout.css';

const profile = {
  fullName: "John Doe",
  lastName: "Doe",
  preferredName: "John",
  email: "john.doe@example.com",
  orcid: "0000-0001-2345-6789",
  linkedin: "john-doe",
  role: "Researcher",
  affiliations: "University of Example",
  photo: "https://example.com/photo.jpg",
  title: "Senior Researcher",
  affiliation: "University of Example",
  bio: "Bio content here...",
  researchArea: "abc, abc, abc, abc, abc",
  skills: "abc, abc, abc, abc",
  expertise: "abc",
  researchKeywords: "abc",
  researchTags: "abc",
  tools: "abc",
  custom1: "abc",
  custom2: "abc",
  mediaFileThumbnail: "Media File Thumbnail content here...",
  docFileThumbnail: "Doc File Thumbnail content here..."
};

const ProfileSettingLayout = () => {
  const [page, setPage] = useState('profile');
  const [profileData, setProfileData] = useState(profile);

  const handleSave = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  return (
    <div className="profile-setting-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        {page === 'profile' && <ProfileCantEdit profile={profileData} />}
        {page === 'career' && <Career profile={profileData} onSave={handleSave} />}
      </div>
      {page === 'profile' && <button className="button" onClick={() => setPage('career')}>Next</button>}
      {page === 'career' && <button className="button" onClick={() => setPage('profile')}>Back</button>}
    </div>
  );
}

export default ProfileSettingLayout;

