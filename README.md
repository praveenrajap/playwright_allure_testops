# Playwright Sample Test Suite

This repository contains automated test scripts written with Playwright.

## Overview

The Playwright Test Suite is designed to automate end-to-end testing of the application. It consists of test scripts written in JavaScript using the Playwright framework, covering different aspects of the application's functionality.

## Features

- Comprehensive Test Coverage
- Parameterized Testing
- Page Object Model (POM)
- Cross-Browser Testing
- Continuous Integration

## Environment Variables

The following environment variables are used in the project:

| Variable Name              | Description                                      |
|----------------------------|--------------------------------------------------|
| LOGIN_PAGE_URL             | The URL of the login page.                       |
| USERNAME                   | The username used for login.                     |
| PASSWORD                   | The password used for login.                     |
| WRONG_USERNAME             | A wrong username for testing incorrect login.    |
| WRONG_PASSWORD             | A wrong password for testing incorrect login.    |
| MAIN_CURRENCY              | The main currency used in the application.       |
| PRODUCT_SUMMARY_URL       | The URL of the product summary page.             |
| SMART_URL_TEXT             | Text for the link page.       |
| SMART_PART_OF_URL         | Part of the URL page.        |
| DIRECT_URL_TEXT            | Text for the link page.      |
| DIRECT_PART_OF_URL        | Part of the URL page.       |
| STORAGE_STATE              | Path to the storage state for browser context.   |
| PRODUCT_SUMMARY_REQUEST_API | API endpoint for the product summary request.    |


## Global Variables

The project utilizes the following global variables:

| Category            | Variable Name                 | Description                                                        |
|---------------------|-------------------------------|--------------------------------------------------------------------|
| Login Page          | USERNAME_MISSING              | Message indicating the absence of a username.                      |
|                     | PASSWORD_MISSING              | Message indicating the absence of a password.                      |
|                     | INCORRECT_USERNAME_OR_PASSWORD| Message indicating incorrect username or password.                 |
| Product Summary Page| NO_ACCOUNTS                   | Message indicating no data to display for account sections.        |
|                     | ACCOUNT_SECTIONS              | Array containing names of account sections.                        |
|                     | MAIN_HEADING_TITLE           | Title of the main heading on the product summary page.             |

## Utility Methods

- **convertToMainCurrency(amount, currency):** This method converts an amount from a specified currency to the main currency used in the application. It takes two parameters: the amount to be converted and the currency of that amount.

- **mockProductSummaryRequestToReturnEmptyBody(page):** This utility method mocks the API response for the product summary request to return an empty body. It is primarily used for testing scenarios where the dashboard displays no data.
