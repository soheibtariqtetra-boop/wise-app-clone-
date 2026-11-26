/**
 * Single interactive UI-test transfer for AccountBalanceEURScreen.
 *
 * Separate from statement_174986227 import and from balance ledgers.
 * No confirmation PDF. Display transaction number / bank details only.
 */

const DATE_STR = '2026-11-23T15:11:00Z' // Monday, November 23, 2026
// UI-test timeline clocks — exact display labels from user reference (15:08 → 15:09 → 15:11 → 15:11 PM).
const TIMELINE_SETUP = 'Monday, November 23 at 15:08 PM'
const TIMELINE_FUNDED = 'Monday, November 23 at 15:09 PM'
const TIMELINE_PAYOUT = 'Monday, November 23 at 15:11 PM'
const TIMELINE_COMPLETION = 'Monday, November 23 at 15:11 PM'

/** Fictional recipient — UI test only. */
const RECIPIENT_FULL = 'QUOC LONG HUYNH'
const RECIPIENT_COMPACT = 'QUOC LONG HUYNH'
const RECIPIENT_TITLE = 'Quoc Long Huynh'
/** Matches sampleAccountIdentity.fullName — display sender only, not a ledger post. */
const SENDER_ACCOUNT_NAME = "Muhammad Akbar's"

/**
 * Outgoing −756 EUR interactive test row.
 * Clickable → TransferDetailsScreen01/02/03.
 */
export const eurInteractiveTestTransaction = {
  id: 'tx-ui-test-eur-756-quoc-long-huynh',
  type: 'transfer',
  isInteractiveTest: true,
  isDemo: true,
  isSimulated: true,
  // Not part of statement import or posted ledger.
  isStatementImport: false,
  title: RECIPIENT_FULL,
  displayName: RECIPIENT_FULL,
  fullRecipientName: RECIPIENT_FULL,
  compactRecipientName: RECIPIENT_COMPACT,
  listDisplayName: RECIPIENT_FULL,
  titleColor: '#F3F5F1',
  amount: '-756 EUR',
  amountColor: '#F3F5F1',
  listIconKey: 'up',
  dateGroup: 'Monday, November 23',
  date: 'Monday, November 23',
  dateStr: DATE_STR,
  currency: 'EUR',
  // Chronological placement among Nov 23 rows (afternoon after noon statement stubs).
  sourceOrder: 5.5,
  signedAmountMajor: -756,
  transactionNumber: '#2418298788',
  pdfTransferReferencePrinted: '#2418298788',
  bankingPartnerReference: undefined,
  recipientReceivedLabel: `${RECIPIENT_FULL} received`,
  senderAccountName: SENDER_ACCOUNT_NAME,
  timelineTimestamp: TIMELINE_SETUP,
  timelineSetupTimestamp: TIMELINE_SETUP,
  timelineFundedTimestamp: TIMELINE_FUNDED,
  timelinePayoutTimestamp: TIMELINE_PAYOUT,
  timelineCompletionTimestamp: TIMELINE_COMPLETION,
  timelineCompletionTitle: "Your transfer's complete",
  timelineCompletionDetail: `We sent 756 EUR to ${RECIPIENT_FULL}.`,
  recipientBankDetails: {
    bankDetailsHeadingName: RECIPIENT_TITLE,
    accountHolderName: RECIPIENT_TITLE,
    swiftBic: 'GENODES1VBB',
    iban: 'DE76 6049 1430 0605 4320 07',
    bankNameLines: ['VR-Bank Ludwigsburg'],
  },
}

/** Lookup helper for deep-link / history restore (not a ledger post). */
export function findEurInteractiveTestTransaction(txId) {
  if (txId === eurInteractiveTestTransaction.id) {
    return eurInteractiveTestTransaction
  }
  return null
}
