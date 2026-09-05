const { test, expect } = require('@playwright/test');
const { ResourcesPage } = require('../../pages/ResourcesPage');

test('search the Resource Hub for TPRM', async ({ page }) => {
  const resourcesPage = new ResourcesPage(page);

  await page.goto('/resources');
  await resourcesPage.resultItems.first().waitFor();

  const before = await resourcesPage.resultItems.count();

  await resourcesPage.searchFor('TPRM');

  await expect.poll(async () => await resourcesPage.resultItems.count()).toBeLessThan(before);
  await expect(resourcesPage.resultItems.getByText(/TPRM/i).first()).toBeVisible();
});
