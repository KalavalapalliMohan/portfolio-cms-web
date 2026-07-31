import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({

  plugins: [

    react(),

    visualizer({

      open: true,

      filename: "bundle-analysis.html"

    })

  ],


  build: {

    rollupOptions: {

      output: {

        manualChunks(id) {

        if(id.includes("node_modules")) {


          if(
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router/")
          ){

              return "react-core";

          }


          return "vendor";

        }

        }

      }

    }

  }

});