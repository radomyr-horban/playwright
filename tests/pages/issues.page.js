import { page } from '@playwright/test'

export default class IssuesPage {
  // exports.PlaywrightDevPage = class IssuesPage {
  constructor(page) {
    this.page = page
    // this.nextPageBtn = this.page.locator('ul > .next > a')
  }

  get nextPageBtn() {
    return this.page.locator('ul > .next > a')
  }

  async clickOnNextPageBtn() {
    await this.nextPageBtn.click()
  }
}

// export default new IssuesPage(page)
