export default class MainMenu {
  constructor(page) {
    this.page = page
  }

  get issuesLink() {
    return this.page.locator('#main-menu > ul > li >.issues')
  }

  async clickOnIssuesLink() {
    await this.issuesLink.click()
  }
}
