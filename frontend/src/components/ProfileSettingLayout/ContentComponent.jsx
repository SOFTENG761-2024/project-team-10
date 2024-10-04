import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { borderRadius, minHeight } from "@mui/system";

export default function ContentComponent() {
  const [content1, setContent1] = useState("Content for box 1");
  const [content2, setContent2] = useState("Content for box 2");
  const [content3, setContent3] = useState("Content for box 3");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.boxesContainer}>
        <Box sx={styles.box}>
          {isEditing ? (
            <TextField
              value={content1}
              style={styles.textarea}
              onChange={(e) => setContent1(e.target.value)}
              multiline
              fullWidth
              variant="outlined"
            />
          ) : (
            <Typography>{content1}</Typography>
          )}
        </Box>
        <Box sx={styles.box}>
          {isEditing ? (
            <TextField
              value={content2}
              style={styles.textarea}
              onChange={(e) => setContent2(e.target.value)}
              multiline
              fullWidth
              variant="outlined"
            />
          ) : (
            <Typography>{content2}</Typography>
          )}
        </Box>
        <Box sx={styles.box}>
          {isEditing ? (
            <TextField
              value={content3}
              style={styles.textarea}
              onChange={(e) => setContent3(e.target.value)}
              multiline
              fullWidth
              variant="outlined"
            />
          ) : (
            <Typography>{content3}</Typography>
          )}
        </Box>
      </Box>

      {/* Edit Button */}
      <Button
        variant="contained"
        sx={styles.editButton}
        onClick={handleEditToggle}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </Box>
  );
}

// Styles
const styles = {
  textarea: {
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    backgroundColor: "#fff",
    display: "flex",
    position: "relative",
  },
  buttonsContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  boxesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "200px",
  },
  box: {
    height: "30%",
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    width: "100px",
    backgroundColor: "#666",
    position: "absolute",
    bottom: "70px",
    left: "20px",
    "&:hover": {
      backgroundColor: "#999",
    },
  },
};
