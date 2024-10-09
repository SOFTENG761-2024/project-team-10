import React, { useState } from "react";
import styles from "./Career.module.css";
import { Button, TextField, Tabs, Tab, Box, Typography } from "@mui/material";
import ContentComponent from "./ContentComponent";

const Career = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [tab, setTab] = useState("about");

  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className={styles.career}>
      <Box className={styles.career__tab_navigation}>
        <Button
          sx={{
            padding: "10px 20px",
            backgroundColor: tab === "about" ? "#a0a0a0" : "#e0e0e0",
            color: tab === "about" ? "white" : "#333",
            borderRadius: "4px",
            marginRight: "5px",

            cursor: "pointer",
            "&:hover": {
              backgroundColor: tab === "about" ? "#909090" : "#d0d0d0",
            },
          }}
          onClick={() => setTab("about")}
        >
          About
        </Button>
        <Button
          sx={{
            padding: "10px 20px",
            backgroundColor: tab === "publications" ? "#a0a0a0" : "#e0e0e0",
            color: tab === "publications" ? "white" : "#333",
            borderRadius: "4px",
            marginRight: "5px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: tab === "publications" ? "#909090" : "#d0d0d0",
            },
          }}
          onClick={() => setTab("publications")}
        >
          Publications
        </Button>
        <Button
          sx={{
            padding: "10px 20px",
            backgroundColor: tab === "professional" ? "#a0a0a0" : "#e0e0e0",
            color: tab === "professional" ? "white" : "#333",
            borderRadius: "4px",
            marginRight: "5px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: tab === "professional" ? "#909090" : "#d0d0d0",
            },
          }}
          onClick={() => setTab("professional")}
        >
          Professional
        </Button>
        <Button
          sx={{
            padding: "10px 20px",
            backgroundColor: tab === "teaching" ? "#a0a0a0" : "#e0e0e0",
            color: tab === "teaching" ? "white" : "#333",
            borderRadius: "4px",
            marginRight: "5px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: tab === "teaching" ? "#909090" : "#d0d0d0",
            },
          }}
          onClick={() => setTab("teaching")}
        >
          Teaching /Research
        </Button>
      </Box>
      {tab === "about" && (
        <Box className={styles.career__content}>
          <Box className={styles.career__detail_row}>
            <Box
              className={`${styles.career__detail_item} ${styles.career__detail_item_full_width}`}
            >
              <Typography component="label">Bio</Typography>
              <TextField
                multiline
                rows={4}
                disabled={!isEditing}
                value={editedProfile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "80px" },
                }}
              />
            </Box>
          </Box>
          <Box className={styles.career__detail_row}>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Research area</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.researchArea}
                onChange={(e) =>
                  handleInputChange("researchArea", e.target.value)
                }
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Skills:</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
          </Box>
          <Box className={styles.career__detail_row}>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Expertise</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.expertise}
                onChange={(e) => handleInputChange("expertise", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Research Keywords</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.researchKeywords}
                onChange={(e) =>
                  handleInputChange("researchKeywords", e.target.value)
                }
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
          </Box>
          <Box className={styles.career__detail_row}>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Research Tags</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.researchTags}
                onChange={(e) =>
                  handleInputChange("researchTags", e.target.value)
                }
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Tools:</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.tools}
                onChange={(e) => handleInputChange("tools", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
          </Box>
          <Box className={styles.career__detail_row}>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Custom</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.custom1}
                onChange={(e) => handleInputChange("custom1", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "90px" },
                }}
              />
            </Box>
            <Box className={styles.career__detail_item}>
              <Typography component="label">Custom</Typography>
              <TextField
                type="text"
                disabled={!isEditing}
                value={editedProfile.custom2}
                onChange={(e) => handleInputChange("custom2", e.target.value)}
                fullWidth
                InputProps={{
                  style: { height: "90px" },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "40px" }}>
            <Box className={styles.career__detail_row}>
              <Box
                className={`${styles.career__detail_item} ${styles.career__detail_item_full_width}`}
              >
                <Typography component="label">Media File Thumbnail</Typography>
                <TextField
                  multiline
                  rows={4}
                  disabled={!isEditing}
                  value={editedProfile.mediaFileThumbnail}
                  onChange={(e) =>
                    handleInputChange("mediaFileThumbnail", e.target.value)
                  }
                  fullWidth
                  InputProps={{
                    style: { height: "100px" },
                  }}
                />
              </Box>
            </Box>
            <Box className={styles.career__detail_row}>
              <Box
                className={`${styles.career__detail_item} ${styles.career__detail_item_full_width}`}
              >
                <Typography component="label">Doc File Thumbnail</Typography>
                <TextField
                  multiline
                  rows={4}
                  disabled={!isEditing}
                  value={editedProfile.docFileThumbnail}
                  onChange={(e) =>
                    handleInputChange("docFileThumbnail", e.target.value)
                  }
                  fullWidth
                  InputProps={{
                    style: { height: "100px" },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            className={styles.career__edit_button}
            sx={{
              mt: "20px",
              width: "100px",
              backgroundColor: "#666",
              "&:hover": {
                backgroundColor: "#999",
              },
            }}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      )}
      {tab !== "about" && <ContentComponent />}
    </div>
  );
};

export default Career;