import { test, expect } from '@playwright/test'
import CheckoutPage from '../pages/CheckoutPage.js'

const validEmail = 'automationtest@email.com'
const validPassword = '123456'

const paymentDetails = {
  name: 'João da Silva',
  cardNumber: '4111111111111111',
  cvv: '123',
  expiryDate: '08/2025',
}

test.describe('Checkout/ Finalizar Compra', () => {
  let checkoutPage

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page)
    await page.goto('https://www.automationexercise.com')
  })

  test('Fluxo completo', async () => {
    await checkoutPage.gotoLoginPage()
    await checkoutPage.login(validEmail, validPassword)
    await expect(checkoutPage.loggedInText).toContainText('Logged in as')
    await checkoutPage.navigateToProducts()
    await checkoutPage.addFirstProductToCart()
    await checkoutPage.viewCart()
    await expect(checkoutPage.page.locator('#cart_info_table')).toBeVisible()

    await checkoutPage.proceedToCheckout()
    await checkoutPage.clickPlaceOrder()
    await checkoutPage.submitPaymentForm(paymentDetails)
    await expect(checkoutPage.orderConfirmationMessage).toBeVisible()

    // Verificação final
    await expect(checkoutPage.orderConfirmationMessage).toHaveText(
      'Congratulations! Your order has been confirmed!'
    )
  })
})
