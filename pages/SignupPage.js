import { expect } from '@playwright/test'

export class SignupPage {
  constructor(page) {
    this.page = page
    this.nameInput = page.locator('input[data-qa="signup-name"]')
    this.emailInput = page.locator('input[data-qa="signup-email"]')
    this.signupButton = page.locator('button[data-qa="signup-button"]')
    this.signupSuccess = page.locator('text=Enter Account Information')
    // Usando getByText para capturar o erro específico
    this.signupError = page.getByText('Email Address already exist!')
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/login')
  }

  async fillSignupForm(name, email) {
    if (name !== undefined) await this.nameInput.fill(name)
    if (email !== undefined) await this.emailInput.fill(email)
    await this.signupButton.click()
  }

  async expectSignupSuccess() {
    await expect(this.signupSuccess).toBeVisible({ timeout: 10000 })
  }

  async expectSignupError(message) {
    await this.page.waitForSelector(`text=${message}`, { timeout: 7000 })
    await expect(this.signupError).toHaveText(message)
  }
}
