import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "bundle-analysis.html",
      template: "sunburst",
    }),
  ],
  envDir: "./",
  envPrefix: "VITE_",
  build: {
    outDir: "dist",
    minify: "terser",
    chunkSizeWarningLimit: 499,
    rollupOptions: {
      input: "src/main.jsx",
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor-react";
            }
            if (id.includes("react-dom")) {
              return "vendor-react-dom";
            }
            if (id.includes("@mui/material")) {
              return "vendor-mui-material";
            }
            if (id.includes("@mui/icons-material")) {
              return "vendor-mui-icons";
            }
            if (id.includes("@emotion/react")) {
              return "vendor-emotion-react";
            }
            if (id.includes("@emotion/styled")) {
              return "vendor-emotion-styled";
            }
            if (id.includes("@mui/system")) {
              return "vendor-mui-system";
            }
            if (id.includes("@mui/base")) {
              return "vendor-mui-base";
            }
            if (id.includes("lodash")) {
              return "vendor-lodash";
            }
            if (id.includes("date-fns")) {
              return "vendor-date-fns";
            }
            if (id.includes("axios")) {
              return "vendor-axios";
            }
            if (id.includes("redux")) {
              return "vendor-redux";
            }
            if (id.includes("react-redux")) {
              return "vendor-react-redux";
            }
            if (id.includes("chart.js")) {
              return "vendor-chartjs";
            }
            if (id.includes("d3")) {
              return "vendor-d3";
            }
            return "vendor";
          }
          if (id.includes("src/scenes/dashboard")) {
            return "dashboard";
          }
          if (id.includes("src/scenes/Likelihood")) {
            return "likelihood";
          }
          if (id.includes("src/scenes/country")) {
            return "country";
          }
          if (id.includes("src/scenes/topics")) {
            return "topics";
          }
          if (id.includes("src/scenes/year")) {
            return "year";
          }
        },
      },
    },
  },
});
