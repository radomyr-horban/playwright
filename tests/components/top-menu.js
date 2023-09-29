export default class TopMenu {
  constructor(page) {
    this.page = page
  }

  //! search
  get searchField() {
    return this.page.locator('form > input[id="q"]')
  }
  get registerLink() {
    return this.page.locator('li [class="register"]')
  }

  get topMenuLinksUrl() {
    return {
      login: '.*/login',
      register: '.*/register',
      home: './*redmine.org',
      projects: '.*/projects',
      help: '.*/guide',
    }
  }

  //! clickers
  async clickOnSearchField() {
    await this.searchField.click()
  }
  async clickOnRegisterLink() {
    await this.registerLink.click()
  }

  async clickOnTopMenuLink(link) {
    await link.click()
  }

  async clickTopMenuLinkByClassName(className) {
    return this.page.locator(`#top-menu a.${className}`).click()
  }
}
