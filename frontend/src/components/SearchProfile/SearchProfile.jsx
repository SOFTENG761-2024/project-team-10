import React, { useEffect, useState, useRef } from "react";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";
import ProfileHeader from "../Profile/SidebarAndHeader/ProfileHeader";
import { Box} from "@mui/system";
import { Typography } from "@mui/material";
import { Search } from '@mui/icons-material'
import {  InputBase } from '@mui/material'
import { useSearchProfiles } from './searchProfileApi';

const CircleElement = ({ size, top, left }) => (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        position: 'absolute',
        top,
        left,
      }}
    />
  )
export const SearchProfile = () => {
    // const { get } = useAPI();
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
    const circles = [
        { size: 120, top: '15%', left: '0%' },
        { size: 80, top: '25%', left: '30%' },
        { size: 100, top: '45%', left: '0%' },
        { size: 60, top: '65%', left: '15%' },
        { size: 90, top: '10%', left: '56%' },
        { size: 70, top: '35%', left: '60%' },
        { size: 110, top: '55%', left: '70%' },
        { size: 50, top: '81%', left: '54%' },
        { size: 85, top: '20%', left: '70%' },
        { size: 75, top: '74%', left: '30%' },
        { size: 95, top: '50%', left: '35%' },
        { size: 65, top: '80%', left: '80%' },
    ]
    const { institutionGroups, loading, error, searchProfiles } = useSearchProfiles();
    
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
      setKeyword(e.target.value);
    };

    const handleSearch = () => {
      searchProfiles(keyword);
    }

     // Handle Enter Key Press
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
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
            <Box sx={{
              position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
              flex: 1, margin: 'auto auto auto auto',
              borderRadius: 4,
              overflow: 'hidden', width: '100%',
            }}>
              {loading && <Typography>Loading...</Typography>}
              { !loading && error && <Typography>{error.message}</Typography>}

              {/* Render institution circles */}
              { !loading && institutionGroups.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  {institutionGroups.map((group, index) => {
                    // Calculate the circle size based on the number of members
                    const baseSize = 80; // Smaller base circle size
                    const sizeIncrement = 5; // Adjust increment per member
                    const maxSize = 200; // Limit maximum circle size
                    const size = Math.min(baseSize + group.members.length * sizeIncrement, maxSize);

                    // Calculate font size based on the circle size
                    const fontSize = size * 0.15; // Font size is 15% of the circle size
                    const subFontSize = size * 0.1; // Smaller font for the members count

                    return (
                      <Box
                        key={group.institution.id}
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
                      >
                        {/* Display Institution Name */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: `${fontSize}px`,
                          }}
                        >
                          {group.institution.name}
                        </Typography>
                        {/* Display Number of Members in the Institution */}
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: 'center',
                            marginTop: '5px',
                            fontSize: `${subFontSize}px`,
                          }}
                        >
                          Members: {group.members.length}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                !loading && !error && (
                  <Typography sx={{ textAlign: 'center', color: '#888', fontSize: '16px' }}>
                    No details available.
                  </Typography>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    );
};
export default SearchProfile;