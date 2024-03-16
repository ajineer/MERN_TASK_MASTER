import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      "/api": {
        //target:"https://localhost:5555"
        target: "https://mern-task-master-server.onrender.com",
        secure: false,
      },
    },
  },
});
