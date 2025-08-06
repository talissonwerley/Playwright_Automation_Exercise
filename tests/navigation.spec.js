import { test, expect } from '@playwright/test'
import NavigationPage from '../pages/NavigationPage.js'

test.describe('Navegação Geral do Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/')
  })

  test('Acessar página Home', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.goToAndAssert(navigation.menuHome, '/', 'Home')
  })

  test('Acessar página Products', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.goToAndAssert(
      navigation.menuProducts,
      'products',
      'All Products'
    )
  })

  test('Acessar página Cart', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.goToAndAssert(
      navigation.menuCart,
      'view_cart',
      'Shopping Cart'
    )
  })

  test('Acessar página Signup / Login', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.goToAndAssert(
      navigation.menuSignupLogin,
      'login',
      'Login to your account'
    )
  })

  test('Acessar página Contact Us', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.goToAndAssert(
      navigation.menuContactUs,
      'contact_us',
      'Get In Touch'
    )
  })
})
