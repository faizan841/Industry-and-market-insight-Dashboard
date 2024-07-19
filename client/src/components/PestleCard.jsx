import React from "react";
import { List, Box, Container, Typography, useTheme } from "@mui/material";
import PoliticalIcon from "@mui/icons-material/AccountBalance";
import IndustriesIcon from "@mui/icons-material/Business";
import SocialIcon from "@mui/icons-material/Group";
import HealthcareIcon from "@mui/icons-material/LocalHospital";
import EnvironmentalIcon from "@mui/icons-material/Public";
import LifestylesIcon from "@mui/icons-material/EmojiPeople";
import TechnologicalIcon from "@mui/icons-material/Computer";
import OrganizationIcon from "@mui/icons-material/Apartment";
import EconomicIcon from "@mui/icons-material/AttachMoney";

const pestleNames = [
  { name: "Political", icon: <PoliticalIcon /> },
  { name: "Industries", icon: <IndustriesIcon /> },
  { name: "Social", icon: <SocialIcon /> },
  { name: "Healthcare", icon: <HealthcareIcon /> },
  { name: "Environmental", icon: <EnvironmentalIcon /> },
  { name: "Lifestyles", icon: <LifestylesIcon /> },
  { name: "Technological", icon: <TechnologicalIcon /> },
  { name: "Organization", icon: <OrganizationIcon /> },
  { name: "Economic", icon: <EconomicIcon /> },
];

const PestleList = () => {
  const theme = useTheme();
  return (
    <>
      {pestleNames.map((item, i) => (
        <Box
          key={i}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${theme.palette.primary[400]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={theme.palette.primary[100]}
              variant="h5"
              fontWeight="600"
            >
              {item.name}
            </Typography>
          </Box>

          <Box
            backgroundColor={theme.palette.background.default}
            p="5px 10px"
            borderRadius="4px"
          >
            <Typography variant="h5" fontWeight="600">
              {item.icon}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PestleList;
