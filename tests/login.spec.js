import { test, expect } from '@playwright/test'
import LoginPage from '../pages/LoginPage.js' // Note a extensão .js obrigatória

const validEmail = 'automationtest@email.com'
const validPassword = '123456'
const invalidEmail = 'naoexiste@exemplo.com'
const invalidPassword = 'senhaerrada'

test.describe('Login / Logout Flow', () => {
  test('Login com credenciais válidas', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.gotoLoginPage()
    await loginPage.login(validEmail, validPassword)

    await expect(loginPage.loggedInText).toContainText('Logged in as')
  })

  test('Login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.gotoLoginPage()
    await loginPage.login(invalidEmail, invalidPassword)

    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toHaveText(
      'Your email or password is incorrect!'
    )
  })

  test('Logout após login bem-sucedido', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.gotoLoginPage()
    await loginPage.login(validEmail, validPassword)

    await expect(loginPage.loggedInText).toBeVisible()

    await loginPage.logout()
    await expect(page).toHaveURL(/.*\/login/)
  })
})
