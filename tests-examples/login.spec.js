const {test, expect} = require('@playwright/test');
const {Loginpage} = require("../page/login.page");
const globalWarningText = require("../globals/error_display_texts");

test('Incorect username or password', async ({ page }) => {
    const loginPage = new Loginpage(page);
    await loginPage.goto();
    await loginPage.enterUsername(process.env.WRONG_USERNAME);
    await loginPage.enterPassword(process.env.WRONG_PASSWORD);
    await loginPage.clickOnLoginBtn();

    await expect(page.getByText(globalWarningText.loginPage.INCORECT_USERNAME_OR_PASSWORD)).toBeVisible();
  });

  test('Missing username and password', async ({ page }) => {
    const loginPage = new Loginpage(page);
    await loginPage.goto();

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(globalWarningText.loginPage.USERNAME_MISSING)).toBeVisible();
    await expect(page.getByText(globalWarningText.loginPage.PASSWORD_MISSING)).toBeVisible();
  });

test("Login links are working", async({page}) => {
  const loginPage = new Loginpage(page);
  await loginPage.goto();
  const currentUrl = page.url();

  const smartPartOfUrl = new RegExp(process.env.SMART_PART_OF_URL);
  const directPartOfUrl = new RegExp(process.env.DIRECT_PART_OF_URL);


  await loginPage.clickOnLink(process.env.SMART_URL_TEXT);
  await page.waitForLoadState("networkidle");

  await expect(page.url()).not.toBe(currentUrl);
  await expect(page).toHaveURL(smartPartOfUrl);

  await page.goBack();
  await page.goBack();

  await loginPage.clickOnLink(process.env.DIRECT_URL_TEXT);
  await expect(page).toHaveURL(directPartOfUrl);
})
