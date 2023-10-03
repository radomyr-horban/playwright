// import { PlaywrightBlocker } from '@cliqz/adblocker-playwright'
// import fetch from 'cross-fetch'

const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
const { default: fetch } = require('cross-fetch')

export function blockAds(page) {
  return PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInPage(page)
  })
}
