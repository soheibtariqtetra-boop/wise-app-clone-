import './BalanceSection.css'

import imgEyeIcon from '../../assets/home/account/eye-icon.png'
import { mockBalance } from '../../data/mockData'

/**
 * BalanceSection — Total balance display with privacy toggle.
 *
 * Props:
 *   balancesHidden {boolean} — when true, monetary values are masked
 *   onToggle       {function} — called when the eye button is clicked
 */
function BalanceSection({ balancesHidden, onToggle }) {
  const displayTotal = mockBalance.total.endsWith('.00') 
    ? mockBalance.total.slice(0, -3) 
    : mockBalance.total;

  return (
    <section className="balance-section" aria-label="Account balance">
      <div className="balance-section__label">
        Total balance
      </div>
      
      <div className="balance-section__row">
        <div className="balance-section__amount">
          {balancesHidden ? '****' : displayTotal} {mockBalance.currency}
        </div>

        <button
          type="button"
          className="balance-section__eye-btn"
          aria-label={balancesHidden ? 'Show balances' : 'Hide balances'}
          onClick={onToggle}
        >
          <img src={imgEyeIcon} alt="" aria-hidden="true" className="balance-section__eye-icon" draggable={false} />
        </button>
      </div>
    </section>
  )
}

export default BalanceSection
