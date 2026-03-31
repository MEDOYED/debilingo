/// <reference types="vitest/config" />
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 1414,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src/app"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@features": path.resolve(__dirname, "src/features"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        importers: [
          {
            findFileUrl(url) {
              // Handle path aliases (@shared, @widgets, etc.)
              if (url.startsWith("@shared/")) {
                return new URL(
                  url.replace("@shared/", "src/shared/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@widgets/")) {
                return new URL(
                  url.replace("@widgets/", "src/widgets/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@pages/")) {
                return new URL(
                  url.replace("@pages/", "src/pages/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@features/")) {
                return new URL(
                  url.replace("@features/", "src/features/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@entities/")) {
                return new URL(
                  url.replace("@entities/", "src/entities/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@app/")) {
                return new URL(
                  url.replace("@app/", "src/app/"),
                  pathToFileURL(__dirname + "/")
                );
              }
              if (url.startsWith("@/")) {
                return new URL(
                  url.replace("@/", "src/"),
                  pathToFileURL(__dirname + "/")
                );
              }

              // Let Sass handle other URLs normally
              return null;
            },
          },
        ],
      },
    },
  },

  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
