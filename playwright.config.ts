import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 90000,
  expect: { timeout: 15000 },
  reporter: "list",
  use: { baseURL: "http://localhost:3101", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm test:serve",
    url: "http://localhost:3101/entrar",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
