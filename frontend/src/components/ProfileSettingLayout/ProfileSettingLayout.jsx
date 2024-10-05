import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";
import { ProfileHeader } from "../Profile/SidebarAndHeader";
import ProfileCantEdit from "./ProfileCantEdit";
import Career from "./Career";
import { useOwnProfileAPI } from "../Profile/SidebarAndHeader/api";
import { useAPI } from "@frontend-ui/components/GlobalProviders";

const transformProfileData = (data) => {
  return {
    id: data.id,
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
    docFileThumbnail: "",
  };
};

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
  const [page, setPage] = useState("profile");
  const [profileData, setProfileData] = useState({});

  const { getOwnProfileData } = useOwnProfileAPI();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getOwnProfileData();
        setProfileData(transformProfileData(data));
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
    fetchProfileData();
  }, []);

  const { put } = useAPI();

  const handleSave = (updatedProfile) => {
    setProfileData(updatedProfile);
    put(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/userprofile/${profileData.id}`,
      transformProfileToBackend(updatedProfile),
    );
  };

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <Box sx={{ position: "fixed" }}>
        <ProfileSidebar />
        <ProfileHeader />
      </Box>
      <Box
        sx={{
          marginTop: "130px",
          marginLeft: "155px",
          marginRight: "25px",
          width: "calc(100% - 135px)",
          height: "762px",
        }}
      >
        {page === "profile" && (
          <ProfileCantEdit profile={profileData} onSave={handleSave} />
        )}
        {page === "career" && (
          <Career profile={profileData} onSave={handleSave} />
        )}
      </Box>
      {page === "profile" && (
        <Button
          sx={{
            position: "absolute",
            bottom: "60px",
            right: "50px",
            width: "100px",
            backgroundColor: "#666",
            "&:hover": {
              backgroundColor: "#999",
            },
          }}
          variant="contained"
          onClick={() => setPage("career")}
        >
          Next
        </Button>
      )}
      {page === "career" && (
        <Button
          sx={{
            position: "absolute",
            bottom: "60px",
            right: "50px",
            width: "100px",
            backgroundColor: "#666",
            "&:hover": {
              backgroundColor: "#999",
            },
          }}
          variant="contained"
          onClick={() => setPage("profile")}
        >
          Back
        </Button>
      )}
    </Box>
  );
};

export default ProfileSettingLayout;
