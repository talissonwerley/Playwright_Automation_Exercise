import { expect } from '@playwright/test'

export class CartPage {
  constructor(page) {
    this.page = page

    // Locators
    this.productsLink = page.getByRole('link', { name: 'Products' })
    this.searchInput = page.locator('#search_product')
    this.searchButton = page.locator('#submit_search')
    this.productItems = page.locator('.productinfo')
    this.removeButtons = page.locator('a.cart_quantity_delete')
    this.addToCartButtons = page.locator('.add-to-cart')
    this.viewCartLink = page.locator('p >> text=View Cart')
    this.modalTitle = page.locator('#cartModal .modal-title')
    this.continueShoppingBtn = page.locator('button.close-modal')
  }

  async navigateToProducts() {
    await this.productsLink.click()
    await expect(this.page).toHaveURL(/products/)
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName)
    await this.searchButton.click()
  }

  async addFirstProductToCart(index = 0) {
    // Passe o mouse sobre o produto antes de clicar no botão
    await this.productItems.nth(index).hover()
    const button = this.addToCartButtons.nth(index)
    await button.waitFor({ state: 'visible', timeout: 5000 })
    await button.click()

    try {
      await this.page.waitForSelector('#cartModal', {
        state: 'visible',
        timeout: 3000,
      })
    } catch {
      console.log('Modal não apareceu dentro do esperado, continuando...')
    }
  }

  async addProductToCart(index = 0) {
    await this.productItems.nth(index).scrollIntoViewIfNeeded()
    await this.productItems.nth(index).hover()
    // Seleciona o botão do overlay do produto correto
    const overlayButton = this.page
      .locator('.overlay-content > .btn')
      .nth(index)
    await overlayButton.waitFor({ state: 'visible', timeout: 5000 })
    await overlayButton.click()

    try {
      await this.page.waitForSelector('#cartModal', {
        state: 'visible',
        timeout: 3000,
      })
    } catch {
      console.log('Modal não apareceu dentro do esperado, continuando...')
    }
  }

  async continueShopping() {
    // Espera pelo botão estar pronto
    await this.continueShoppingBtn.waitFor({ state: 'visible' })
    await this.continueShoppingBtn.click()
    await this.page.waitForSelector('#cartModal', { state: 'hidden' })
  }

  async viewCart() {
    await this.viewCartLink.scrollIntoViewIfNeeded()
    await this.viewCartLink.click()
    await expect(this.page).toHaveURL(/view_cart/)
  }

  async expectSearchResults() {
    await expect(this.productItems.first()).toBeVisible()
  }

  async getProductCount() {
    return this.productItems.count()
  }

  async removeProductById(rowIndex = 0) {
    // Passa o mouse sobre a linha do produto
    const row = this.page.locator('#cart_info_table tbody tr').nth(rowIndex)
    await row.hover()
    const removeBtn = row.locator('a.cart_quantity_delete')
    await removeBtn.waitFor({ state: 'visible', timeout: 5000 })
    await removeBtn.click()
    await this.page.waitForTimeout(1000)
  }
}
