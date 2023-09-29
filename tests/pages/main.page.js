export default class MainPage {
  constructor(page) {
    this.page = page
  }

  get masteringRedmineBook() {
    return this.page.locator('table > tbody > tr > td > a > img').first()
  }

  async clickOnMasteringRedmineBook() {
    await this.masteringRedmineBook.click()
  }
}
