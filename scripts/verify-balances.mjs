/**
 * Assert ledger balances stay mathematically consistent.
 * Run: node scripts/verify-balances.mjs
 */
import assert from 'node:assert/strict'
import {
  EUR_OPENING_MINOR,
  EUR_CREDITS_MINOR,
  EUR_DEBITS_MINOR,
  EUR_FEES_MINOR,
  GBP_OPENING_MINOR,
  calculateEurClosingMinor,
  calculateGbpClosingMinor,
  calculateHomeTotalGbpMinor,
  eurMinorToGbpMinor,
  formatMajorFromMinor,
  accountBalances,
  EUR_TO_GBP_RATE,
} from '../src/data/accountBalances.js'

const eurCredits = EUR_CREDITS_MINOR.reduce((s, e) => s + e.amountMinor, 0)
const eurDebits = EUR_DEBITS_MINOR.reduce((s, e) => s + e.amountMinor, 0)

assert.equal(eurCredits, 620_000, 'EUR credits must be +6,200.00')
assert.equal(eurDebits, 111_600 + 120_900, 'EUR debits must be 1116 + 1209')
assert.equal(EUR_FEES_MINOR, 0, 'No EUR fees posted')
assert.equal(
  calculateEurClosingMinor(),
  EUR_OPENING_MINOR + eurCredits - eurDebits - EUR_FEES_MINOR,
  'EUR closing formula',
)
assert.equal(calculateEurClosingMinor(), 685_500, 'EUR closing = 6,855.00')
assert.equal(formatMajorFromMinor(calculateEurClosingMinor()), '6,855.00')

assert.equal(calculateGbpClosingMinor(), GBP_OPENING_MINOR, 'GBP unchanged at opening')
assert.equal(calculateGbpClosingMinor(), 304_300, 'GBP closing = 3,043.00')
assert.equal(formatMajorFromMinor(calculateGbpClosingMinor()), '3,043.00')

assert.equal(EUR_TO_GBP_RATE, 0.85)
assert.equal(eurMinorToGbpMinor(685_500), 582_675)
assert.equal(calculateHomeTotalGbpMinor(), 304_300 + 582_675)
assert.equal(formatMajorFromMinor(calculateHomeTotalGbpMinor()), '8,869.75')

assert.equal(accountBalances.eur, '6,855.00')
assert.equal(accountBalances.gbp, '3,043.00')
assert.equal(accountBalances.homeTotalGbp, '8,869.75')

// Double-counting guard: each posted id appears once
const ids = [...EUR_CREDITS_MINOR, ...EUR_DEBITS_MINOR].map((e) => e.id)
assert.equal(new Set(ids).size, ids.length, 'No duplicate EUR ledger ids')

// Net EUR change vs verified opening (PANAGIOTIS 1209 replaces THOMAS 747)
assert.equal(6200 - 1116 - 1209, 3875)
assert.equal(2980 + 3875, 6855)

console.log('verify-balances: PASS')
console.log(JSON.stringify({
  eurOpening: formatMajorFromMinor(EUR_OPENING_MINOR),
  eurCredits: formatMajorFromMinor(eurCredits),
  eurDebits: formatMajorFromMinor(eurDebits),
  eurFees: formatMajorFromMinor(EUR_FEES_MINOR),
  eurClosing: accountBalances.eur,
  gbpOpening: formatMajorFromMinor(GBP_OPENING_MINOR),
  gbpClosing: accountBalances.gbp,
  homeTotalGbp: accountBalances.homeTotalGbp,
  rate: EUR_TO_GBP_RATE,
}, null, 2))
