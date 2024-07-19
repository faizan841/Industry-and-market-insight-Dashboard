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
    minify: "terser", // Use terser for minification
    chunkSizeWarningLimit: 500, // Set the chunk size warning limit to 500KB
    rollupOptions: {
      input: "src/main.jsx",
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate vendor modules
          }
          if (id.includes("src/scenes/dashboard")) {
            return "dashboard"; // Separate dashboard modules
          }
          if (id.includes("src/scenes/Likelihood")) {
            return "likelihood"; // Separate likelihood modules
          }
          if (id.includes("src/scenes/country")) {
            return "country"; // Separate country modules
          }
          if (id.includes("src/scenes/topics")) {
            return "topics"; // Separate topics modules
          }
          if (id.includes("src/scenes/year")) {
            return "year"; // Separate year modules
          }
        },
      },
    },
  },
});
