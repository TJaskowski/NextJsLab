const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Symulacja kliknięcia na link z tekstem menu, wysuniecie menu
  await page.click("text=menu");
  // Symulacja kliknięcia na link z tekstem Login, przeniesienie na stronę logowania
  await page.click('text=Login');
  // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
  await expect(page).toHaveURL('http://localhost:3000/user/login');
  // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem Zaloguj się
  await expect(page.locator('h1')).toContainText('Zaloguj się');
});