class ResourcesPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('.listing__search').getByPlaceholder('Search');
    this.resultItems = page.locator('.listing__list .listing__item:visible');
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}

module.exports = { ResourcesPage };
