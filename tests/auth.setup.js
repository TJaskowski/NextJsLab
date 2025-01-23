import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/');
  await page.click("text=menu");
  await page.click('text=Login');
  await page.fill('input[name="email"]', process.env.TEST_EMAIL);
  await page.fill('input[name="password"]', process.env.TEST_PASSWORD);
  await page.click('button[type="submit"]');


  await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});