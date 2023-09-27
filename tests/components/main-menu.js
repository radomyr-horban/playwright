import { page } from '@playwright/test'

export default class MainMenu {
  // exports.MainMenu = class MainMenu {
  constructor(page) {
    this.page = page
    // this.issuesLink = this.page.locator('#main-menu > ul > li >.issues')
  }

  get issuesLink() {
    return this.page.locator('#main-menu > ul > li >.issues')
  }

  async clickOnIssuesLink() {
    await this.issuesLink.click()
  }
}

// export default new MainMenu(page)
