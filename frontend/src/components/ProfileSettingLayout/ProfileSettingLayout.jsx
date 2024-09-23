import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Sidebar from "./Sidebar";
import ProfileCantEdit from './ProfileCantEdit';
import Career from './Career';
import Header from './Header'; 

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
    <Box>
      <Sidebar />
      <Box sx={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}>
        <Header />
        {page === 'profile' && <ProfileCantEdit profile={profileData} />}
        {page === 'career' && <Career profile={profileData} onSave={handleSave} />}
      </Box>
      {page === 'profile' && <Button sx={{ marginLeft: '90px', marginTop: '20px' }} variant='contained' onClick={() => setPage('career')}>Next</Button>}
      {page === 'career' && <Button sx={{ marginLeft: '90px', marginTop: '20px' }} variant='contained' onClick={() => setPage('profile')}>Back</Button>}
    </Box>
  );
}

export default ProfileSettingLayout;

