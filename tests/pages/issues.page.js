export default class IssuesPage {
  constructor(page) {
    this.page = page
  }

  get nextPageBtn() {
    return this.page.locator('ul > .next > a')
  }

  async clickOnNextPageBtn() {
    await this.nextPageBtn.click()
  }
}
