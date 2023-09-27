// @ts-check
const { test, expect } = require('@playwright/test')
const { default: MainMenu } = require('../components/main-menu')
const { default: IssuesPage } = require('../pages/issues.page')

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.redmine.org/')
})

test.describe('Issues page', () => {
  test('should change pages after clicking on the pagination', async ({
    page,
  }) => {
    const mainMenu = new MainMenu(page)
    const issuesPage = new IssuesPage(page)

    await mainMenu.clickOnIssuesLink()
    await issuesPage.clickOnNextPageBtn()

    await expect(page).toHaveURL(/page=2/)
  })
})
