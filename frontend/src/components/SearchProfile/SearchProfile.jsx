import React, {  useState } from "react";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";
import ProfileHeader from "../Profile/SidebarAndHeader/ProfileHeader";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Search } from '@mui/icons-material'
import { InputBase } from '@mui/material'
import { useSearchProfiles } from './searchProfileApi';
import { useNavigate } from "react-router-dom";

export const SearchProfile = () => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const profileData = {
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
  const { institutionGroups, loading, error, searchProfiles } = useSearchProfiles();
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setActiveTab("Institution");
    setSelectedInstitution(null);
    setSelectedFaculty(null);
    searchProfiles(keyword);
  }

  // Handle Enter Key Press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProfileClick = (profileId) => {
    navigate(`/profile-visitor/${profileId}`);
  };
  const renderSearchCircles = (institutionGroups, loading) => {
    if (loading || institutionGroups.length === 0) return null;

    const baseSize = 100;
    const sizeIncrement = 15;
    const maxSize = 200;

    switch (activeTab) {
      case "Institution": {
        return institutionGroups.map((group, index) => {
          const size = Math.min(baseSize + group.totalMembers * sizeIncrement, maxSize);
          return (
            <Box
              key={index}
              sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
              onClick={() => {
                setSelectedInstitution(group);
                setActiveTab("Faculty");

              }}
            >
              <Typography variant="body2" sx={{ fontSize: '14px', textAlign: 'center' }}>
                {group.institution.name} ({group.totalMembers})
              </Typography>
            </Box>
          );
        });
      }
      case "Faculty": {
        if (!selectedInstitution) return null;
        return selectedInstitution.faculties.map((faculty, facultyIndex) => {
          const size = Math.min(baseSize + faculty.members.length * sizeIncrement, maxSize);
          return (
            <Box
              key={`${facultyIndex}`}
              sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
              onClick={() => {
                setSelectedFaculty(faculty);
                setActiveTab("Profiles");
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '14px', textAlign: 'center' }}>
                {faculty.faculty.name} ({faculty.members.length})
              </Typography>
            </Box>
          );
        });
      }
      case "Profiles": {
        if (!selectedInstitution) return null;
        if (!selectedFaculty) return null;
        const container = document.getElementById('circleContainer');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const margin = 230;
        const size = 100;
        return selectedFaculty.members.map((member, memberIndex) => {
          const rows = Math.ceil(Math.sqrt(selectedFaculty.members.length));
          const columns = Math.ceil(selectedFaculty.members.length / rows);

          const horizontalSpacing = (containerWidth - margin * 2 - size) / (columns - 1);
          const verticalSpacing = (containerHeight - margin * 2 - size) / (rows - 1);

          const row = Math.floor(memberIndex / columns);
          const column = memberIndex % columns;

          // Add randomness to make positions more organic
          const topPosition = margin + row * verticalSpacing + (Math.random() * 10); // ±15px for randomness
          const leftPosition = margin + column * horizontalSpacing + (Math.random() * 30);

          return (
            <Box
              key={`${memberIndex}`}
              sx={{
                position: 'absolute', // Make circles absolutely positioned
                top: `${topPosition}px`,
                left: `${leftPosition}px`,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectedFaculty(null);
                setSelectedInstitution(null);
                handleProfileClick(member.id);
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '14px', textAlign: 'center' }}>
                {member.name}
              </Typography>
            </Box>
          );
        });
      }
      default:
        return;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#F9F9F9', overflow: 'hidden' }}>
      <ProfileSidebar profileData={{}} /> {/* Adjust profileData accordingly */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <ProfileHeader profileData={{}} /> {/* Adjust profileData accordingly */}
        <Box sx={{
          height: '76%', width: '87%', margin: '8% 0% 0% 10%', borderRadius: '17px', padding: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'white'
        }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#f5f5f5',
            borderRadius: 4,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}>
            <Box sx={{ mb: 3, display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', width: '75%', bgcolor: 'white', borderRadius: 30, border: 'solid 1px #888484' }}>
                <InputBase
                  sx={{ ml: 5, flex: 1, width: '100%', padding: '8px' }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  value={keyword}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <Search
                  sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'action.active' }}
                  onClick={handleSearch}
                />
              </Box>
            </Box>
            <Box id="circleContainer" sx={{
              position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
              flex: 1, margin: 'auto auto auto auto',
              borderRadius: 4,
              overflow: 'hidden', width: '100%',
            }}>
              {loading && <Typography>Loading...</Typography>}
              {!loading && error && <Typography>{error.message}</Typography>}
              <div>
                {renderSearchCircles(institutionGroups, loading)}
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SearchProfile;