import { test, expect } from '@playwright/test'
import ContactPage from '../pages/ContactPage.js'

test.describe('Contact Us', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/')
  })

  test('Acessar página Contact Us', async ({ page }) => {
    const contactPage = new ContactPage(page)
    await contactPage.goToAndAssert(
      contactPage.menuContactUs,
      'contact_us',
      'Get In Touch'
    )

    await contactPage.fillContactForm({
      name: 'automationtester',
      email: 'automationtest@email.com',
      subject: 'Só testando aqui para testar',
      message: 'Rapaz, eu tava testando aqui resolvi testar.',
    })

    await contactPage.submitForm()

    await contactPage.assertSuccessMessage()
  })
})
