export async function createDefaultUser(registerPage, userData) {
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
}
