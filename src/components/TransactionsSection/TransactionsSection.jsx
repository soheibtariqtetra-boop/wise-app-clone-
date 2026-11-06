import './TransactionsSection.css'
import TransactionRow from '../TransactionRow/TransactionRow'
import { mockTransactions } from '../../data/mockData'

/**
 * TransactionsSection — data-driven.
 * Home shows only the latest 3 transactions; full history stays in mockData.
 * Calls onSelectTransaction(transaction) when a row is tapped.
 */
const HOME_TRANSACTION_LIMIT = 3

function TransactionsSection({ onSelectTransaction, onSeeAll }) {
  const handleSelect = (transaction) => {
    if (onSelectTransaction) {
      onSelectTransaction(transaction)
    }
  }

  const homeTransactions = mockTransactions.slice(0, HOME_TRANSACTION_LIMIT)

  return (
    <div className="transactions-section">
      <div className="transactions-section__header">
        <h2 className="transactions-section__title">Transactions</h2>
        <button className="transactions-section__see-all" onClick={onSeeAll}>See all</button>
      </div>

      <div className="transactions-section__list">
        {homeTransactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            transaction={tx}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default TransactionsSection
