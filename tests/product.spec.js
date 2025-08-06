import { test, expect } from '@playwright/test'
import { ProductsPage } from '../pages/ProductsPage.js'

test.describe('Funcionalidades de Produtos', () => {
  let productsPage

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page)
    await page.goto('https://www.automationexercise.com')
  })

  test('Pesquisa de produto válida', async () => {
    await productsPage.navigateToProducts()
    await productsPage.searchForProduct('T-Shirt')
    await productsPage.expectSearchResults()

    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)
  })

  test('Adicionar produto ao carrinho', async () => {
    await productsPage.navigateToProducts()
    await productsPage.addFirstProductToCart()
    await productsPage.viewCart()

    await expect(productsPage.page.locator('#cart_info_table')).toBeVisible()
  })

  test('Adicionar múltiplos produtos ao carrinho', async () => {
    await productsPage.navigateToProducts()

    await productsPage.page.evaluate(() => {
      document
        .querySelectorAll('iframe, .ads, .ad, [id*="ad"]')
        .forEach((el) => (el.style.display = 'none'))
    })

    await productsPage.addProductToCart(0)
    await productsPage.continueShopping()
    await productsPage.addProductToCart(1)
    await productsPage.continueShopping()
    await productsPage.addProductToCart(2)

    await productsPage.page.goto('https://www.automationexercise.com/view_cart')
    await expect(productsPage.page.locator('#cart_info_table')).toBeVisible()

    const count = await productsPage.page
      .locator('#cart_info_table tbody tr')
      .count()
    expect(count).toBe(3)
  })
})
