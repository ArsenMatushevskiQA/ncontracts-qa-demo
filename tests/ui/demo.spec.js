const { test, expect } = require('@playwright/test');
const { DemoPage } = require('../../pages/DemoPage');

test('demo form shows First Name validation on empty submit', async ({ page }) => {
  const demoPage = new DemoPage(page);

  await page.goto('/lets-get-started');
  await expect(demoPage.submitButton).toBeVisible();

  await demoPage.submitEmptyForm();

  await expect(demoPage.firstNameError).toBeVisible();
});
