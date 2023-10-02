// @ts-check
const { test, expect } = require('@playwright/test')

const { default: MainMenu } = require('../components/main-menu')
const { default: TopMenu } = require('../components/top-menu')

const { default: IssuesPage } = require('../pages/issues.page')
const { default: MainPage } = require('../pages/main.page')
const { default: RegisterPage } = require('../pages/register.page')
const { default: LoginPage } = require('../pages/login.page')

const { generateUserData } = require('../helpers/generateUserData.helper')

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.redmine.org/')
})

test.describe.skip('Main page', () => {
  //! Redirection in the “Readmine books” section
  test('should redirect the browser after clicking on the book image', async ({
    page,
  }) => {
    // const mainPage = new MainPage(page)
    // await mainPage.masteringRedmineBook.scrollIntoViewIfNeeded()
    // await mainPage.clickOnMasteringRedmineBook()
    // await page.waitForURL('https://www.redmine.org/projects/redmine/issues')

    const mainMenu = new MainMenu(page)
    await mainMenu.clickOnIssuesLink()
    await expect(page).toHaveURL(/issues/, { timeout: 10000 })
    // await expect(page).toHaveURL('https://www.redmine.org')
  })
  //! Search
  test('should open the results page with the searched word ', async ({
    page,
  }) => {
    const topMenu = new TopMenu(page)
    await topMenu.clickOnSearchField()
  })
})

test.describe.skip('Issues page', () => {
  test('should show page number in the URL after clicking on the pagination', async ({
    page,
  }) => {
    //! Close the ads
    // page.on('request', async () => {
    //   console.log('Current URL - ' + page.url())

    // if (page.url().includes('google_vignette')) {
    //   // console.log('Condition URL - ' + page.url())
    //   await page.waitForURL(/google_vignette/)
    //   // await page.waitForSelector('div[aria-label="Close ad"] > div')
    //   const closeAdsBtn = page.locator('div [aria-label="Close ad"] > div')
    //   await closeAdsBtn.waitFor()
    //   await closeAdsBtn.click()
    // }
    // })

    const mainMenu = new MainMenu(page)
    // const issuesPage = new IssuesPage(page)
    await mainMenu.clickOnIssuesLink()

    if (page.url().includes('google_vignette')) {
      // await page.waitForURL(/google_vignette/)
      const closeAdsBtn = await page.locator(
        'div [aria-label="Close ad"] > div'
      )
      // await closeAdsBtn.waitFor()
      await closeAdsBtn.click()
    }

    await page.waitForURL(/issues/)
    await expect(page).toHaveURL(/issues/)

    // await issuesPage.clickOnNextPageBtn()
    // await expect(page).toHaveURL(/page=2/)
  })
})

test.describe.skip('Registration page', () => {
  test('should allow a user to register', async ({ page }) => {
    const topMenu = new TopMenu(page)
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)

    const userData = generateUserData()

    await topMenu.clickOnRegisterLink()

    await registerPage.clickOnLoginInput()
    await registerPage.setLoginInput(userData.email)

    await registerPage.clickOnPasswordInput()
    await registerPage.setPasswordInput(userData.password)

    await registerPage.clickOnPasswordConfirmationInput()
    await registerPage.setPasswordConfirmationInput(userData.password)

    await registerPage.clickOnFirstnameInput()
    await registerPage.setFirstnameInput(userData.firstName)

    await registerPage.clickOnLastnameInput()
    await registerPage.setLastnameInput(userData.lastName)

    await registerPage.clickOnEmailInput()
    await registerPage.setEmailInput(userData.email)

    await registerPage.clickOnSubmitBtn()

    await expect(page).toHaveURL(/login/)
    await expect(loginPage.successfulRegistrationMsg).toBeVisible()
  })
})

test.describe('Top menu links', () => {
  test('should open to the correspong pages', async ({ page }) => {
    const topMenu = new TopMenu(page)
    const topMenuLinksUrl = topMenu.topMenuLinksUrl

    //TODO: move into a separate method
    for (let link in topMenuLinksUrl) {
      console.log(link)
      await topMenu.clickTopMenuLinkByClassName(link)

      const expectedURL = new RegExp(topMenuLinksUrl[link])
      await expect(page).toHaveURL(expectedURL)
    }
  })
})
