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
    titleColor: '#c0c2bf',
    date: 'May 21',
    amount: '+3GBP',
    amountColor: '#a4bf92',
    listIconKey: 'down',
    // Detail screen data (TransactionDetailsScreen01)
    detail: {
      // Summary panel
      detailAmount: '+ 100 EUR',
      detailAmountColor: '#bcdca8',
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
    titleColor: '#bdbfbb',
    date: 'Feb 19',
    amount: '50 GBP',
    amountColor: '#c5c7c3',
    listIconKey: 'up',
    detail: null, // No detail screen assigned yet
  },
  {
    id: 'tx-003',
    title: 'To GBP',
    titleColor: '#c7c9c5',
    date: 'Added · Feb 19',
    amount: '+ 50 GBP',
    amountColor: '#aac698',
    listIconKey: 'plus',
    detail: null, // No detail screen assigned yet
  },
]

/**
 * EUR Account Balance screen — transaction list.
 * Same data shape as mockTransactions so the reusable
 * TransactionDetailsScreen can render any of them.
 *
 * listIconKey 'eur-down' maps to accounts/eur/icon-tx-down.png
 */
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
