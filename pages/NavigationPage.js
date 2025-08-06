import { expect } from '@playwright/test'

export default class NavigationPage {
  constructor(page) {
    this.page = page
    this.menuHome = page.getByRole('link', { name: /Home/i })
    this.menuProducts = page.getByRole('link', { name: /Products/i })
    this.menuCart = page.getByRole('link', { name: /Cart/i })
    this.menuSignupLogin = page.getByRole('link', { name: /Signup|Login/i })
    this.menuContactUs = page.getByRole('link', { name: /Contact Us/i })
  }

  async goToAndAssert(linkLocator, expectedURLSubstring, expectedText) {
    await linkLocator.first().click()
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.page).toHaveURL(new RegExp(expectedURLSubstring))
    if (expectedText) {
      await expect(this.page.locator(`text=${expectedText}`)).toBeVisible()
    }
  }
}
