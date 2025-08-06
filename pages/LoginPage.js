// pages/LoginPage.js

export default class LoginPage {
  constructor(page) {
    this.page = page
    this.loginLink = page.locator('a[href="/login"]')
    this.emailInput = page.locator('input[data-qa="login-email"]')
    this.passwordInput = page.locator('input[data-qa="login-password"]')
    this.loginButton = page.locator('button[data-qa="login-button"]')
    this.logoutLink = page.locator('a[href="/logout"]')
    this.loggedInText = page.locator('text=Logged in as')
    this.errorMessage = page.locator('p:has-text("incorrect!")')
  }

  async gotoLoginPage() {
    await this.page.goto('https://automationexercise.com')
    await this.loginLink.click()
  }

  async login(email, password) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async logout() {
    await this.logoutLink.click()
  }
}
