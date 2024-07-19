import { useState } from "react";
import Select from "react-select";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetPieChartDataQuery } from "../state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const years = Array.from({ length: 120 }, (_, i) => 2016 + i);
  const [endYear, setEndYear] = useState(2026);
  const { data, error, isLoading } = useGetPieChartDataQuery({ endYear });
  const theme = useTheme();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const colors = data.map((item, i) => {
    const shade = i % 10; // adjust this value to change the shade range
    const colorKey =
      i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "grey";
    return theme.palette[colorKey][shade * 100]; // adjust the shade value here
  });

  const pieData = data.map((item, i) => ({
    id: item.id,
    label: item.label,
    value: item.value,
    color: colors[i], // Assign a color from the array
  }));

  console.log(pieData);
  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <Box width={120}>
        <Select
          value={endYear}
          onChange={(option) => setEndYear(option.value)}
          options={years.map((year) => ({ value: year, label: year }))}
          menuPortalTarget={document.body}
          styles={{
            menu: (base) => ({ ...base, maxHeight: 200, overflowY: "auto" }),
          }}
        />
      </Box>
      <ResponsivePie
        data={pieData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        colors={{ datum: "data.color" }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            symbolColor: ({ datum }) => datum.color,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{ transform: "translate(-50%, -40%)" }}
      >
        <Typography variant="h6">Year: {endYear}</Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
