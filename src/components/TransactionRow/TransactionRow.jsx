import './TransactionRow.css'

import imgIconDown from '../../assets/home/transactions/tx-down.png'
import imgIconUp from '../../assets/home/transactions/tx-up.png'
import imgIconPlus from '../../assets/home/transactions/tx-plus.png'
import imgIconFacebook from '../../assets/home/transactions/tx-facebook.png'
import imgIconHostinger from '../../assets/home/transactions/tx-hostinger.png'
import imgIconShopify from '../../assets/home/transactions/tx-shopify.png'

/** Map data-driven listIconKey to the exact pre-approved Home icons */
const ICON_MAP = {
  down: imgIconDown,
  up:   imgIconUp,
  plus: imgIconPlus,
  facebook: imgIconFacebook,
  hostinger: imgIconHostinger,
  shopify: imgIconShopify,
}

/**
 * Reusable transaction list row.
 * Receives a single `transaction` object from the data layer.
 * Calls `onSelect(transaction)` when the full row is tapped/clicked.
 * When `transaction.detail` is null the row is still interactive but
 * onSelect won't trigger navigation (handled by caller).
 */
function TransactionRow({ transaction, onSelect }) {
  const icon = ICON_MAP[transaction.listIconKey] || imgIconDown

  const handleClick = () => {
    if (onSelect) onSelect(transaction)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      type="button"
      className="transaction-row"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${transaction.title}, ${transaction.date || transaction.subtitle || ''}, ${transaction.amount}`}
      data-tx-id={transaction.id}
    >
      <img
        src={icon}
        className="transaction-row__icon"
        draggable={false}
        alt=""
      />
      <div className="transaction-row__info">
        <div
          className="transaction-row__title"
          style={{ color: transaction.titleColor }}
        >
          {transaction.title}
        </div>
        {(transaction.date || transaction.subtitle) && (
          <div className="transaction-row__meta">{transaction.date || transaction.subtitle}</div>
        )}
      </div>
      <div className="transaction-row__amounts">
        <div
          className="transaction-row__amount"
          style={{ color: transaction.amountColor }}
        >
          {transaction.amount}
        </div>
        {transaction.convertedAmount && (
          <div className="transaction-row__converted-amount">
            {transaction.convertedAmount}
          </div>
        )}
      </div>
    </button>
  )
}

export default TransactionRow
