export default class LoginPage {
  constructor(page) {
    this.page = page
  }

  get successfulRegistrationMsg() {
    return this.page.locator('div[id="flash_notice"]')
  }
}
