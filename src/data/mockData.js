/**
 * Mock application data for the Home screen.
 * Account balances come from accountBalances.js (ledger-verified).
 */

import { accountBalances, EUR_TO_GBP_RATE as LEDGER_EUR_TO_GBP_RATE } from './accountBalances.js'

/** Newest-first by structured dateStr (ISO). Do not sort by formatted date labels. */
export function compareTransactionsByDateDesc(a, b) {
  return Date.parse(b?.dateStr || 0) - Date.parse(a?.dateStr || 0)
}

function flattenTransactionGroups(groups) {
  return groups.flatMap((group) => group.transactions)
}

function uniqueTransactionsById(transactions) {
  const seen = new Set()
  const result = []
  for (const tx of transactions) {
    if (!tx?.id || seen.has(tx.id)) continue
    seen.add(tx.id)
    result.push(tx)
  }
  return result
}

function applyChronologicalSort(groups) {
  for (const group of groups) {
    group.transactions.sort(compareTransactionsByDateDesc)
    // Keep section headers aligned with the newest tx label in the group
    if (group.transactions[0]?.dateGroup) {
      group.dateGroup = group.transactions[0].dateGroup
    }
  }
  groups.sort((ga, gb) =>
    compareTransactionsByDateDesc(ga.transactions[0], gb.transactions[0]),
  )
  return groups
}

export const mockUser = {
  initials: 'NH',
  name: 'NAZAR\nHUSSAIN',
  handle: '@NazarHussain',
}

export const EUR_TO_GBP_RATE = LEDGER_EUR_TO_GBP_RATE;

export const mockBalance = {
  total: accountBalances.homeTotalGbp,
  currency: 'GBP',
}

export const mockCurrencyAccounts = [
  {
    id: 'gbp',
    flag: '🇬🇧',
    symbol: '£',
    amount: accountBalances.gbp,
    currency: 'GBP',
  },
  {
    id: 'eur',
    flag: '🇪🇺',
    symbol: '€',
    amount: accountBalances.eur,
    currency: 'EUR',
  },
  {
    id: 'usd',
    flag: '🇺🇸',
    symbol: '$',
    amount: '0.00',
    currency: 'USD',
  },
]

export const mockPromoSlides = [
  {
    id: 1,
    current: 1,
    total: 3,
    title: 'Get more from Wise',
    subtitle: 'Simple ways to get more from your business account.',
  },
]

// Replaces former Jose Antonio 837 EUR transfer on the same id.
// Only start (4:00 PM) and completion (4:01 PM) times were supplied — no invented funded/payout clocks.
export const lucasJoelKranjecTransfer = {
  "id": "tx-transfer-jose-antonio-maldonado",
  "type": "transfer",
  "title": "LUCAS JOEL KRANJEC",
  "displayName": "LUCAS JOEL KRANJEC",
  "fullRecipientName": "LUCAS JOEL KRANJEC",
  "compactRecipientName": "LUCAS JOEL KRANJEC",
  "titleColor": "#F3F5F1",
  "amount": "-1,688.24 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  "dateGroup": "Tuesday, November 10",
  "dateStr": "2026-11-10T16:01:00",
  "currency": "EUR",
  "date": "Tuesday, November 10",
  "recipientReceivedLabel": "LUCAS JOEL KRANJEC received",
  "senderAccountName": "Nazar Hussain's",
  "timelineTimestamp": "Tuesday, November 10 at 4:00 PM",
  "timelineSetupTimestamp": "Tuesday, November 10 at 4:00 PM",
  "timelineFundedTimestamp": "Tuesday, November 10 at 4:01 PM",
  "timelinePayoutTimestamp": "Tuesday, November 10 at 4:01 PM",
  "timelineCompletionTimestamp": "Tuesday, November 10 at 4:01 PM",
  "timelineCompletionTitle": "Your transfer's complete",
  "timelineCompletionDetail": "We sent 1,688.24 EUR to LUCAS JOEL KRANJEC .",
  "recipientBankDetails": {
    "bankDetailsHeadingName": "Lucas Joel Kranjec",
    "accountHolderName": "LUCAS JOEL KRANJEC",
    "swiftBic": null,
    "iban": "CH87 0871 0042 2771 5200 1",
    "bankNameLines": [
      "BANK CIC (SWITZERLAND) LTD.",
      "PLACE DU MARCHE 13",
      "BASEL",
      "SWITZERLAND"
    ]
  }
}

// Full transaction history grouped by date
export const mockFullTransactions = [
  {
    "dateGroup": "Tuesday, November 10",
    "transactions": [
      lucasJoelKranjecTransfer
    ]
  },
  {
    "dateGroup": "Tuesday, November 03",
    "transactions": [
      {
        "id": "tx-new-gbp-1",
        "title": "Northbridge Consulting Ltd",
        "titleColor": "#F3F5F1",
        "amount": "+1,275 GBP",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "Tuesday, November 03",
        "dateStr": "2026-11-03T15:00:00Z",
        "currency": "GBP",
        "isNew": true,
        "date": "Tuesday, November 03",
        "transactionNumber": "#2409599650"
      },
      {
        "id": "tx-new-eur-6",
        "title": "Westfield Creative",
        "displayName": "Westfield Creative",
        "titleColor": "#F3F5F1",
        "amount": "+1,480 EUR",
        "amountColor": "#9FE870",
        "listIconKey": "eur-down",
        "dateGroup": "Tuesday, November 03",
        "dateStr": "2026-11-03T14:10:00Z",
        "currency": "EUR",
        "isNew": true,
        "date": "Tuesday, November 03",
        "transactionNumber": "#2409599651"
      },
      {
        "id": "tx-new-gbp-2",
        "title": "Oakwell Trading Ltd",
        "titleColor": "#F3F5F1",
        "amount": "-420 GBP",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "Tuesday, November 03",
        "dateStr": "2026-11-03T12:30:00Z",
        "currency": "GBP",
        "isNew": true,
        "date": "Tuesday, November 03",
        "transactionNumber": "#2409599652"
      },
      {
        "id": "tx-new-eur-7",
        "title": "Horizon Business",
        "displayName": "Horizon Business",
        "titleColor": "#F3F5F1",
        "amount": "-265 EUR",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "Tuesday, November 03",
        "dateStr": "2026-11-03T11:50:00Z",
        "currency": "EUR",
        "isNew": true,
        "date": "Tuesday, November 03",
        "transactionNumber": "#2409599653"
      },
      {
        "id": "tx-new-gbp-3",
        "title": "Vertex Digital Solutions",
        "titleColor": "#F3F5F1",
        "amount": "+860 GBP",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "Tuesday, November 03",
        "dateStr": "2026-11-03T10:15:00Z",
        "currency": "GBP",
        "isNew": true,
        "date": "Tuesday, November 03",
        "transactionNumber": "#2409599654"
      }
    ]
  },
  {
    "dateGroup": "Yesterday",
    "transactions": [
      {
        "id": "tx-new-gbp-4",
        "title": "Brighton Office Supplies",
        "titleColor": "#F3F5F1",
        "amount": "-315 GBP",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "Yesterday",
        "dateStr": "2026-10-05T16:45:00Z",
        "currency": "GBP",
        "isNew": true,
        "transactionNumber": "#2409599655"
      },
      {
        "id": "tx-new-eur-8",
        "title": "Atlas Commerce Ltd",
        "titleColor": "#F3F5F1",
        "amount": "+925 EUR",
        "amountColor": "#9FE870",
        "listIconKey": "eur-down",
        "dateGroup": "October 5",
        "dateStr": "2026-10-05T15:30:00Z",
        "currency": "EUR",
        "isNew": true,
        "date": "October 5",
        "transactionNumber": "#2409599656"
      },
      {
        "id": "tx-new-eur-9",
        "title": "Sterling Media Group",
        "titleColor": "#F3F5F1",
        "amount": "-610 EUR",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "October 4",
        "dateStr": "2026-10-05T14:00:00Z",
        "currency": "EUR",
        "isNew": true,
        "date": "October 4",
        "transactionNumber": "#2409599657"
      },
      {
        "id": "full-tx-001",
        "title": "Facebook",
        "titleColor": "#F3F5F1",
        "amount": "231.42 USD",
        "amountColor": "#F3F5F1",
        "convertedAmount": "207.47 EUR",
        "listIconKey": "facebook",
        "dateGroup": "Yesterday",
        "dateStr": "2026-10-05T12:00:00Z",
        "transactionNumber": "#2409599658"
      },
      {
        "id": "full-tx-002",
        "title": "Facebook",
        "titleColor": "#F3F5F1",
        "subtitle": "Card checked",
        "amount": "0 USD",
        "amountColor": "#E8EBE6",
        "listIconKey": "facebook",
        "dateGroup": "Yesterday",
        "dateStr": "2026-10-05T11:00:00Z",
        "transactionNumber": "#2409599659"
      },
      {
        "id": "tx-new-gbp-5",
        "title": "Cedarstone Logistics",
        "titleColor": "#F3F5F1",
        "amount": "+1,640 GBP",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "Yesterday",
        "dateStr": "2026-10-05T09:20:00Z",
        "currency": "GBP",
        "isNew": true,
        "transactionNumber": "#2409599660"
      }
    ]
  },
  {
    "dateGroup": "Sunday, October 4",
    "transactions": [
      {
        "id": "tx-new-eur-10",
        "title": "Greenline Distribution",
        "titleColor": "#F3F5F1",
        "amount": "+1,350 EUR",
        "amountColor": "#9FE870",
        "listIconKey": "eur-down",
        "dateGroup": "Sunday, October 4",
        "dateStr": "2026-10-04T10:00:00Z",
        "currency": "EUR",
        "isNew": true,
        "transactionNumber": "#2409599661"
      }
    ]
  },
  {
    "dateGroup": "Saturday, October 3",
    "transactions": [
      {
        "id": "full-tx-003",
        "title": "SERGEI NOVIKOV",
        "titleColor": "#F3F5F1",
        "amount": "+425 EUR",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "Saturday, October 3",
        "dateStr": "2026-10-03T15:00:00Z",
        "currency": "EUR",
        "transactionNumber": "#2409599662"
      },
      {
        "id": "full-tx-004",
        "title": "Hostinger",
        "titleColor": "#F3F5F1",
        "amount": "14.85 GBP",
        "amountColor": "#F3F5F1",
        "convertedAmount": "17.55 EUR",
        "listIconKey": "hostinger",
        "dateGroup": "Saturday, October 3",
        "dateStr": "2026-10-03T14:00:00Z",
        "currency": "GBP",
        "transactionNumber": "#2409599663"
      },
      {
        "id": "full-tx-005",
        "title": "Shopify",
        "titleColor": "#F3F5F1",
        "amount": "-1 USD",
        "amountColor": "#F3F5F1",
        "convertedAmount": "0.90 EUR",
        "listIconKey": "shopify",
        "dateGroup": "Saturday, October 3",
        "dateStr": "2026-10-03T12:00:00Z",
        "transactionNumber": "#2409599664"
      },
      {
        "id": "full-tx-006",
        "title": "Shopify",
        "titleColor": "#F3F5F1",
        "subtitle": "Card checked",
        "amount": "0 SGD",
        "amountColor": "#E8EBE6",
        "listIconKey": "shopify",
        "dateGroup": "Saturday, October 3",
        "dateStr": "2026-10-03T11:00:00Z",
        "transactionNumber": "#2409599665"
      }
    ]
  },
  {
    "dateGroup": "Wednesday, September 30",
    "transactions": [
      {
        "id": "full-tx-007",
        "title": "Davy Lim",
        "titleColor": "#F3F5F1",
        "amount": "+100 EUR",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "Wednesday, September 30",
        "dateStr": "2026-09-30T10:00:00Z",
        "currency": "EUR",
        "transactionNumber": "#2409599666"
      }
    ]
  },
  {
    "dateGroup": "May 21",
    "transactions": [
      {
        "id": "full-tx-008",
        "title": "FALCON SHOP LTD",
        "titleColor": "#F3F5F1",
        "amount": "+3 GBP",
        "amountColor": "#9FE870",
        "listIconKey": "down",
        "dateGroup": "May 21",
        "dateStr": "2026-05-21T09:00:00Z",
        "currency": "GBP",
        "transactionNumber": "#2409599667"
      }
    ]
  },
  {
    "dateGroup": "February 19",
    "transactions": [
      {
        "id": "full-tx-009",
        "title": "For your account plan",
        "titleColor": "#F3F5F1",
        "amount": "-50 GBP",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "February 19",
        "dateStr": "2026-02-19T10:00:00Z",
        "currency": "GBP",
        "transactionNumber": "#2409599668"
      },
      {
        "id": "full-tx-010",
        "title": "To GBP",
        "titleColor": "#F3F5F1",
        "subtitle": "Added",
        "amount": "+50 GBP",
        "amountColor": "#9FE870",
        "listIconKey": "plus",
        "dateGroup": "February 19",
        "dateStr": "2026-02-19T09:00:00Z",
        "currency": "GBP",
        "transactionNumber": "#2409599669"
      }
    ]
  }
];

applyChronologicalSort(mockFullTransactions)

const allTransactionsChronological = uniqueTransactionsById(
  flattenTransactionGroups(mockFullTransactions),
).sort(compareTransactionsByDateDesc)

/** Home preview — max 3 newest by dateStr (shared records, no stubs). */
export const mockTransactions = allTransactionsChronological.slice(0, 3)

/** EUR account list — same chronological order as full history. */
export const mockEurTransactions = allTransactionsChronological.filter(
  (tx) => tx.currency === 'EUR',
)

/** GBP account list — same chronological order as full history. */
export const mockGbpTransactions = allTransactionsChronological.filter(
  (tx) => tx.currency === 'GBP',
)

// GBP account details
export const mockGbpAccount = {
  currency: 'GBP',
  symbol: '£',
  balance: accountBalances.gbp,
  accountLabel: 'Current account / GBP',
  accountName: 'Muhammad Rana hussnain',
  accountNumber: '54158151',
  sortCode: '60-84-64',
  pillLabel: '60-84-64 · 54158151',
  interestRate: '3.29%',
  iban: 'GB28 TRWI 6084 6454 1581 51',
  swiftBic: 'TRWIGB2LXXX',
}
// EUR account details
export const mockEurAccount = {
  currency: 'EUR',
  symbol: '€',
  balance: accountBalances.eur,
  iban: 'BE58903014911979',
  accountLabel: 'Current account / EUR',
  accountName: 'Nazar Hussain',
  swiftBic: 'TRWIBEB1XXX',
  bankAddressLines: [
    'Wise Europe SA',
    'RUE DU TRONE 100',
    'BRUSSELS',
  ],
}
