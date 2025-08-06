import { expect } from '@playwright/test'

export default class ContactPage {
  constructor(page) {
    this.page = page
    this.menuHome = page.getByRole('link', { name: /Home/i })
    this.menuContactUs = page.getByRole('link', { name: /Contact Us/i })
    //
    this.inputName = page.locator('[data-qa="name"]')
    this.inputEmail = page.locator('[data-qa="email"]')
    this.inputSubject = page.locator('[data-qa="subject"]')
    this.inputMessage = page.locator('[data-qa="message"]')
    this.submitButton = page.locator('[data-qa="submit-button"]')
    this.successMessage = page.locator('div.status.alert-success')
  }

  async goToAndAssert(linkLocator, expectedURLSubstring, expectedText) {
    await linkLocator.first().click()
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.page).toHaveURL(new RegExp(expectedURLSubstring))
    if (expectedText) {
      await expect(this.page.locator(`text=${expectedText}`)).toBeVisible()
    }
  }

  async fillContactForm({ name, email, subject, message }) {
    await this.inputName.fill(name)
    await this.inputEmail.fill(email)
    await this.inputSubject.fill(subject)
    await this.inputMessage.fill(message)
  }

  async submitForm() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept()
    })

    await this.submitButton.click()
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toHaveText(
      'Success! Your details have been submitted successfully.'
    )
  }
}
