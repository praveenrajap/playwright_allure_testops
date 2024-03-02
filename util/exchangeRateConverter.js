import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load exchange rates from JSON file
const exchangeRatesFilePath = resolve(__dirname, 'exchangeRates.json');
const exchangeRatesData = JSON.parse(readFileSync(exchangeRatesFilePath, 'utf-8'));

// Function to convert currency to BGN
function convertToMainCurrency(amount, currency) {
    if (currency === process.env.MAIN_CURRENCY) {
        return amount;
    } else if (exchangeRatesData.hasOwnProperty(currency)) {
        return amount * parseFloat(exchangeRatesData[currency]);
    } else {
        throw new Error(`Exchange rate for currency ${currency} not found.`);
    }
}

module.exports = {
    convertToMainCurrency
};