import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";

const config = defineConfig({
  plugins: [
    ...(process.env.NODE_ENV !== "production" ? [devtools()] : []),
    nitro({
      compatibilityDate: "2024-09-19",
      preset: "cloudflare_module",
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
        wrangler: {
          workers_dev: false,
          preview_urls: false
        },
      },
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    contentCollections(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        
      },
    }),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});

export default config;
