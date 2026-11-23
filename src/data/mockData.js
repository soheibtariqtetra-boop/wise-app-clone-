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
  // LoginScreen01 masked email source. Not used for Wise auth.
  email: 'nazarhussain17D@gmail.com',
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

// Synced to public/confirmations/lucas-confirmation.pdf (unverified/inconsistent doc).
// Page 1 "Total to" names Jose Antonio; page 2 "Sent to" is LUCAS — recipient UI follows page 2.
// Same printed transfer #2418268688 as Gasper PDF — not treated as a verified unique reference.
// Source times kept as BST with seconds; timeline display uses minute-level AM/PM. Payout/completion: date only.
export const lucasJoelKranjecTransfer = {
  "id": "tx-transfer-jose-antonio-maldonado",
  "type": "transfer",
  "title": "LUCAS JOEL KRANJEC",
  "displayName": "LUCAS JOEL KRANJEC",
  "fullRecipientName": "LUCAS JOEL KRANJEC",
  "compactRecipientName": "LUCAS JOEL KRANJEC",
  "titleColor": "#F3F5F1",
  "amount": "-1,688 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  // Demo list display date only — PDF source times stay in *AtSource / timeline*.
  "dateGroup": "Friday, November 20",
  "dateStr": "2026-11-20T01:27:58+01:00",
  "currency": "EUR",
  "date": "Friday, November 20",
  "createdAtSource": "November 10, 2026 01:27:58 BST",
  "fundedAtSource": "November 10, 2026 01:33:25 BST",
  "paidOutAtSource": "November 10, 2026",
  "pdfTransferReferencePrinted": "#2418268688",
  "transactionNumber": "#2418268688",
  "recipientReceivedLabel": "LUCAS JOEL KRANJEC received",
  "senderAccountName": "Nazar Hussain's",
  "timelineTimestamp": "Tuesday, November 10 at 1:27 AM",
  "timelineSetupTimestamp": "Tuesday, November 10 at 1:27 AM",
  "timelineFundedTimestamp": "Tuesday, November 10 at 1:33 AM",
  "timelinePayoutTimestamp": "Tuesday, November 10",
  "timelineCompletionTimestamp": "Tuesday, November 10",
  "timelineCompletionTitle": "Your transfer's complete",
  "timelineCompletionDetail": "We sent 1,688 EUR to LUCAS JOEL KRANJEC .",
  "recipientBankDetails": {
    "bankDetailsHeadingName": "Lucas Joel Kranjec",
    "accountHolderName": "LUCAS JOEL KRANJEC",
    "swiftBic": "CIALCHBBXXX",
    "iban": "CH87 0871 0042 2771 5200 1",
    "bankNameLines": [
      "Bank CIC (SCHWEIZ) AG"
    ]
  }
}

// DEMO pair replacing former Gasper / GIROmobil / Johannes-incoming demo records.
// Outgoing source: public/confirmations/brigitte-schmidt-source.pdf
// PDF discrepancy: page 1 "Total to GIROmobil"; page 2 "Sent to Brigitte Schmidt" — UI uses page 2.
// Incoming +1,000 EUR is simulated and NOT verified by that PDF.
export const brigitteSchmidtIncomingDemo = {
  "id": "tx-demo-brigitte-schmidt-in",
  "type": "incoming",
  "isDemo": true,
  "isSimulated": true,
  "demoStatus": "Completed (demo)",
  "title": "BRIGITTE SCHMIDT",
  "displayName": "BRIGITTE SCHMIDT",
  "titleColor": "#F3F5F1",
  "amount": "+1,000 EUR",
  "amountColor": "#9FE870",
  "listIconKey": "down",
  // Demo list display date (simulated incoming — no PDF confirmation).
  "dateGroup": "Saturday, November 21",
  "dateStr": "2026-11-21T15:49:00Z",
  "currency": "EUR",
  "date": "Saturday, November 21",
  "subtitle": "Completed (demo)",
  "reference": "DEMO",
  "transactionNumber": "#2418161688",
}

// Outgoing EUR transfer — source: public/confirmations/zhichao-wang-source.pdf (672 (1).pdf).
// Supersedes any incorrect Sergej Busch / 672.pdf mapping (never landed in this repo).
// PDF prints BST in November (UK winter is GMT) — literal BST preserved in source fields.
// PDF sender name is Nazar Hussain — synced to demo EUR/profile identity.
// PDF source times stay in *AtSource; timeline* fields are display overrides.
export const zhichaoWangOutgoingTransfer = {
  "id": "tx-transfer-zhichao-wang",
  "type": "transfer",
  "isDemo": false,
  "isSimulated": false,
  "title": "ZHICHAO WANG",
  "displayName": "ZHICHAO WANG",
  "fullRecipientName": "ZHICHAO WANG",
  "compactRecipientName": "ZHICHAO WANG",
  "titleColor": "#F3F5F1",
  "amount": "-672 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  "dateGroup": "Monday, November 23",
  "dateStr": "2026-11-23T11:36:58+01:00",
  "currency": "EUR",
  "date": "Monday, November 23",
  "createdAtSource": "November 23, 2026 11:36:58 BST",
  "fundedAtSource": "November 23, 2026 11:43:25 BST",
  "paidOutAtSource": "November 23, 2026",
  "transactionNumber": "#2858268525",
  "pdfTransferReferencePrinted": "#2858268525",
  "bankingPartnerReference": "GW26100723803737",
  "recipientReceivedLabel": "ZHICHAO WANG received",
  "senderAccountName": "Nazar Hussain's",
  // Timeline display overrides only — not PDF-verified (*AtSource unchanged).
  "timelineTimestamp": "Monday, November 23 at 11:36 AM",
  "timelineSetupTimestamp": "Monday, November 23 at 11:36 AM",
  "timelineFundedTimestamp": "Monday, November 23 at 11:38 AM",
  "timelinePayoutTimestamp": "Monday, November 23 at 11:42 AM",
  "timelineCompletionTimestamp": "Monday, November 23 at 11:43 AM",
  "timelineCompletionTitle": "Your transfer's complete",
  "timelineCompletionDetail": "We sent 672 EUR to ZHICHAO WANG.",
  "recipientBankDetails": {
    "bankDetailsHeadingName": "Zhichao Wang",
    "accountHolderName": "Zhichao Wang",
    "swiftBic": "BUNQDE82XXX",
    "iban": "DE33370190001011651021",
    "bankNameLines": [
      "BUNQ NIEDERLASSUNG DEUTSCHLAND"
    ]
  },
  "senderSideBankDetails": {
    "iban": "BE58903014911979",
    "swiftBic": "TRWIBEB1XXX",
    "note": "PDF paid-out-from details — not recipient credentials"
  }
}

// Outgoing timestamps are independent of brigitteSchmidtIncomingDemo (tx-demo-brigitte-schmidt-in).
// Source PDF: November 11, 2026 17:25:50 / 17:27:58 GMT; payout/completion date-only.
export const brigitteSchmidtOutgoingTransfer = {
  "id": "tx-transfer-brigitte-schmidt",
  "type": "transfer",
  "isDemo": true,
  "isSimulated": false,
  "title": "BRIGITTE SCHMIDT",
  "displayName": "BRIGITTE SCHMIDT",
  "fullRecipientName": "BRIGITTE SCHMIDT",
  "compactRecipientName": "BRIGITTE SCHMIDT",
  "titleColor": "#F3F5F1",
  "amount": "-1,000 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  // Demo list display date only — PDF source times stay in *AtSource / timeline*.
  "dateGroup": "Sunday, November 22",
  "dateStr": "2026-11-22T17:25:50Z",
  "currency": "EUR",
  "date": "Sunday, November 22",
  "createdAtSource": "November 11, 2026 17:25:50 GMT",
  "fundedAtSource": "November 11, 2026 17:27:58 GMT",
  "paidOutAtSource": "November 11, 2026",
  "transactionNumber": "#2418168688",
  "recipientReceivedLabel": "BRIGITTE SCHMIDT received",
  "senderAccountName": "Johannes Kress's",
  "timelineTimestamp": "Wednesday, November 11 at 17:25",
  "timelineSetupTimestamp": "Wednesday, November 11 at 17:25",
  "timelineFundedTimestamp": "Wednesday, November 11 at 17:27",
  "timelinePayoutTimestamp": "Wednesday, November 11",
  "timelineCompletionTimestamp": "Wednesday, November 11",
  "timelineCompletionTitle": "Your transfer's complete",
  "timelineCompletionDetail": "We sent 1,000 EUR to BRIGITTE SCHMIDT.",
  "recipientBankDetails": {
    "bankDetailsHeadingName": "Brigitte Schmidt",
    "accountHolderName": "Brigitte Schmidt",
    "swiftBic": "NOLADE21UEL",
    "iban": "DE21 2585 0110 0042 1344 52",
    "bankNameLines": [
      "Sparkasse Uelzen Lüchow-Dannenberg"
    ]
  }
}

// Demo list-only display records (no PDF confirmation).
export const westfieldCreativeIncoming = {
  "id": "tx-new-eur-6",
  "title": "Westfield Creative",
  "displayName": "Westfield Creative",
  "titleColor": "#F3F5F1",
  "amount": "+1,480 EUR",
  "amountColor": "#9FE870",
  "listIconKey": "eur-down",
  "dateGroup": "Thursday, November 19",
  "dateStr": "2026-11-19T14:10:00Z",
  "currency": "EUR",
  "isNew": true,
  "date": "Thursday, November 19",
  "transactionNumber": "#2409599651"
}

export const horizonBusinessOutgoing = {
  "id": "tx-new-eur-7",
  "title": "Horizon Business",
  "displayName": "Horizon Business",
  "titleColor": "#F3F5F1",
  "amount": "-265 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  "dateGroup": "Wednesday, November 18",
  "dateStr": "2026-11-18T11:50:00Z",
  "currency": "EUR",
  "isNew": true,
  "date": "Wednesday, November 18",
  "transactionNumber": "#2409599653"
}

// Full transaction history grouped by date
export const mockFullTransactions = [
  {
    "dateGroup": "Monday, November 23",
    "transactions": [
      zhichaoWangOutgoingTransfer
    ]
  },
  {
    "dateGroup": "Sunday, November 22",
    "transactions": [
      brigitteSchmidtOutgoingTransfer
    ]
  },
  {
    "dateGroup": "Saturday, November 21",
    "transactions": [
      brigitteSchmidtIncomingDemo
    ]
  },
  {
    "dateGroup": "Friday, November 20",
    "transactions": [
      lucasJoelKranjecTransfer
    ]
  },
  {
    "dateGroup": "Thursday, November 19",
    "transactions": [
      westfieldCreativeIncoming
    ]
  },
  {
    "dateGroup": "Wednesday, November 18",
    "transactions": [
      horizonBusinessOutgoing
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
// Receiving IBAN/BIC/address preserved (not replaced by PDF sender-side credentials).
// PDF paid-out-from sender details stored separately for reference only.
export const mockEurAccount = {
  currency: 'EUR',
  symbol: '€',
  balance: accountBalances.eur,
  // AccountDetailsEURScreen03 — holder name synced to PDF sender (672 (1).pdf).
  // IBAN/BIC kept as existing receiving-card values (also match PDF paid-out-from).
  // Bank street address not established by that PDF — leave existing card address unchanged.
  iban: 'BE58903014911979',
  ibanDisplay: 'BE58903014911979',
  ibanDisplayIsPlaceholder: false,
  accountLabel: 'Current account / EUR',
  accountName: 'Nazar Hussain',
  swiftBic: 'TRWIBEB1XXX',
  bankAddressLines: [
    'Post Office Chak No. 156-P, Goth Jangu, Tehsil Sadiqabad, District Rahim Yar Khan.',
  ],
  senderDocumentedDetails: {
    source: 'zhichao-wang-source.pdf',
    note: 'PDF paid-out-from sender details — not verified as Wise EUR receiving credentials',
    name: 'Nazar Hussain',
    iban: 'BE58903014911979',
    swiftBic: 'TRWIBEB1XXX',
    addressLines: [
      'Office 2587 321-323 High Road, Chadwell Health',
      'Essex, RM6 6AX',
      'United Kingdom',
    ],
  },
}
