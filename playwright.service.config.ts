import { ServiceAuthenticationConstants, getServiceConfig } from '@azure/microsoft-playwright-testing-private-preview';
import { defineConfig } from 'playwright/test';
import playwrightConfig from './playwright.config';

export default defineConfig(
	playwrightConfig,
	getServiceConfig(playwrightConfig)
);
