import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      "/api": {
        // target: "http://localhost:5555",
        target: "https://mern-task-master-uaiz.onrender.com:5555/api/",
        secure: false,
      },
    },
  },
});
