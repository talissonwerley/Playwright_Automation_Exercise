import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/SignupPage'

test.describe('Cadastro de usuário', () => {
  let signupPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    await signupPage.goto()
  })

  test('Cadastro com dados válidos', async () => {
    const nome = 'Usuário Teste'
    const emailUnico = 'usuario.teste+' + Date.now() + '@email.com'

    await signupPage.fillSignupForm(nome, emailUnico)
    await signupPage.expectSignupSuccess()
  })

  test('Tentativa de cadastro com e-mail já existente', async ({ page }) => {
    const signupPage = new SignupPage(page) // você já tem isso no beforeEach, pode reaproveitar
    const nome = 'automationtest'
    const emailJaRegistrado = 'automationtest@email.com'

    await page.goto('https://automationexercise.com')
    await page.getByRole('link', { name: 'Signup / Login' }).click()

    await expect(
      page.getByRole('heading', { name: 'New User Signup!' })
    ).toBeVisible()

    await signupPage.fillSignupForm(nome, emailJaRegistrado)
    await signupPage.expectSignupError('Email Address already exist!')
  })

  test('Validação dos campos obrigatórios - nome ausente e email ausente', async ({
    page,
  }) => {
    const signupPage = new SignupPage(page)
    await signupPage.goto()
    await expect(page.locator('text=New User Signup!')).toBeVisible()

    await signupPage.fillSignupForm()

    const nameValidity = await signupPage.nameInput.evaluate(
      (input) => input.validity.valueMissing
    )
    expect(nameValidity).toBe(true)

    const emailValidity = await signupPage.emailInput.evaluate(
      (input) => input.validity.valueMissing
    )
    expect(emailValidity).toBe(true)
  })

  test('Validação dos campos obrigatórios - nome ausente e email preenchido', async ({
    page,
  }) => {
    const signupPage = new SignupPage(page)
    await signupPage.goto()
    await expect(page.locator('text=New User Signup!')).toBeVisible()

    const validEmail = 'usuario@emailvalido.com'
    await signupPage.fillSignupForm(undefined, validEmail)

    const nameValidity = await signupPage.nameInput.evaluate(
      (input) => input.validity.valueMissing
    )
    expect(nameValidity).toBe(true)

    const emailValidity = await signupPage.emailInput.evaluate(
      (input) => input.validity.valid
    )
    expect(emailValidity).toBe(true)
  })

  test('Validação dos campos obrigatórios - nome preenchido e email ausente', async ({
    page,
  }) => {
    const signupPage = new SignupPage(page)
    await signupPage.goto()
    await expect(page.locator('text=New User Signup!')).toBeVisible()

    const validName = 'Usuário Teste'
    await signupPage.fillSignupForm(validName, undefined)

    const emailValidity = await signupPage.emailInput.evaluate(
      (input) => input.validity.valueMissing
    )
    expect(emailValidity).toBe(true)

    const nameValidity = await signupPage.nameInput.evaluate(
      (input) => input.validity.valid
    )
    expect(nameValidity).toBe(true)
  })
})
