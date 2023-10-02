// @ts-check

const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')

const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
const { default: fetch } = require('cross-fetch')

const { default: MainMenu } = require('../components/main-menu')
const { default: TopMenu } = require('../components/top-menu')

const { default: IssuesPage } = require('../pages/issues.page')
const { default: MainPage } = require('../pages/main.page')
const { default: RegisterPage } = require('../pages/register.page')
const { default: LoginPage } = require('../pages/login.page')

const { generateUserData } = require('../helpers/generateUserData.helper')

let page
test.beforeEach(async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  page = await context.newPage()

  //Todo: move to a seperate helper
  PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInPage(page)
  })

  await page.goto('https://www.redmine.org/')
})

test.afterEach(async () => {
  await page.close()
})

test.describe('Issues page', () => {
  test('should show page number in the URL after clicking on the pagination', async () => {
    const mainMenu = new MainMenu(page)
    await mainMenu.clickOnIssuesLink()

    await page.waitForURL(/issues/)
    await expect(page).toHaveURL(/issues/)
  })
})

test.describe('Main page', () => {
  //! Redirection in the “Readmine books” section
  test('should redirect the browser after clicking on the book image', async () => {
    const mainPage = new MainPage(page)
    await mainPage.masteringRedmineBook.scrollIntoViewIfNeeded()
    await mainPage.clickOnMasteringRedmineBook()

    //Todo: change the expected URL
    await expect(page).toHaveURL(
      'https://www.packtpub.com/product/mastering-redmine-second-edition/9781785881305'
    )
  })
  //! Search
  test('should open the results page with the searched word ', async () => {
    const topMenu = new TopMenu(page)
    await topMenu.clickOnSearchField()
  })
})

test.describe('Registration page', () => {
  test('should allow a user to register', async () => {
    const topMenu = new TopMenu(page)
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)

    const userData = generateUserData()

    await topMenu.clickOnRegisterLink()

    //TODO: move to a seperate function `createUser`
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
  test('should open to the correspong pages', async () => {
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
