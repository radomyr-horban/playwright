// @ts-check
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.redmine.org/')
})

test.describe('', () => {
  test('', async ({ page }) => {})
  test('', async ({ page }) => {})
})
