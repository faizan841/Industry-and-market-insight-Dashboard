import React from "react";
import Header from "../../components/Header";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InfoCard from "../../components/InfoCard";
import BreakdownChart from "../../components/BreakdownChart";
import { useGetDashboardDataQuery } from "../../state/api";

import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import TopicIcon from "@mui/icons-material/Topic";

import Country from "../country/Country";
import PestleList from "../../components/PestleCard";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardDataQuery();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const totalCountries = data?.countryCount || 0;
  const totalRegions = data?.totalUniqueRegions || 0;
  const totalSectors = data?.totalUniqueSectors || 0;
  const totalTopics = data?.totalUniqueTopics || 0;

  const pestleNames = data?.pestleNames || [];
  const topInsightsByCountry = data?.topInsightsByCountry || [];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={isMobile ? "repeat(12, 1fr)" : "repeat(16, 1fr)"}
          gridAutoRows="180px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <InfoCard
            title="Total Countries"
            count={totalCountries}
            icon={PublicIcon}
          />
          <InfoCard
            title="Total Regions"
            count={totalRegions}
            icon={LanguageIcon}
          />
          <InfoCard
            title="Total Sectors"
            count={totalSectors}
            icon={BusinessIcon}
          />
          <InfoCard title="Total Topics" count={totalTopics} icon={TopicIcon} />

          <Box
            gridColumn="span 8"
            gridRow="span 3"
            p="1.5rem"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
          >
            <BreakdownChart isDashboard={true} />
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
              colors={theme.palette.primary[300]}
              p="15px"
            >
              <Typography
                colors={theme.palette.primary[300]}
                variant="h5"
                fontWeight="600"
              >
                Top 10 Counties with most Insights
              </Typography>
            </Box>
            {topInsightsByCountry.map((item, i) => (
              <Box
                key={i}
                display="flex"
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
                    {item.country}
                  </Typography>
                </Box>

                <Box
                  backgroundColor={theme.palette.background.default}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  <Typography variant="h5" fontWeight="600">
                    {item.insightCount}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            padding="10px"
          >
            <Box height="200px">
              <Country isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 10"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
              colors={theme.palette.primary[300]}
              p="15px"
            >
              <Typography
                colors={theme.palette.primary[300]}
                variant="h5"
                fontWeight="600"
              >
                9 Pestle covered
              </Typography>
            </Box>
            <PestleList />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
