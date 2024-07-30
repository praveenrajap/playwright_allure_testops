const { defineConfig } = require('@playwright/test');
const { getServiceConfig } = require('@azure/microsoft-playwright-testing-private-preview');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(config, getServiceConfig(config));
