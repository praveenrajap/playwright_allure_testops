import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  // test.fail();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});




  
  // 1. Login Test
test('should log in with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// 2. Invalid Login Test
test('should not log in with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'invalid_user');
  await page.fill('#password', 'invalid_password');
  await page.click('#login-button');
  await expect(page.locator('.error-message-container')).toBeVisible();
});

// 3. Add to Cart Test
test('should add a product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// 4. Remove from Cart Test
test('should remove a product from the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await page.click('text=Remove', { hasText: 'Sauce Labs Backpack' });
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});

// 5. Checkout Test
test('should complete the checkout process', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

// 6. Sort Products Test
test('should sort products by price (low to high)', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.selectOption('.product_sort_container', 'lohi');
  const firstProductPrice = await page.locator('.inventory_item_price').first().textContent();
  expect(firstProductPrice).toBe('$7.99');
});

// 7. Logout Test
test('should log out successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// 8. Inventory Item Details Test
test('should view the details of an inventory item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
});

// 9. Back to Products Test
test('should navigate back to products from item details', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
  await page.click('#back-to-products');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// 10. Menu Navigation Test
test('should navigate using the menu', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#react-burger-menu-btn');
  await page.click('#about_sidebar_link');
  await expect(page).toHaveURL('https://saucelabs.com/');
});

// 11. Add Multiple Products to Cart Test
test('should add multiple products to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Bike Light' });
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

// 12. Remove Multiple Products from Cart Test
test('should remove multiple products from the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Bike Light' });
  await page.click('text=Remove', { hasText: 'Sauce Labs Backpack' });
  await page.click('text=Remove', { hasText: 'Sauce Labs Bike Light' });
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});

// 13. Verify Inventory Item Image Test
test('should verify the image of an inventory item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
  const imageSrc = await page.locator('.inventory_details_img').getAttribute('src');
  expect(imageSrc).toBe('/static/media/sauce-backpack-1200x1500.34e7aa42.jpg');
});

// 14. Verify Footer Links Test
test('should verify footer links', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Twitter');
  await expect(page).toHaveURL(/saucedemo.com/);
  await page.goBack();
  await page.click('text=Facebook');
  await expect(page).toHaveURL(/saucedemo.com/);
  await page.goBack();
  await page.click('text=LinkedIn');
  await expect(page).toHaveURL(/saucedemo/);
});

// 15. Reset App State Test
test('should reset app state', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart', { hasText: 'Sauce Labs Backpack' });
  await page.click('#react-burger-menu-btn');
  

});