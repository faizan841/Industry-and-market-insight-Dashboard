import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./", // Tell Vite to load the.env file from the root of the project
  envPrefix: "VITE_",
});
