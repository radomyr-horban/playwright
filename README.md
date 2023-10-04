# Task 1: Playwright

### General requirements

- Install a git client such as [git bash](https://git-scm.com/downloads)

Download and install:

- Node version: 18 [(Node.js)](https://nodejs.org/en)
- Java Development Kit [(JDK)](https://www.oracle.com/java/technologies/downloads/)
  - Make sure you have the environment variable **JAVA_HOME** set to the path of the respective JDK. **(Required for Allure report generation)**.

#### Clone the repository

    git clone https://github.com/radomyr-horban/playwright.git

### Installing dependencies

    npm ci

#### To run the tests go to the root of the project and run

    npm run test

#### To generate a Playwright's Allure report of test results run

    npm run generate-allure-report

#### To open the Playwright's Allure report in a browser run

    npm run open-allure-report

#### **IMPORTANT**

After each upgrade of **Playwright**, the project must be restarted locally with the command:

    npm run reinstall
