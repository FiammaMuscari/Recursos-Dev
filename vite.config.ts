import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { generateSitemap } from "sitemap-ts";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "generate-sitemap",
      closeBundle() {
        const pagesDir = path.resolve(__dirname, "src");
        const pageFiles = fs.readdirSync(pagesDir);
        const dynamicRoutes = pageFiles
          .filter((file) => path.extname(file) === ".tsx") 
          .map((file) => {
            const route = "/" + path.basename(file, ".tsx"); 
            return route === "/" ? "/" : route; 
          });


        generateSitemap({
          hostname: "https://recursos-dev-gamma.vercel.app/",
          outDir: path.resolve(__dirname, "static"),
          readable: true,
          dynamicRoutes,
        });
      },
    },
  ],
  build: {
    outDir: "./static",
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
