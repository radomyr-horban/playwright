export default class SearchResultsPage {
  constructor(page) {
    this.page = page
  }

  get resultsDescription() {
    return this.page.locator('span[class="description"]').first()
  }
}
