const { defineConfig, devices } = require('@playwright/test');
const { BASE_URL } = require('./mocks/api-config');

module.exports = defineConfig({
  testDir: './tests',
  webServer: {
    command: 'node mocks/api-server.js',
    url: `${BASE_URL}/health`,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'https://www.ncontracts.com/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
