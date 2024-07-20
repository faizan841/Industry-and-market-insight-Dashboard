import React from "react";
import { useGetCountryQuery } from "../../state/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../state/geoData";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";

const Country = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetCountryQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    var choroPlethData = data.filter((item) => {
      return item.id !== null;
    });
  }

  return (
    <>
      <Box sx={{ m: !isDashboard ? "1.5rem 2.5rem" : undefined }}>
        <Header
          title="Global Insights Distribution"
          subtitle="Explore the geographic distribution of insights across the world."
        />

        <Box
          sx={{
            mt: !isDashboard ? "40px" : undefined,
            height: !isDashboard ? "75vh" : "50vh",
            border: !isDashboard
              ? `1px solid ${theme.palette.secondary[200]}`
              : "",
            borderRadius: "4px",
          }}
        >
          <ResponsiveChoropleth
            data={choroPlethData}
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
                    stoke: theme.palette.secondary[200],
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            //colors="nivo"
            domain={[0, 120]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".0f"
            //projectionType="mercator"
            projectionScale={isDashboard ? 50 : 150}
            projectionTranslation={isDashboard ? [0.49, 0.6] : [0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            //enableGraticule={true}
            //graticuleLineColor="#dddddd"
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={
              !isDashboard
                ? [
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: true,
                      translateX: 0,
                      translateY: -125,
                      itemsSpacing: 0,
                      itemWidth: 94,
                      itemHeight: 18,
                      itemDirection: "left-to-right",
                      itemTextColor: theme.palette.secondary[200],
                      itemOpacity: 0.85,
                      symbolSize: 18,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: theme.palette.background.alt,
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default Country;
