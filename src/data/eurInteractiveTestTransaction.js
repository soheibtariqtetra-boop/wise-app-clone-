/**
 * Single interactive UI-test transfer for AccountBalanceEURScreen.
 *
 * Separate from statement_174986227 import and from balance ledgers.
 * No confirmation PDF attached.
 *
 * Timeline clocks are UI-test events only (24-hour, no AM/PM):
 *   15:08 → 15:09 → 15:11 → 15:11
 */

const DATE_STR = '2026-11-27T15:11:00Z' // Friday, November 27, 2026
const DATE_LABEL = 'Friday, November 27'

// UI-test timeline clocks — 24-hour display, no AM/PM suffix.
const TIMELINE_SETUP = `${DATE_LABEL} at 15:08`
const TIMELINE_FUNDED = `${DATE_LABEL} at 15:09`
const TIMELINE_PAYOUT = `${DATE_LABEL} at 15:11`
const TIMELINE_COMPLETION = `${DATE_LABEL} at 15:11`

/** Recipient — UI test transfer. */
const RECIPIENT_FULL = 'ALEKSI OSKARI RUOKONEN'
const RECIPIENT_COMPACT = 'ALEKSI OSKARI RUOKONEN'
const RECIPIENT_TITLE = 'Aleksi Oskari Ruokonen'
/** Matches sampleAccountIdentity.fullName — display sender only, not a ledger post. */
const SENDER_ACCOUNT_NAME = "Zain UL Abideen's"

/**
 * Outgoing −7,355 EUR interactive test row.
 * Clickable → TransferDetailsScreen01/02/03.
 */
export const eurInteractiveTestTransaction = {
  id: 'tx-ui-test-eur-7355-aleksi-oskari-ruokonen',
  type: 'transfer',
  isInteractiveTest: true,
  isDemo: true,
  isSimulated: true,
  isTimelineUiTest: true,
  // Not part of statement import or posted ledger.
  isStatementImport: false,
  title: RECIPIENT_FULL,
  displayName: RECIPIENT_FULL,
  fullRecipientName: RECIPIENT_FULL,
  compactRecipientName: RECIPIENT_COMPACT,
  listDisplayName: RECIPIENT_FULL,
  titleColor: '#F3F5F1',
  amount: '-7,355 EUR',
  amountColor: '#F3F5F1',
  listIconKey: 'up',
  dateGroup: DATE_LABEL,
  date: DATE_LABEL,
  dateStr: DATE_STR,
  currency: 'EUR',
  // Newest among EUR list rows (after statement Nov 26).
  sourceOrder: 0,
  signedAmountMajor: -7355,
  transactionNumber: '#2418298788',
  pdfTransferReferencePrinted: undefined,
  bankingPartnerReference: undefined,
  recipientReceivedLabel: `${RECIPIENT_FULL} received`,
  senderAccountName: SENDER_ACCOUNT_NAME,
  // Test event clocks (UI only — not verified payment events).
  timelineTimestamp: TIMELINE_SETUP,
  timelineSetupTimestamp: TIMELINE_SETUP,
  timelineFundedTimestamp: TIMELINE_FUNDED,
  timelinePayoutTimestamp: TIMELINE_PAYOUT,
  timelineCompletionTimestamp: TIMELINE_COMPLETION,
  timelineCompletionTitle: "Your transfer's complete",
  timelineCompletionDetail: `We sent 7,355 EUR to ${RECIPIENT_FULL}.`,
  recipientBankDetails: {
    bankDetailsHeadingName: RECIPIENT_TITLE,
    accountHolderName: RECIPIENT_TITLE,
    swiftBic: 'OKOYFIHH',
    iban: 'FI35 5410 0220 4744 75',
    bankNameLines: ['OP CORPORATE BANK PLC'],
  },
}

/** Lookup helper for deep-link / history restore (not a ledger post). */
export function findEurInteractiveTestTransaction(txId) {
  if (txId === eurInteractiveTestTransaction.id) {
    return eurInteractiveTestTransaction
  }
  return null
}
