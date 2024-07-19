import React from "react";
import { Box } from "@mui/material";
import BreakdownChart from "../../components/BreakdownChart";
import Header from "../../components/Header";

const Year = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Pestle Analysis by Year"
        subtitle="Insights for each PESTLE category ending in a specific year."
      />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Year;
