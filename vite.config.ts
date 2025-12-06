import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";
import takumiPackageJson from "@takumi-rs/core/package.json" with {
  type: "json",
};

const config = defineConfig({
  ssr: {
    external: ["@takumi-rs/image-response"],
  },
  optimizeDeps: {
    exclude: ["@takumi-rs/image-response"]
  },
  plugins: [
    ...(process.env.NODE_ENV !== "production" ? [devtools()] : []),
    nitro({
      externals: {
      external: ["@takumi-rs/core"],
      traceInclude: Object.keys(takumiPackageJson.optionalDependencies),
    }
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
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});

export default config;
