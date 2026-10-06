import './TransactionsSection.css'
import TransactionRow from '../TransactionRow/TransactionRow'
import { mockTransactions } from '../../data/mockData'

/**
 * TransactionsSection — data-driven.
 * Renders one <TransactionRow /> per entry in mockTransactions.
 * Calls onSelectTransaction(transaction) when a row is tapped.
 * Adding a new transaction only requires adding an entry to mockData.
 */
function TransactionsSection({ onSelectTransaction, onSeeAll }) {
  const handleSelect = (transaction) => {
    if (transaction.detail && onSelectTransaction) {
      onSelectTransaction(transaction)
    }
    // If detail is null: row tap is gracefully inactive (no navigation).
  }

  return (
    <div className="transactions-section">
      <div className="transactions-section__header">
        <h2 className="transactions-section__title">Transactions</h2>
        <button className="transactions-section__see-all" onClick={onSeeAll}>See all</button>
      </div>

      <div className="transactions-section__list">
        {mockTransactions.map((tx) => (
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
