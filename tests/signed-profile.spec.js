const { test, expect } = require('@playwright/test');
const fs = require('fs');

test("authenticated user can access profile", async ({ page }) => {
  // Load session storage from file
  const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/session.json', 'utf-8'));

  await page.goto('http://localhost:3000');
  await page.evaluate((data) => {
    for (const key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }, sessionStorage);
  await page.reload();
  await page.waitForTimeout(1000);
  await page.click("text=menu");
  await page.click('text=Profile');
  await page.click('label.drawer-overlay[for="my-drawer"]');
  await expect(page.locator('h1')).toContainText('User Profile');
});

test("not authenticated user cannot access profile", async ({ page }) => {
  await page.goto('http://localhost:3000/user/profile');
  await expect(page).toHaveURL('http://localhost:3000/user/login?returnUrl=/user/profile');
  await expect(page.locator('h1')).toContainText('Zaloguj się');
});