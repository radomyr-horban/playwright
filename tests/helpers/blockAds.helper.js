//! 1
await page.route('/google_vignette/', (route) => {
  if (route.request().url().includes('google_vignette')) {
    route.abort()
  } else {
    route.continue()
  }
})

//! 2
await page.route('**/google_vignette**', (route) => {
  // route.abort()
  console.log('resource type: ' + route.request().resourceType())
  // page.locator('div [aria-label="Close ad"] > div').click()
})

//! 3
if (await page.url().includes('google_vignette')) {
  // console.log("resource type: " + route.request().resourceType())
  await page.locator('div [aria-label="Close ad"] > div').click()
}

//! 4
await page.route('**/google_vignette**', (route) => {
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
