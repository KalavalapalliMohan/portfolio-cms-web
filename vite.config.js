import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),

    visualizer({
      open: true,
      filename: "bundle-analysis.html",
    }),
  ],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react") ||
            id.includes("react-dom")
          ) {
            return "react-core";
          }

          if (id.includes("react-router")) {
            return "router";
          }

          if (id.includes("axios")) {
            return "axios";
          }

          if (id.includes("react-helmet-async")) {
            return "helmet";
          }

          if (id.includes("bootstrap")) {
            return "bootstrap";
          }

          if (id.includes("aos")) {
            return "aos";
          }

          // NEW
          if (id.includes("@popperjs")) {
            return "bootstrap";
          }

          if (id.includes("chart.js")) {
            return "chart";
          }

          if (id.includes("sweetalert2")) {
            return "sweetalert";
          }

          if (id.includes("moment")) {
            return "moment";
          }

          if (id.includes("lodash")) {
            return "lodash";
          }

          return "vendor";
        }
      },
    },
  },
});