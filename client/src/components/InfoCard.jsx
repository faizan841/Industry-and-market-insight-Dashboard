// src/components/InfoCard.js
import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const InfoCard = ({ title, count, icon: Icon }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.50rem 1.5rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ fontSize: 40, marginBottom: theme.spacing(1) }}>
          <Icon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h5" component="div" align="center">
          {title}
        </Typography>
        <Typography variant="h4" component="div" align="center">
          {count}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoCard;
