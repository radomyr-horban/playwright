// @ts-check
import { test, expect } from '@playwright/test'

import MainMenu from '../components/main-menu'
import TopMenu from '../components/top-menu'

import IssuesPage from '../pages/issues.page'
import MainPage from '../pages/main.page'
import RegisterPage from '../pages/register.page'
import LoginPage from '../pages/login.page'
import SearchResultsPage from '../pages/searchResults.page'

import { generateUserData } from '../helpers/generateUserData.helper'
import { blockAds } from '../helpers/blockAds.helper'
import { createDefaultUser } from '../helpers/createDefaultUser.helper'

test.beforeEach(async ({ page }) => {
  blockAds(page)
  await page.goto('https://www.redmine.org/')
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Main page', () => {
  test('should open online shop page after clicking on the book image', async ({
    page,
  }) => {
    const mainPage = new MainPage(page)

    await mainPage.masteringRedmineBook.scrollIntoViewIfNeeded()
    await mainPage.clickOnMasteringRedmineBook()

    await expect(page).toHaveURL(
      /www.packtpub.com\/product\/mastering-redmine-second-edition/
    )
  })

  test('should open the results page with items containing the searched word', async ({
    page,
  }) => {
    const topMenu = new TopMenu(page)
    const searchResultsPage = new SearchResultsPage(page)
    const searchedWord = 'car'

    await topMenu.clickOnSearchField()
    await topMenu.setSearchField(searchedWord)
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/search/)
    await expect(page).toHaveURL(new RegExp(searchedWord))
    await expect(searchResultsPage.resultsDescription).toContainText(
      searchedWord
    )
  })
})

test.describe('Issues page', () => {
  test('should show page number in the URL after clicking on the pagination', async ({
    page,
  }) => {
    const mainMenu = new MainMenu(page)
    const issuesPage = new IssuesPage(page)

    await mainMenu.clickOnIssuesLink()
    await page.waitForURL(/issues/)
    await expect(page).toHaveURL(/issues/)

    await issuesPage.clickOnNextPageBtn()
    await expect(page).toHaveURL(/page=2/)
  })
})

test.describe('Registration page', () => {
  test('should allow a user to register', async ({ page }) => {
    const topMenu = new TopMenu(page)
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)

    const userData = generateUserData()

    await topMenu.clickOnRegisterLink()
    createDefaultUser(registerPage, userData)

    await expect(page).toHaveURL(/login/)
    await expect(loginPage.successfulRegistrationMsg).toBeVisible()
  })
})

test.describe('Top menu links', () => {
  test('should open the corresponding pages after clicking on them', async ({
    page,
  }) => {
    const topMenu = new TopMenu(page)
    const topMenuLinksUrl = topMenu.topMenuLinksUrl

    for (let link in topMenuLinksUrl) {
      await topMenu.clickTopMenuLinkByClassName(link)
      const expectedURL = new RegExp(topMenuLinksUrl[link])
      await expect(page).toHaveURL(expectedURL)
    }
  })
})
