/**
 * Mock application data for the Home screen.
 * In a real app this would come from an API.
 * Kept separate from components so UI and data can evolve independently.
 */

export const mockUser = {
  initials: 'ML',
  name: 'Muhammad L',
}

export const mockBalance = {
  total: '3.00',
  currency: 'GBP',
}

export const mockCurrencyAccounts = [
  {
    id: 'gbp',
    flag: '🇬🇧',
    symbol: '£',
    amount: '3.00',
    currency: 'GBP',
  },
  {
    id: 'eur',
    flag: '🇪🇺',
    symbol: '€',
    amount: '0.00',
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

/**
 * Transaction list data.
 * Each entry drives ONE reusable <TransactionRow /> in the Home list
 * AND ONE reusable <TransactionDetailsScreen /> when tapped.
 *
 * listIconKey  — maps to the existing home/transactions/ icon set
 *                'down' → tx-down.png  |  'up' → tx-up.png  |  'plus' → tx-plus.png
 * amountColor  — Figma-exact color for the amount text in the list row
 * titleColor   — Figma-exact color for the title in the list row
 * detail       — null means "no details screen assigned yet"
 */
export const mockTransactions = [
  {
    id: 'tx-001',
    // List row display
    title: 'FALCON SHOP LTD',
    titleColor: '#F3F5F1',
    date: 'May 21',
    amount: '+ 3 GBP',
    amountColor: '#9FE870',
    listIconKey: 'down',
    // Detail screen data (TransactionDetailsScreen01)
    detail: {
      // Summary panel
      detailAmount: '+ 100 EUR',
      detailAmountColor: '#9FE870',
      recipient: 'Davy Lim',
      statusLabel: 'Money added',
      // Details rows
      receivedValue: '100 EUR',
      receivedDate: 'Wednesday, September 30,\n2026 at 7:24 PM',
      reference: '769964',
      transactionNumber: '#2402254931',
    },
  },
  {
    id: 'tx-002',
    title: 'For your account plan',
    titleColor: '#F3F5F1',
    date: 'Feb 19',
    amount: '50 GBP',
    amountColor: '#C2C6C0',
    listIconKey: 'up',
    detail: null, // No detail screen assigned yet
  },
  {
    id: 'tx-003',
    title: 'To GBP',
    titleColor: '#F3F5F1',
    date: 'Added · Feb 19',
    amount: '+ 50 GBP',
    amountColor: '#9FE870',
    listIconKey: 'plus',
    detail: null, // No detail screen assigned yet
  },
]

export const mockFullTransactions = [
  {
    dateGroup: 'Yesterday',
    transactions: [
      {
        id: 'full-tx-001',
        title: 'Facebook',
        titleColor: '#F3F5F1',
        amount: '231.42 USD',
        amountColor: '#F3F5F1',
        convertedAmount: '207.47 EUR',
        listIconKey: 'facebook',
      },
      {
        id: 'full-tx-002',
        title: 'Facebook',
        titleColor: '#F3F5F1',
        subtitle: 'Card checked',
        amount: '0 USD',
        amountColor: '#F3F5F1',
        listIconKey: 'facebook',
      },
    ]
  },
  {
    dateGroup: 'Saturday, October 3',
    transactions: [
      {
        id: 'full-tx-003',
        title: 'SERGEI NOVIKOV',
        titleColor: '#F3F5F1',
        amount: '+ 425 EUR',
        amountColor: '#F3F5F1', // Based on screenshot amount is primary text color (#f3f5f1)
        listIconKey: 'down',
      },
      {
        id: 'full-tx-004',
        title: 'Hostinger',
        titleColor: '#F3F5F1',
        amount: '14.85 GBP',
        amountColor: '#F3F5F1',
        convertedAmount: '17.55 EUR',
        listIconKey: 'hostinger',
      },
      {
        id: 'full-tx-005',
        title: 'Shopify',
        titleColor: '#F3F5F1',
        amount: '1USD',
        amountColor: '#F3F5F1',
        convertedAmount: '0.90 EUR',
        listIconKey: 'shopify',
      },
      {
        id: 'full-tx-006',
        title: 'Shopify',
        titleColor: '#F3F5F1',
        subtitle: 'Card checked',
        amount: '0 SGD', // From Screen01 or 0 EUR from Screen02
        amountColor: '#F3F5F1',
        listIconKey: 'shopify',
      },
    ]
  },
  {
    dateGroup: 'Wednesday, September 30',
    transactions: [
      {
        id: 'full-tx-007',
        title: 'Davy Lim',
        titleColor: '#F3F5F1',
        amount: '+100 EUR',
        amountColor: '#F3F5F1',
        listIconKey: 'down',
      }
    ]
  },
  {
    dateGroup: 'May 21',
    transactions: [
      {
        id: 'full-tx-008',
        title: 'FALCON SHOP LTD',
        titleColor: '#F3F5F1',
        amount: '+ 3 GBP',
        amountColor: '#F3F5F1',
        listIconKey: 'down',
      }
    ]
  },
  {
    dateGroup: 'February 19',
    transactions: [
      {
        id: 'full-tx-009',
        title: 'For your account plan',
        titleColor: '#F3F5F1',
        amount: '50 GBP',
        amountColor: '#F3F5F1',
        listIconKey: 'up',
      },
      {
        id: 'full-tx-010',
        title: 'To GBP',
        titleColor: '#F3F5F1',
        subtitle: 'Added',
        amount: '+ 50 GBP',
        amountColor: '#F3F5F1',
        listIconKey: 'plus',
      }
    ]
  }
]

/**
 * EUR Account Balance screen — transaction list.
 * Same data shape as mockTransactions so the reusable
 * TransactionDetailsScreen can render any of them.
 *
 * listIconKey 'eur-down' maps to accounts/eur/icon-tx-down.png
 */
export const mockGbpAccount = {
  currency: 'GBP',
  symbol: '£',
  balance: '3.00',
  accountLabel: 'Current account / GBP',
  accountName: 'Muhammad Rana hussnain',
  accountNumber: '54158151',
  sortCode: '60-84-64',
  pillLabel: '60-84-64 · 54158151',
  interestRate: '3.29%',
  iban: 'GB28 TRWI 6084 6454 1581 51',
  swiftBic: 'TRWIGB2LXXX',
}

export const mockEurAccount = {
  currency: 'EUR',
  symbol: '€',
  balance: '100.00',
  iban: 'BE58 9030 1491 1979',
  accountLabel: 'Current account / EUR',
  accountName: 'Muhammad Ahsan Ayaz Ltd',
  swiftBic: 'TRWIBEB1XXX',
  bankAddressLines: [
    'Wise Europe SA, Rue du Trône',
    '100, 3rd floor, Brussels, 1050,',
    'Belgium',
  ],
}

export const mockEurTransactions = [
  {
    id: 'tx-eur-001',
    title: 'Davy Lim',
    titleColor: '#d3d5d1',
    date: 'Today',
    amount: '+ 100 EUR',
    amountColor: '#bbdba7',
    listIconKey: 'eur-down',
    detail: {
      detailAmount: '+ 100 EUR',
      detailAmountColor: '#bcdca8',
      recipient: 'Davy Lim',
      statusLabel: 'Money added',
      receivedValue: '100 EUR',
      receivedDate: 'Wednesday, September 30,\n2026 at 7:24 PM',
      reference: '769964',
      transactionNumber: '#2402254931',
    },
  },
]
