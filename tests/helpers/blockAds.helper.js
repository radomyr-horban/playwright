//! 1
await page.route('**/*', async (request) => {
  request.request().url().includes('google_vignette')
    ? request.abort()
    : request.continue()
  return
})

//! 2
await page.route(/google_vignette/, () => {
  page.locator('div [aria-label="Close ad"] > div').click()
})

//! 3
if (await page.url().includes('google_vignette')) {
  await page.locator('div [aria-label="Close ad"] > div').click()
}

//! 4
await page.route(/google_vignette/, (route) => {
  return route.abort()
})

//! 5
page.on('popup', async (popup) => {
  await popup.waitForLoadState()
  console.log('popup - ' + (await popup.title()))
})

//! 6
page.on('load', async (page) => {
  if (page.url().includes('google_vignette')) {
    await page.locator('div [aria-label="Close ad"] > div').click()
  }
})
//! 7

const blockElement = await page.locator('div[id = "ad_position_box"]')
if (await blockElement.isVisible()) {
  await page.locator('div [aria-label="Close ad"] > div').click()
}
