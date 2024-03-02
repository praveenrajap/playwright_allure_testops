import { test, expect } from '@playwright/test';
import { Loginpage } from '../../page/login.page';
const globalEnv = require('../../globals/globals');

test('Log In', async ({ page }) => {
    const loginPage = new Loginpage(page);
    await loginPage.goto();
    await loginPage.enterUsername(process.env.USERNAME);
    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickOnLoginBtn();

    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", {name: globalEnv.productSummaryPage.MAIN_HEADING_TITLE})).toBeVisible();

    await page.context().storageState({ path: process.env.STORAGE_STATE});
});