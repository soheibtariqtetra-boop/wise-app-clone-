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
  STATEMENT_EUR_CLOSING_MINOR,
  calculateEurClosingMinor,
  calculateGbpClosingMinor,
  calculateDisplayedEurMinor,
  calculateHomeTotalGbpMinor,
  eurMinorToGbpMinor,
  formatMajorFromMinor,
  accountBalances,
  EUR_TO_GBP_RATE,
} from '../src/data/accountBalances.js'
import { EUR_STATEMENT_SOURCE } from '../src/data/eurStatementImport.js'

const eurCredits = EUR_CREDITS_MINOR.reduce((s, e) => s + e.amountMinor, 0)
const eurDebits = EUR_DEBITS_MINOR.reduce((s, e) => s + e.amountMinor, 0)

assert.equal(EUR_FEES_MINOR, 0, 'No EUR fees posted')
assert.equal(
  calculateEurClosingMinor(),
  EUR_OPENING_MINOR + eurCredits - eurDebits - EUR_FEES_MINOR,
  'EUR documented closing formula',
)

assert.equal(EUR_STATEMENT_SOURCE.closingBalanceMajor, 1518.43)
assert.equal(STATEMENT_EUR_CLOSING_MINOR, 151_843)
assert.equal(calculateDisplayedEurMinor(), 151_843, 'Displayed EUR = statement closing')
assert.equal(formatMajorFromMinor(calculateDisplayedEurMinor()), '1,518.43')

assert.equal(GBP_OPENING_MINOR, 0, 'GBP zeroed')
assert.equal(calculateGbpClosingMinor(), 0, 'GBP closing = 0.00')
assert.equal(formatMajorFromMinor(calculateGbpClosingMinor()), '0.00')

assert.equal(EUR_TO_GBP_RATE, 0.85)
assert.equal(eurMinorToGbpMinor(151_843), 129_067)
assert.equal(calculateHomeTotalGbpMinor(), 0 + 129_067)
assert.equal(formatMajorFromMinor(calculateHomeTotalGbpMinor()), '1,290.67')

assert.equal(accountBalances.eur, '1,518.43')
assert.equal(accountBalances.gbp, '0.00')
assert.equal(accountBalances.homeTotalGbp, '1,290.67')

console.log('verify-balances: PASS')
console.log(JSON.stringify({
  eurDocumented: formatMajorFromMinor(calculateEurClosingMinor()),
  eurDisplayed: accountBalances.eur,
  gbpClosing: accountBalances.gbp,
  homeTotalGbp: accountBalances.homeTotalGbp,
  rate: EUR_TO_GBP_RATE,
  statementClosing: EUR_STATEMENT_SOURCE.closingBalanceMajor,
}, null, 2))
