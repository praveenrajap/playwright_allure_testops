module.exports = {
    mockProductSummaryRequestToReturnEmptyBody: async (page) => {
        await page.route(process.env.PRODUCT_SUMMARY_REQUEST_API, route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    currentAccounts: {},
                    savingsAccounts: {},
                    termDeposits: {},
                    loans: {},
                    creditCards: {},
                    debitCards: {},
                    investmentAccounts: {},
                    customProductKinds: {}
                })
            });
        });
    }
};