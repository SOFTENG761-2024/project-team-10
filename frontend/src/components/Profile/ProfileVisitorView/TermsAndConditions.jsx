import React from "react";
import { Typography, Box } from "@mui/material";

export const TermsAndConditions = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      {" "}
      <Typography variant="body1" paragraph>
        Here are the terms and conditions for using this service. Please review
        them carefully before proceeding.
      </Typography>
    </Box>
  );
};
