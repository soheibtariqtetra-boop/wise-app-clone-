/**
 * Account balance ledger — integer minor units (cents / pence).
 *
 * Verified opening balances (commit a8f940d / scratch/generate_data.cjs):
 *   GBP base 3.00 + B2B net +3,040.00 = 3,043.00
 *   EUR base 100.00 + B2B net +2,880.00 = 2,980.00
 *
 * Active EUR posts:
 *   debit tx-transfer-jose-antonio-maldonado (Lucas): −1,688.00
 *
 * Former Gasper −1,766 debit removed with tx-transfer-gasper-marence.
 * Demo Gasper ±1,000 EUR pair is simulated only (net 0) and is not posted.
 *
 * Closing EUR from the verified opening + remaining active posts:
 *   2,980.00 − 1,688.00 = 1,292.00
 *
 * GBP has no new posted ledger changes since 3,043.00.
 * Combined total uses existing EUR_TO_GBP_RATE only.
 */

export const EUR_TO_GBP_RATE = 0.85

/** Pre-transfer EUR opening after B2B posts (minor units). */
export const EUR_OPENING_MINOR = 298_000

/** Posted EUR credits that affect the closing balance. */
export const EUR_CREDITS_MINOR = []

/** Posted EUR debits that affect the closing balance. */
export const EUR_DEBITS_MINOR = [
  { id: 'tx-transfer-jose-antonio-maldonado', amountMinor: 168_800 },
]

/** EUR fees in minor units (none posted). */
export const EUR_FEES_MINOR = 0

/** Verified GBP closing balance in minor units (no new GBP posts). */
export const GBP_OPENING_MINOR = 304_300
export const GBP_CREDITS_MINOR = []
export const GBP_DEBITS_MINOR = []
export const GBP_FEES_MINOR = 0

function sumMinor(entries) {
  return entries.reduce((sum, entry) => sum + entry.amountMinor, 0)
}

export function calculateEurClosingMinor() {
  return (
    EUR_OPENING_MINOR
    + sumMinor(EUR_CREDITS_MINOR)
    - sumMinor(EUR_DEBITS_MINOR)
    - EUR_FEES_MINOR
  )
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
  // 0.85 = 85/100 — exact for integer cents when rate is 0.85
  return Math.round((eurMinor * 85) / 100)
}

export function calculateHomeTotalGbpMinor() {
  return calculateGbpClosingMinor() + eurMinorToGbpMinor(calculateEurClosingMinor())
}

export function formatMajorFromMinor(minor, { minimumFractionDigits = 2, maximumFractionDigits = 2 } = {}) {
  const major = minor / 100
  return major.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits })
}

export const accountBalances = {
  eur: formatMajorFromMinor(calculateEurClosingMinor()),
  gbp: formatMajorFromMinor(calculateGbpClosingMinor()),
  homeTotalGbp: formatMajorFromMinor(calculateHomeTotalGbpMinor()),
  eurToGbpRate: EUR_TO_GBP_RATE,
}
