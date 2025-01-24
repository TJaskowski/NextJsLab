require('dotenv').config();
const fs = require('fs');

import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/');
  await page.click("text=menu");
  await page.click('text=Login');
  await page.click('label.drawer-overlay[for="my-drawer"]');
  await page.fill('input[name="email"]', process.env.TEST_EMAIL);
  await page.fill('input[name="password"]', process.env.TEST_PASSWORD);
  await page.click('button[type="submit"]');


  await page.waitForURL('http://localhost:3000/user/profile');
 
 // Get session storage and store as env variable
 const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
 fs.writeFileSync('playwright/.auth/session.json', sessionStorage, 'utf-8'); ;
});