const {test, expect} = require('@playwright/test');
const { DashboardPage } = require('../page/dashboard.page.js');
const { convertToMainCurrency } = require('../util/exchangeRateConverter.js');
const globalEnv = require('../globals/globals.js');


let dashboardPage;

test.beforeEach('Successful Log In', async ({page}) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
});

for (const section of globalEnv.productSummaryPage.ACCOUNT_SECTIONS) {
    test.describe(`Total is sum of all accounts balances under the section`, () => {
        // Define a test for each account section
        test(`Total balance for ${section}`, async () => {
            const accountSectionTotalBalanceAndCurrency = await dashboardPage.getAccountSectionTotalBalanceAndCurrency(section);

            const accountsElements = await dashboardPage.getAllAccountsUnderAccountSection(section);
            const accountsSize = await accountsElements.count();

            let sumOfBalances = 0;
            for (let i = 0; i < accountsSize; ++i) {
                const accountBalanceAndCurrency = await dashboardPage.getBalanceAndCurrencyForAccount(accountsElements.nth(i));
                const balance = convertToMainCurrency(accountBalanceAndCurrency.amount, accountBalanceAndCurrency.currency);
                sumOfBalances += balance;
            }

            const roundedSumOfBalances = parseFloat(sumOfBalances.toFixed(2));
            expect(roundedSumOfBalances).toBe(accountSectionTotalBalanceAndCurrency.amount);
        });
    });
}