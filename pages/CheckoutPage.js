import { expect } from '@playwright/test'

export default class CheckoutPage {
  constructor(page) {
    this.page = page
    this.loginLink = page.locator('a[href="/login"]')
    this.emailInput = page.locator('input[data-qa="login-email"]')
    this.passwordInput = page.locator('input[data-qa="login-password"]')
    this.loginButton = page.locator('button[data-qa="login-button"]')
    this.loggedInText = page.locator('text=Logged in as')
    this.errorMessage = page.locator('p:has-text("incorrect!")')
    this.productsLink = page.getByRole('link', { name: 'Products' })
    this.searchInput = page.locator('#search_product')
    this.searchButton = page.locator('#submit_search')
    this.productItems = page.locator('.productinfo')
    this.addToCartButtons = page.locator('.add-to-cart')
    this.viewCartLink = page.locator('p >> text=View Cart')
    this.modalTitle = page.locator('#cartModal .modal-title')
    this.continueShoppingBtn = page.locator('button.close-modal')
    // Product
    this.checkoutButton = this.page.locator('a.btn.btn-default.check_out')
    this.productQuantity = this.page.getByRole('cell', { name: 'Quantity' })
    this.productPrice = this.page.locator('.product-price')
    this.continueOnCartButton = this.page.locator('button.close-checkout-modal')
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })
    this.reviewOrderHeading = page.locator('h2.heading', {
      hasText: 'Review Your Order',
    })

    //Formulário Payment
    this.nameOnCardInput = page.locator('input[name="name_on_card"]')
    this.cardNumberInput = page.locator('input[name="card_number"]')
    this.cvcInput = page.getByRole('textbox', { name: 'ex.' })
    this.expiryMonthInput = page.getByRole('textbox', { name: 'MM' })
    this.expiryYearInput = page.getByRole('textbox', { name: 'YYYY' })
    this.payAndConfirmButton = page.getByRole('button', {
      name: 'Pay and Confirm Order',
    })
    this.orderConfirmationMessage = page.locator('p', {
      hasText: 'Congratulations! Your order has been confirmed!',
    })
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

  async gotoProducts() {
    await this.page.goto('/products')
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

  //

  async proceedToCheckout() {
    await this.checkoutButton.click()
  }

  async clickContinueOnCart() {
    await this.continueOnCartButton.waitFor({ state: 'visible', timeout: 5000 })
    await this.continueOnCartButton.click()
    await this.page.waitForTimeout(1000) // Espera para garantir que o modal feche
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.waitFor({ state: 'visible', timeout: 7000 }) // Corrigido aqui
    await this.reviewOrderHeading.scrollIntoViewIfNeeded()
    await this.placeOrderButton.click()
    await this.page.waitForTimeout(5000)
  }

  async submitPaymentForm(details) {
    await this.nameOnCardInput.fill(details.name)
    await this.cardNumberInput.fill(details.cardNumber)
    await this.cvcInput.fill(details.cvv)
    await this.expiryMonthInput.fill(details.expiryDate.split('/')[0])
    await this.expiryYearInput.fill(details.expiryDate.split('/')[1])
    await this.payAndConfirmButton.waitFor({ state: 'visible' })
    await this.payAndConfirmButton.click()
  }
}
