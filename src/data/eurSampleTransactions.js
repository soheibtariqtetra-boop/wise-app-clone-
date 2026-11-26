/**
 * Synthetic EUR sample activity (July–November 2026).
 *
 * Separate from documented financial records / confirmation PDFs.
 * Sample ledger math lives in accountBalances.js (SAMPLE_EUR_*).
 * No banking credentials, partner references, or confirmation PDFs.
 */

import { formatTransactionDateLabel } from './transactionDates.js'

const TITLE_COLOR = '#F3F5F1'
const OUT_AMOUNT_COLOR = '#F3F5F1'
const IN_AMOUNT_COLOR = '#9FE870'

function formatEurAmount(signedMajor) {
  const abs = Math.abs(signedMajor).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return `${signedMajor < 0 ? '-' : '+'}${abs} EUR`
}

function buildSampleTx({
  id,
  name,
  signedMajor,
  dateStr,
}) {
  const incoming = signedMajor > 0
  const dateGroup = formatTransactionDateLabel(dateStr)
  return {
    id,
    type: incoming ? 'incoming' : 'outgoing',
    isSample: true,
    isDemo: true,
    isSimulated: true,
    title: name.toUpperCase(),
    displayName: name.toUpperCase(),
    titleColor: TITLE_COLOR,
    amount: formatEurAmount(signedMajor),
    amountColor: incoming ? IN_AMOUNT_COLOR : OUT_AMOUNT_COLOR,
    listIconKey: incoming ? 'down' : 'up',
    dateGroup,
    dateStr,
    currency: 'EUR',
    // Row meta uses the calendar date (weekday + month + day).
    // Sample identification stays on isSample / demoStatus — not in the date field.
    date: dateGroup,
    demoStatus: 'Sample activity',
    amountMajor: Math.abs(signedMajor),
    signedAmountMajor: signedMajor,
  }
}

/**
 * 5 sample rows per month (Jul–Nov 2026), mixed incoming/outgoing.
 * All dates are on or before 26 Nov 2026 (no future rows).
 */
const SAMPLE_SPECS = [
  // July 2026
  { id: 'tx-sample-eur-2026-07-01', name: 'Oliver Bennett', signedMajor: 1850, dateStr: '2026-07-08T10:20:00Z' },
  { id: 'tx-sample-eur-2026-07-02', name: 'Charlotte Parker', signedMajor: -1420, dateStr: '2026-07-14T14:05:00Z' },
  { id: 'tx-sample-eur-2026-07-03', name: 'Daniel Fletcher', signedMajor: 320, dateStr: '2026-07-19T09:40:00Z' },
  { id: 'tx-sample-eur-2026-07-04', name: 'Sophie Mitchell', signedMajor: -2100, dateStr: '2026-07-23T16:15:00Z' },
  { id: 'tx-sample-eur-2026-07-05', name: 'James Whitmore', signedMajor: 1675, dateStr: '2026-07-28T11:50:00Z' },

  // August 2026
  { id: 'tx-sample-eur-2026-08-01', name: 'Emily Harrington', signedMajor: -980, dateStr: '2026-08-04T13:10:00Z' },
  { id: 'tx-sample-eur-2026-08-02', name: 'William Collins', signedMajor: 2400, dateStr: '2026-08-11T08:45:00Z' },
  { id: 'tx-sample-eur-2026-08-03', name: 'Thomas Harrison', signedMajor: -1550, dateStr: '2026-08-17T15:30:00Z' },
  { id: 'tx-sample-eur-2026-08-04', name: 'Amelia Brooks', signedMajor: 275, dateStr: '2026-08-21T10:05:00Z' },
  { id: 'tx-sample-eur-2026-08-05', name: 'George Anderson', signedMajor: 1980, dateStr: '2026-08-27T12:25:00Z' },

  // September 2026
  { id: 'tx-sample-eur-2026-09-01', name: 'Henry Walker', signedMajor: -2250, dateStr: '2026-09-03T09:15:00Z' },
  { id: 'tx-sample-eur-2026-09-02', name: 'Lucy Thompson', signedMajor: 1340, dateStr: '2026-09-09T14:40:00Z' },
  { id: 'tx-sample-eur-2026-09-03', name: 'Jack Richardson', signedMajor: -410, dateStr: '2026-09-15T11:20:00Z' },
  { id: 'tx-sample-eur-2026-09-04', name: 'Alice Spencer', signedMajor: 2150, dateStr: '2026-09-22T16:55:00Z' },
  { id: 'tx-sample-eur-2026-09-05', name: 'Edward Morgan', signedMajor: -1725, dateStr: '2026-09-29T08:35:00Z' },

  // October 2026
  { id: 'tx-sample-eur-2026-10-01', name: 'Oliver Bennett', signedMajor: 1100, dateStr: '2026-10-06T10:10:00Z' },
  { id: 'tx-sample-eur-2026-10-02', name: 'Charlotte Parker', signedMajor: -1890, dateStr: '2026-10-12T13:45:00Z' },
  { id: 'tx-sample-eur-2026-10-03', name: 'Daniel Fletcher', signedMajor: 2050, dateStr: '2026-10-18T09:25:00Z' },
  { id: 'tx-sample-eur-2026-10-04', name: 'Sophie Mitchell', signedMajor: -360, dateStr: '2026-10-24T15:05:00Z' },
  { id: 'tx-sample-eur-2026-10-05', name: 'James Whitmore', signedMajor: 1490, dateStr: '2026-10-30T11:35:00Z' },

  // November 2026 (on/before 26 Nov; avoid colliding documented Nov 18–24 ids)
  { id: 'tx-sample-eur-2026-11-01', name: 'Emily Harrington', signedMajor: -1280, dateStr: '2026-11-05T10:50:00Z' },
  { id: 'tx-sample-eur-2026-11-02', name: 'William Collins', signedMajor: 1760, dateStr: '2026-11-10T14:15:00Z' },
  { id: 'tx-sample-eur-2026-11-03', name: 'Thomas Harrison', signedMajor: -245, dateStr: '2026-11-14T09:05:00Z' },
  { id: 'tx-sample-eur-2026-11-04', name: 'Amelia Brooks', signedMajor: 2225, dateStr: '2026-11-17T16:40:00Z' },
  { id: 'tx-sample-eur-2026-11-05', name: 'George Anderson', signedMajor: -1630, dateStr: '2026-11-25T12:20:00Z' },
]

export const eurSampleTransactions = SAMPLE_SPECS.map(buildSampleTx)

/** Sample credits / debits in EUR major units (for ledger wiring). */
export function getEurSampleLedgerMajors() {
  const credits = []
  const debits = []
  for (const tx of eurSampleTransactions) {
    if (tx.signedAmountMajor > 0) {
      credits.push({ id: tx.id, amountMajor: tx.amountMajor })
    } else {
      debits.push({ id: tx.id, amountMajor: tx.amountMajor })
    }
  }
  return { credits, debits }
}
