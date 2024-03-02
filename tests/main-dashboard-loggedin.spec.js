const {test, expect} = require('@playwright/test');
const { DashboardPage } = require('../page/dashboard.page');
const globalEnv = require('../globals/globals');
const { mockProductSummaryRequestToReturnEmptyBody } = require('../util/apiMocks');

let dashboardPage;

test.beforeEach('Successful Log In', async ({page}) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
});

test("Dashboard is presented after login", async ({page}) => {
    await expect(page.getByRole("heading", {name: globalEnv.productSummaryPage.MAIN_HEADING_TITLE})).toBeVisible();
});

test("Account sections have total balance presented in main currency", async () => {
    for (const sectionName of globalEnv.productSummaryPage.ACCOUNT_SECTIONS) {
        const total = await dashboardPage.getAccountSectionTotalBalanceAndCurrency(sectionName);
        expect(total.currency).toBe(process.env.MAIN_CURRENCY);
    }
});

test("Dashboard displays all sections", async () => {
    for (const sectionName of globalEnv.productSummaryPage.ACCOUNT_SECTIONS) {
        await expect(await dashboardPage.getAccountSectionByName(sectionName)).toBeVisible();
    }
});

test("Dashboard is empty", async ({ page }) => {
    await mockProductSummaryRequestToReturnEmptyBody(page);

    await expect(await dashboardPage.getDashboardTextTitleForEmptyAccounts()).toHaveText(dashboardPage.notificationText);
    await expect(await dashboardPage.getDashboardTextForEmptyAccounts()).toHaveText(dashboardPage.noDataText);
});