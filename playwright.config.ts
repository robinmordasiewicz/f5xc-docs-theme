import { defineConfig } from "@playwright/test";

const baseURL =
  process.env.BASE_URL ??
  "https://robinmordasiewicz.github.io/f5xc-docs-theme";

export default defineConfig({
  testDir: "tests/visual",
  timeout: 30_000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL,
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: "chromium-dark",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "chromium-light",
      use: {
        browserName: "chromium",
      },
    },
  ],
});
