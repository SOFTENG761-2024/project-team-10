import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import Sidebar from "./Sidebar";
import ProfileCantEdit from './ProfileCantEdit';
import Career from './Career';
import Header from './Header'; 

const transformProfileData = (data) => {
  return {
    fullName: `${data.first_name} ${data.last_name}`,
    lastName: data.last_name,
    preferredName: data.preferred_name || data.first_name,
    email: data.primary_email,
    orcid: data.orcid_identifier,
    linkedin: data.linkedin_url ? data.linkedin_url.split("/").pop() : "",
    role: data.positions,
    affiliations: data.institution ? data.institution.name : "",
    photo: data.profile_picture,
    title: data.title,
    affiliation: data.institution ? data.institution.name : "",
    bio: data.bio,
    researchArea: data.research_area,
    skills: data.skills ? data.skills.split("\n").join(", ") : "",
    expertise: data.expertise,
    researchKeywords: data.research_tags,
    researchTags: data.research_tags,
    tools: data.tools,
    custom1: "",
    custom2: "",
    mediaFileThumbnail: "",
    docFileThumbnail: ""
  };
}

function transformProfileToBackend(profile) {
  return {
    first_name: profile.fullName.split(" ")[0],
    last_name: profile.lastName,
    preferred_name: profile.preferredName,
    primary_email: profile.email,
    orcid_identifier: profile.orcid,
    // linkedin_url: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : "",
    positions: profile.role,
    bio: profile.bio || "",
    research_area: profile.researchArea || "",
    skills: profile.skills ? profile.skills.split(", ").join("\n") : "",
    expertise: profile.expertise || "",
    research_tags: profile.researchTags || "",
    tools: profile.tools || "",
    // profile_picture: profile.photo || "",
  };
}
const ProfileSettingLayout = () => {
  const [page, setPage] = useState('profile');
  const [profileData, setProfileData] = useState({});

  const handleSave = (updatedProfile) => {
    setProfileData(updatedProfile);
    fetch("http://localhost:3000/api/userprofile/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transformProfileToBackend(updatedProfile))
    })
  };

  const fetchProfileData = async () => {
    const data = await fetch("http://localhost:3000/api/userprofile/primaryemailsheldoncaiy%40outlook.com", {
      method: "GET",
    });
    const body = await data.json()
    setProfileData(transformProfileData(body))
  }
  useEffect(() => {
    fetchProfileData();
  }, [])
  return (
    <Box>
      <Sidebar />
      <Box sx={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}>
        <Header />
        {page === 'profile' && <ProfileCantEdit profile={profileData} onSave={handleSave} />}
        {page === 'career' && <Career profile={profileData} onSave={handleSave} />}
      </Box>
      {page === 'profile' && <Button sx={{ marginLeft: '90px', marginTop: '20px' }} variant='contained' onClick={() => setPage('career')}>Next</Button>}
      {page === 'career' && <Button sx={{ marginLeft: '90px', marginTop: '20px' }} variant='contained' onClick={() => setPage('profile')}>Back</Button>}
    </Box>
  );
}

export default ProfileSettingLayout;

