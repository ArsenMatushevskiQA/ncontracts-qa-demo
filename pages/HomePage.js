class HomePage {
  constructor(page) {
    this.page = page;
    this.websiteNav = page.getByRole('navigation', { name: 'Website' });
  }

  async openComplianceManagement() {
    await this.websiteNav.getByRole('menuitem', { name: 'Solutions' }).hover();
    await this.websiteNav.getByRole('link', { name: 'Compliance Management', exact: true }).click();
  }
}

module.exports = { HomePage };
