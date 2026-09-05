const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

test('navigate to Compliance Management from Solutions menu', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('/');
  await homePage.openComplianceManagement();

  await expect(page).toHaveURL(/compliance-management-software/);
  await expect(page.getByRole('heading', { level: 1, name: 'Compliance Management Software' })).toBeVisible();
});
