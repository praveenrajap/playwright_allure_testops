const globalWarningText = require("../globals/error_display_texts");

exports.DashboardPage = class DashboardPage {

    constructor(page){
        this.page = page;
        this.baseUrl = process.env.PRODUCT_SUMMARY_URL;
        this.notificationText = 'Notification';
        this.noDataText = globalWarningText.productSummaryPage.NO_ACCOUNTS;
        this.accountSectionCard = page.locator("div.bb-product-kind.card.card-body");
    }

    async goto(){
        await this.page.goto(this.baseUrl);
    }

    async getAccountSectionByName(name){
        return await this.accountSectionCard.filter({hasText: name});
    }

    async getDashboardTextTitleForEmptyAccounts(){
        return await this.page.getByText(this.notificationText);
    }

    async getDashboardTextForEmptyAccounts(){
        return await this.page.getByText(this.noDataText);
    }

    async getAccountSectionTotalBalanceAndCurrency(name){
        const accountSectionElement = await this.getAccountSectionByName(name);
        const totalAmountElement = await accountSectionElement.locator(".bb-product-kind__balance");
        const balanceElement = await totalAmountElement.locator(".bb-amount");
        const balanceText = await balanceElement.innerText();

        const currencyParts = balanceText.split(' ');
        const currency = currencyParts[currencyParts.length - 1];
        const numericString = balanceText.replace(/[^\d,]/g, '').replace(',', '.');
        const amount = parseFloat(numericString);
        
        return { amount, currency };
    }

    async getAllAccountsUnderAccountSection(accountSection){
        const accountSectionElement = await this.getAccountSectionByName(accountSection);
        return await accountSectionElement.locator("otp-product-kind");
    }

    async getBalanceAndCurrencyForAccount(accountElement) {
        const balanceElement = await accountElement.locator(".bb-amount");
        const balanceText = await balanceElement.innerText();
        const currencyParts = balanceText.split(' ');
        const currency = currencyParts[currencyParts.length - 1];
        const numericString = balanceText.replace(/[^\d,]/g, '').replace(',', '.');
        const amount = parseFloat(numericString);
    
        return { amount, currency };
    }
}