import {defineConfig} from '@playwright/test';
import dotenv from "dotenv";
dotenv.config({ path: "./my.env", override: true });

module.exports = defineConfig({
  testDir: './tests',
  expect: {
    timeout: 5 * 1000
  },

  timeout: 30 * 1000,
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.js',
    },
    {
      name: 'e2e tests',
      testMatch: '**/*loggedin.spec.js',
      dependencies: ['setup'],
      use: {
        storageState: process.env.STORAGE_STATE,
      },
      fullyParallel: true,
    },
    {
      name: 'e2e tests',
      testIgnore: ['**/*loggedin.spec.js', '**/*.setup.js'],
      fullyParallel: true,
    },
  ],
});

