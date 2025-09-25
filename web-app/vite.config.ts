import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@/app": "/src/app",
      "@/entities": "/src/entities",
      "@/features": "/src/features",
      "@/pages": "/src/pages",
      "@/shared": "/src/shared",
      "@/widgets": "/src/widgets",
    },
  },
});
