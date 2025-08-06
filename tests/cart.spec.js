import { test, expect } from '@playwright/test'
import { CartPage } from '../pages/CartPage.js'

test.describe('Funcionalidades do Carrinho', () => {
  let cartPage

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page)
    await page.goto('https://www.automationexercise.com')
  })

  test('Adicionar produto ao carrinho', async () => {
    await cartPage.navigateToProducts()
    await cartPage.addFirstProductToCart()
    await cartPage.viewCart()

    await expect(cartPage.page.locator('#cart_info_table')).toBeVisible()
  })

  test('Adicionar múltiplos produtos ao carrinho', async () => {
    await cartPage.navigateToProducts()

    // Desabilita/oculta propagandas
    await cartPage.page.evaluate(() => {
      // Exemplo: oculta todos iframes e divs de ads
      document
        .querySelectorAll('iframe, .ads, .ad, [id*="ad"]')
        .forEach((el) => (el.style.display = 'none'))
    })

    await cartPage.addProductToCart(0)
    await cartPage.continueShopping()
    await cartPage.addProductToCart(1)
    await cartPage.continueShopping()
    await cartPage.addProductToCart(2)

    await cartPage.page.goto('https://www.automationexercise.com/view_cart')
    await expect(cartPage.page.locator('#cart_info_table')).toBeVisible()

    // (Opcional) Confirma que há 3 produtos no carrinho
    const count = await cartPage.page
      .locator('#cart_info_table tbody tr')
      .count()
    expect(count).toBe(3)
  })

  test('Remover um produto do carrinho', async () => {
    await cartPage.navigateToProducts()
    await cartPage.addFirstProductToCart()
    await cartPage.viewCart()
    await expect(cartPage.page.locator('#cart_info_table')).toBeVisible()
    const countAntes = await cartPage.page
      .locator('#cart_info_table tbody tr')
      .count()
    await cartPage.removeProductById(0) // Remove o primeiro produto
    const countDepois = await cartPage.page
      .locator('#cart_info_table tbody tr')
      .count()
    expect(countDepois).toBe(countAntes - 1)
  })
})
