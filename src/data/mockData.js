/**
 * Mock application data for the Home screen.
 * Account balances come from accountBalances.js (ledger-verified).
 */

import { accountBalances, EUR_TO_GBP_RATE as LEDGER_EUR_TO_GBP_RATE } from './accountBalances.js'

export const mockUser = {
  initials: 'MB',
  name: 'MANZOORAN\nBIBI',
  handle: '@ManzooranBibi',
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

// Newest transactions for the Home screen (display stubs; full records live in mockFullTransactions)
export const mockTransactions = [
  {
    "id": "tx-transfer-erkan",
    "type": "transfer",
    "title": "VICENTA JOAQUINA",
    "titleColor": "#F3F5F1",
    "amount": "-651 EUR",
    "amountColor": "#F3F5F1",
    "listIconKey": "up",
    "dateGroup": "Today",
    "dateStr": "2026-11-06T11:11:00Z",
    "currency": "EUR",
    "date": "Today",
    "transactionNumber": "#2418268688"
  },
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
  }
];

// Shared Nov 6 records — referenced by EUR account list + history
export const thomasAndreTransfer = {
  "id": "tx-transfer-thomas-andre",
  "type": "transfer",
  "title": "THOMAS ANDRE",
  "titleColor": "#F3F5F1",
  "amount": "-747 EUR",
  "amountColor": "#F3F5F1",
  "listIconKey": "up",
  "dateGroup": "Friday, November 06",
  "dateStr": "2026-11-06T12:11:00Z",
  "currency": "EUR",
  "date": "Friday, November 06",
  "transactionNumber": "#2418268788",
  "recipientReceivedLabel": "THOMAS ANDRE received",
  "senderAccountName": "Manzooran Bibi's",
  "timelineTimestamp": "Friday, November 06 at 12:10 PM",
  "timelineSetupTimestamp": "Friday, November 06 at 12:10 PM",
  "timelinePaidTimestamp": "Friday, November 06 at 12:11 PM",
  "timelineCompletionTitle": "Your transfer is complete.",
  "recipientBankDetails": {
    "bankDetailsHeadingName": "Manzooran Bibi",
    "accountHolderName": "Manzooran Bibi",
    "swiftBic": "TRWIBEB1XXX",
    "iban": "BE58903014911979",
    "bankNameLines": [
      "Wise Europe SA",
      "RUE DU TRONE 100",
      "BRUSSELS"
    ]
  }
}

export const incomingEur6200 = {
  "id": "tx-incoming-eur-6200",
  "title": "maxwilliams",
  "titleColor": "#F3F5F1",
  "amount": "+6,200 EUR",
  "amountColor": "#9FE870",
  "listIconKey": "eur-down",
  "dateGroup": "Friday, November 06",
  "dateStr": "2026-11-06T10:00:00Z",
  "currency": "EUR",
  "date": "Friday, November 06",
  "isNew": true
}

// Full transaction history grouped by date
export const mockFullTransactions = [
  {
    "dateGroup": "Friday, November 06",
    "transactions": [
      thomasAndreTransfer,
      {
        "id": "tx-transfer-erkan",
        "type": "transfer",
        "title": "VICENTA JOAQUINA",
        "titleColor": "#F3F5F1",
        "amount": "-651 EUR",
        "amountColor": "#F3F5F1",
        "listIconKey": "up",
        "dateGroup": "Friday, November 06",
        "dateStr": "2026-11-06T11:11:00Z",
        "currency": "EUR",
        "date": "Friday, November 06",
        "transactionNumber": "#2418268688",
        "recipientReceivedLabel": "VICENTA JOAQUINA received",
        "senderAccountName": "Manzooran Bibi's",
        "timelineTimestamp": "Friday, November 06 at 11:10 AM",
        "timelineSetupTimestamp": "Friday, November 06 at 11:10 AM",
        "timelinePaidTimestamp": "Friday, November 06 at 11:11 AM",
        "timelineCompletionTitle": "Your transfer's complete",
        "timelineCompletionDetail": "We sent 651 EUR to VICENTA JOAQUINA BOSCA LOPEZ .",
        "recipientBankDetails": {
          "bankDetailsHeadingName": "Manzooran Bibi",
          "accountHolderName": "Manzooran Bibi",
          "swiftBic": "TRWIBEB1XXX",
          "iban": "BE58903014911979",
          "bankNameLines": [
            "Wise Europe SA",
            "RUE DU TRONE 100",
            "BRUSSELS"
          ]
        }
      },
      incomingEur6200
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
export const mockGbpTransactions = [
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
  },
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
    "date": "Yesterday",
    "transactionNumber": "#2409599655"
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
    "date": "Yesterday",
    "transactionNumber": "#2409599660"
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
    "date": "Saturday, October 3",
    "transactionNumber": "#2409599663"
  },
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
    "date": "May 21",
    "transactionNumber": "#2409599667"
  },
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
    "date": "February 19",
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
    "date": "February 19",
    "transactionNumber": "#2409599669"
  }
];

// EUR account details
export const mockEurAccount = {
  currency: 'EUR',
  symbol: '€',
  balance: accountBalances.eur,
  iban: 'BE58903014911979',
  accountLabel: 'Current account / EUR',
  accountName: 'Mamzooran Bibi',
  swiftBic: 'TRWIBEB1XXX',
  bankAddressLines: [
    'Wise Europe SA',
    'RUE DU TRONE 100',
    'BRUSSELS',
  ],
}
export const mockEurTransactions = [
  thomasAndreTransfer,
  {
    "id": "tx-transfer-erkan",
    "type": "transfer",
    "title": "VICENTA JOAQUINA",
    "titleColor": "#F3F5F1",
    "amount": "-651 EUR",
    "amountColor": "#F3F5F1",
    "listIconKey": "up",
    "dateGroup": "Friday, November 06",
    "dateStr": "2026-11-06T11:11:00Z",
    "currency": "EUR",
    "date": "Friday, November 06",
    "transactionNumber": "#2418268688",
    "recipientReceivedLabel": "VICENTA JOAQUINA received",
    "senderAccountName": "Manzooran Bibi's",
    "timelineTimestamp": "Friday, November 06 at 11:10 AM",
    "timelineSetupTimestamp": "Friday, November 06 at 11:10 AM",
    "timelinePaidTimestamp": "Friday, November 06 at 11:11 AM",
    "timelineCompletionTitle": "Your transfer's complete",
    "timelineCompletionDetail": "We sent 651 EUR to VICENTA JOAQUINA BOSCA LOPEZ .",
    "recipientBankDetails": {
      "bankDetailsHeadingName": "Manzooran Bibi",
      "accountHolderName": "Manzooran Bibi",
      "swiftBic": "TRWIBEB1XXX",
      "iban": "BE58903014911979",
      "bankNameLines": [
        "Wise Europe SA",
        "RUE DU TRONE 100",
        "BRUSSELS"
      ]
    }
  },
  incomingEur6200,
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
    "date": "Sunday, October 4",
    "transactionNumber": "#2409599661"
  },
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
    "date": "Saturday, October 3",
    "transactionNumber": "#2409599662"
  },
  {
    "id": "full-tx-007",
    "title": "Davy Lim",
    "titleColor": "#F3F5F1",
    "amount": "+ 100 EUR",
    "amountColor": "#9FE870",
    "listIconKey": "down",
    "dateGroup": "Today",
    "dateStr": "2026-10-20T10:00:00Z",
    "currency": "EUR",
    "date": "Today",
    "transactionNumber": "#2409599666"
  }
];
