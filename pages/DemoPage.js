class DemoPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.submitButton = page.getByRole('button', { name: 'Book a Demo' });
    this.firstNameField = page.locator('.hs-form-field').filter({ has: this.firstNameInput });
    this.firstNameError = this.firstNameField.getByText('Please complete this required field.');
  }

  async submitEmptyForm() {
    await this.submitButton.click();
  }
}

module.exports = { DemoPage };
