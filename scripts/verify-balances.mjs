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
assert.equal(eurDebits, 65_100 + 74_700, 'EUR debits must be 651 + 747')
assert.equal(EUR_FEES_MINOR, 0, 'No EUR fees posted')
assert.equal(
  calculateEurClosingMinor(),
  EUR_OPENING_MINOR + eurCredits - eurDebits - EUR_FEES_MINOR,
  'EUR closing formula',
)
assert.equal(calculateEurClosingMinor(), 778_200, 'EUR closing = 7,782.00')
assert.equal(formatMajorFromMinor(calculateEurClosingMinor()), '7,782.00')

assert.equal(calculateGbpClosingMinor(), GBP_OPENING_MINOR, 'GBP unchanged at opening')
assert.equal(calculateGbpClosingMinor(), 304_300, 'GBP closing = 3,043.00')
assert.equal(formatMajorFromMinor(calculateGbpClosingMinor()), '3,043.00')

assert.equal(EUR_TO_GBP_RATE, 0.85)
assert.equal(eurMinorToGbpMinor(778_200), 661_470)
assert.equal(calculateHomeTotalGbpMinor(), 304_300 + 661_470)
assert.equal(formatMajorFromMinor(calculateHomeTotalGbpMinor()), '9,657.70')

assert.equal(accountBalances.eur, '7,782.00')
assert.equal(accountBalances.gbp, '3,043.00')
assert.equal(accountBalances.homeTotalGbp, '9,657.70')

// Double-counting guard: each posted id appears once
const ids = [...EUR_CREDITS_MINOR, ...EUR_DEBITS_MINOR].map((e) => e.id)
assert.equal(new Set(ids).size, ids.length, 'No duplicate EUR ledger ids')

// Net Nov 6 EUR change vs verified opening
assert.equal(6200 - 651 - 747, 4802)
assert.equal(2980 + 4802, 7782)

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
