export default class RegisterPage {
  constructor(page) {
    this.page = page
  }

  //! getters
  get loginInput() {
    return this.page.locator('input[id="user_login"]')
  }
  get passwordInput() {
    return this.page.locator('input[id="user_password"]')
  }
  get passwordConfirmationInput() {
    return this.page.locator('input[id="user_password_confirmation"]')
  }
  get firstnameInput() {
    return this.page.locator('input[id="user_firstname"]')
  }
  get lastnameInput() {
    return this.page.locator('input[id="user_lastname"]')
  }
  get emailInput() {
    return this.page.locator('input[id="user_mail"]')
  }
  get submitBtn() {
    return this.page.locator('input[type="submit"]')
  }

  //! setters
  async setLoginInput(value) {
    await this.loginInput.fill(value)
  }
  async setPasswordInput(value) {
    await this.passwordInput.fill(value)
  }
  async setPasswordConfirmationInput(value) {
    await this.passwordConfirmationInput.fill(value)
  }
  async setFirstnameInput(value) {
    await this.firstnameInput.fill(value)
  }
  async setLastnameInput(value) {
    await this.lastnameInput.fill(value)
  }
  async setEmailInput(value) {
    await this.emailInput.fill(value)
  }

  //! clickers
  async clickOnLoginInput() {
    await this.loginInput.click()
  }
  async clickOnPasswordInput() {
    await this.passwordInput.click()
  }
  async clickOnPasswordConfirmationInput() {
    await this.passwordConfirmationInput.click()
  }
  async clickOnFirstnameInput() {
    await this.firstnameInput.click()
  }
  async clickOnLastnameInput() {
    await this.lastnameInput.click()
  }
  async clickOnEmailInput() {
    await this.emailInput.click()
  }
  async clickOnSubmitBtn() {
    await this.submitBtn.click()
  }
}
