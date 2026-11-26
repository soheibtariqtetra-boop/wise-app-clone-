/**
 * Account balance ledger — integer minor units (cents / pence).
 *
 * Display balances follow EUR statement (5).pdf:
 *   EUR closing 1,518.43 · GBP 0.00
 *
 * Documented/sample EUR ledgers remain inspectable separately;
 * they no longer drive the on-screen EUR amount.
 */

import { getEurSampleLedgerMajors } from './eurSampleTransactions.js'
import { EUR_STATEMENT_SOURCE } from './eurStatementImport.js'

export const EUR_TO_GBP_RATE = 0.85

/** Pre-transfer EUR opening after B2B posts (minor units) — documented ledger only. */
export const EUR_OPENING_MINOR = 298_000

/** Posted EUR credits that affect the documented closing balance. */
export const EUR_CREDITS_MINOR = []

/** Posted EUR debits that affect the documented closing balance. */
export const EUR_DEBITS_MINOR = [
  { id: 'tx-transfer-jose-antonio-maldonado', amountMinor: 168_800 },
]

/** EUR fees in minor units (none posted). */
export const EUR_FEES_MINOR = 0

/** GBP zeroed — statement-era display shows EUR closing only. */
export const GBP_OPENING_MINOR = 0
export const GBP_CREDITS_MINOR = []
export const GBP_DEBITS_MINOR = []
export const GBP_FEES_MINOR = 0

/** Fictional opening for the sample-only EUR ledger. */
export const SAMPLE_EUR_OPENING_MINOR = 500_000

/** Statement PDF closing balance (EUR major → minor). */
export const STATEMENT_EUR_CLOSING_MINOR = Math.round(
  EUR_STATEMENT_SOURCE.closingBalanceMajor * 100,
)

const sampleMajors = getEurSampleLedgerMajors()

export const SAMPLE_EUR_CREDITS_MINOR = sampleMajors.credits.map((e) => ({
  id: e.id,
  amountMinor: Math.round(e.amountMajor * 100),
}))

export const SAMPLE_EUR_DEBITS_MINOR = sampleMajors.debits.map((e) => ({
  id: e.id,
  amountMinor: Math.round(e.amountMajor * 100),
}))

function sumMinor(entries) {
  return entries.reduce((sum, entry) => sum + entry.amountMinor, 0)
}

/** Documented EUR closing (no sample posts). */
export function calculateEurClosingMinor() {
  return (
    EUR_OPENING_MINOR
    + sumMinor(EUR_CREDITS_MINOR)
    - sumMinor(EUR_DEBITS_MINOR)
    - EUR_FEES_MINOR
  )
}

/** Sample-only net: credits − debits (excludes sample opening). */
export function calculateSampleEurNetMinor() {
  return sumMinor(SAMPLE_EUR_CREDITS_MINOR) - sumMinor(SAMPLE_EUR_DEBITS_MINOR)
}

/** Sample ledger closing: opening + incoming − outgoing. */
export function calculateSampleEurClosingMinor() {
  return SAMPLE_EUR_OPENING_MINOR + calculateSampleEurNetMinor()
}

/**
 * EUR amount shown in the app:
 * statement (5).pdf closing balance only.
 */
export function calculateDisplayedEurMinor() {
  return STATEMENT_EUR_CLOSING_MINOR
}

export function calculateGbpClosingMinor() {
  return (
    GBP_OPENING_MINOR
    + sumMinor(GBP_CREDITS_MINOR)
    - sumMinor(GBP_DEBITS_MINOR)
    - GBP_FEES_MINOR
  )
}

/** Convert EUR minor units to GBP minor units at the verified rate. */
export function eurMinorToGbpMinor(eurMinor) {
  return Math.round((eurMinor * 85) / 100)
}

export function calculateHomeTotalGbpMinor() {
  return calculateGbpClosingMinor() + eurMinorToGbpMinor(calculateDisplayedEurMinor())
}

export function formatMajorFromMinor(minor, { minimumFractionDigits = 2, maximumFractionDigits = 2 } = {}) {
  const major = minor / 100
  return major.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits })
}

export const accountBalances = {
  eurDocumented: formatMajorFromMinor(calculateEurClosingMinor()),
  eurSampleOpening: formatMajorFromMinor(SAMPLE_EUR_OPENING_MINOR),
  eurSample: formatMajorFromMinor(calculateSampleEurClosingMinor()),
  eurSampleNet: formatMajorFromMinor(calculateSampleEurNetMinor()),
  eur: formatMajorFromMinor(calculateDisplayedEurMinor()),
  gbp: formatMajorFromMinor(calculateGbpClosingMinor()),
  homeTotalGbp: formatMajorFromMinor(calculateHomeTotalGbpMinor()),
  eurToGbpRate: EUR_TO_GBP_RATE,
}
