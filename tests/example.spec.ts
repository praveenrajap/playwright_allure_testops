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


//-------------------------------------------------------------------------------


const allure = require('allure-playwright');

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

// Login Tests
test.describe('Login Tests', () => {
  test('Successful login with valid credentials (Basic Auth)', async ({ page }) => {
    await allure.step('Fill username', async () => {
      await page.fill('#user-name', 'standard_user');
    });
    await allure.step('Fill password', async () => {
      await page.fill('#password', 'secret_sauce');
    });
    await allure.step('Click login button', async () => {
      await page.click('#login-button');
    });
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Unsuccessful login with invalid credentials (Basic Auth)', async ({ page }) => {
    await allure.step('Fill username', async () => {
      await page.fill('#user-name', 'invalid_user');
    });
    await allure.step('Fill password', async () => {
      await page.fill('#password', 'invalid_sauce');
    });
    await allure.step('Click login button', async () => {
      await page.click('#login-button');
    });
    await expect(page.locator('.error-message-container')).toBeVisible();
  });
});

// Product Interaction Tests
test.describe('Product Interaction Tests', () => {
  test('Add a product to the cart (Element Interaction)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item button');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Remove a product from the cart (Element Interaction)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item button');
    await page.click('.inventory_item button');
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

  test('View product details (Navigation)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item a');
    await expect(page.locator('.inventory_details')).toBeVisible();
  });

  // Flaky Test
  test('Flaky test for adding product to cart (Flaky Test)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item button');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});

// Cart Management Tests
test.describe('Cart Management Tests', () => {
  test('Proceed to checkout (Navigation)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('Continue shopping from cart (Navigation)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.shopping_cart_link');
    await page.click('#continue-shopping');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Complete a purchase (Form Submission)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toBeVisible();
  });

  // Flaky Test
  test('Flaky test for checkout process (Flaky Test)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toBeVisible();
  });
});

// Navigation Tests
test.describe('Navigation Tests', () => {
  test('Navigate to about page (Navigation)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#react-burger-menu-btn');
    await page.click('#about_sidebar_link');
    await expect(page).toHaveURL('https://saucelabs.com/');
  });

  test('Logout from application (Basic Auth)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  // Flaky Test
  test('Flaky test for navigation (Flaky Test)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#react-burger-menu-btn');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await page.click('#about_sidebar_link');
    await expect(page).toHaveURL('https://saucelabs.com/');
  });
});

// Accessibility Tests
test.describe('Accessibility Tests', () => {
  test('Check accessibility of login page (Accessibility)', async ({ page }) => {
    await page.addInitScript(() => {
      document.querySelector('body').style.backgroundColor = 'black';
    });
    const axe = require('axe-playwright');
    const accessibilityScanResults = await axe.run(page);
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Check accessibility of inventory page (Accessibility)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const axe = require('axe-playwright');
    const accessibilityScanResults = await axe.run(page);
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Flaky Test
  test('Flaky test for accessibility (Flaky Test)', async ({ page }) => {
    await page.addInitScript(() => {
      document.querySelector('body').style.backgroundColor = 'black';
    });
    const axe = require('axe-playwright');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    const accessibilityScanResults = await axe.run(page);
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

// Performance Tests
test.describe('Performance Tests', () => {
  test('Measure page load performance (Performance)', async ({ page }) => {
    const start = performance.now();
    await page.goto('https://www.saucedemo.com/');
    const end = performance.now();
    console.log(`Page load time: ${end - start}ms`);
  });

  test('Measure login performance (Performance)', async ({ page }) => {
    const start = performance.now();
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForLoadState('networkidle');
    const end = performance.now();
    console.log(`Login time: ${end - start}ms`);
  });

  // Flaky Test
  test('Flaky test for performance (Flaky Test)', async ({ page }) => {
    const start = performance.now();
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    const end = performance.now();
    console.log(`Page load time: ${end - start}ms`);
  });
});

// Screenshot Tests
test.describe('Screenshot Tests', () => {
  test('Take screenshot of login page (Screenshot)', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/login.png' });
  });

  test('Take screenshot of inventory page (Screenshot)', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.screenshot({ path: 'screenshots/inventory.png' });
  });

  // Flaky Test
  test('Flaky test for screenshots (Flaky Test)', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/flaky.png' });
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
  });
});

// Visual Regression Tests
test.describe('Visual Regression Tests', () => {
  test('Compare login page screenshot (Visual Regression)', async ({ page }) => {
    const { toMatchSnapshot } = require('playwright-visual-regression');
    await page.screenshot({ path: 'screenshots/login.png' });
    await expect('screenshots/login.png').toMatchSnapshot('login-expected.png');
  });

  test('Compare inventory page screenshot (Visual Regression)', async ({ page }) => {
    const { toMatchSnapshot } = require('playwright-visual-regression');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.screenshot({ path: 'screenshots/inventory.png' });
    await expect('screenshots/inventory.png').toMatchSnapshot('inventory-expected.png');
  });

  // Flaky Test
  test('Flaky test for visual regression (Flaky Test)', async ({ page }) => {
    const { toMatchSnapshot } = require('playwright-visual-regression');
    await page.screenshot({ path: 'screenshots/flaky.png' });
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await expect('screenshots/flaky.png').toMatchSnapshot('flaky-expected.png');
  });
});

// Geolocation Tests
test.describe('Geolocation Tests', () => {
  test('Set geolocation to New York (Geolocation)', async ({ page, context }) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 40.7128, longitude: -74.0060 });
    await page.reload();
  });

  test('Set geolocation to London (Geolocation)', async ({ page, context }) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 51.5074, longitude: -0.1278 });
    await page.reload();
  });

  // Flaky Test
  test('Flaky test for geolocation (Flaky Test)', async ({ page, context }) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 40.7128, longitude: -74.0060 });
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await page.reload();
  });
});

// Browser Context Tests
test.describe('Browser Context Tests', () => {
  test('Create new browser context (Browser Context)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await context.close();
  });

  test('Reuse existing browser context (Browser Context)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  // Flaky Test
  test('Flaky test for browser context (Flaky Test)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await context.close();
  });
});

// Network Interception Tests
test.describe('Network Interception Tests', () => {
  test('Intercept network requests (Network Interception)', async ({ page }) => {
    await page.route('https://www.saucedemo.com/*', route => route.abort());
    await page.goto('https://www.saucedemo.com/');
  });

  test('Modify network response (Network Interception)', async ({ page }) => {
    await page.route('https://www.saucedemo.com/*', route => {
      route.fulfill({
        status: 200,
        body: 'Intercepted',
      });
    });
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('body')).toHaveText('Intercepted');
  });

  // Flaky Test
  test('Flaky test for network interception (Flaky Test)', async ({ page }) => {
    await page.route('https://www.saucedemo.com/*', route => route.abort());
    await page.waitForTimeout(5000); // Intentional delay to make test flaky
    await page.goto('https://www.saucedemo.com/');
  });
});

// API Testing
test.describe('API Testing', () => {
  test('Fetch API data (API Testing)', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com/');
    expect(response.ok()).toBeTruthy();
  });

  test('Post API data (API Testing)', async ({ request }) => {
    const response = await request.post('https://www.saucedemo.com/', {
      data: {
        key: 'value'
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  // Flaky Test
  test('Flaky test for API (Flaky Test)', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com/');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Intentional delay to make test flaky
    expect(response.ok()).toBeTruthy();
  });
});
