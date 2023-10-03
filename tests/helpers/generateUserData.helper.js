export function generateUserData() {
  const randomString = (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const randomEmail = `${randomString(8)}@example.com`
  const randomPassword = randomString(10)
  const randomFirstName = randomString(6)
  const randomLastName = randomString(6)

  return {
    email: randomEmail,
    password: randomPassword,
    firstName: randomFirstName,
    lastName: randomLastName,
  }
}
