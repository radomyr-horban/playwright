// @ts-check
const { test, expect } = require('@playwright/test')

test.describe.skip('Test suite', () => {
  test('random test', async ({ page }) => {
    await page.goto('https://playwright.dev/')

    const getStartedBtn = await page.locator(
      'header a[class="getStarted_Sjon"]'
    )
    await getStartedBtn.click()

    if (page.url().includes('intro')) {
      console.log('true')
      page.waitForURL(/intro/)

      const installLink = page.locator('li > a[href="#installing-playwright"]')
      installLink.waitFor()
      installLink.click()
    }

    await expect(page).toHaveURL(/installing/)
  })
})
