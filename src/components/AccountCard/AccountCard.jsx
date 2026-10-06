import './AccountCard.css'

import imgBankIcon from '../../assets/home/account/account-details-icon.png'
import imgChevronEUR from '../../assets/home/account/chevron-row-eur.png'
import imgFlagEUR from '../../assets/home/account/flag-eur.png'
import imgChevronGBP from '../../assets/home/account/chevron-row-gbp.png'
import imgFlagGBP from '../../assets/home/shared/flag-gbp.png'
import imgChevronUSD from '../../assets/home/account/chevron-row-usd.png'
import imgFlagUSD from '../../assets/home/account/flag-usd.png'
import imgAcctChevron from '../../assets/home/account/chevron-account-balance.png'
import imgCardBg from '../../assets/home/account/card-artwork.png'
import imgWiseLogo from '../../assets/home/account/card-logo.png'
import imgCardArrow from '../../assets/home/shared/chevron-right.png'
import { mockCurrencyAccounts } from '../../data/mockData'

/**
 * AccountCard — the Current Account card on the Home screen.
 *
 * Props:
 *   onEurClick     — called when the EUR currency row is tapped (full-row hit area)
 *   balancesHidden — when true, monetary display values are masked as ****
 *
 * Architecture note: onGbpClick / onUsdClick can be added later without
 * rebuilding the card — same pattern as EUR.
 */

/**
 * Helper: returns the masked string when privacy is on, otherwise returns
 * the real formatted value unchanged.
 *
 * Usage: displayBalance(balancesHidden, '€0.00')
 *        displayBalance(balancesHidden, '£3.00')
 */
function displayBalance(hidden, formattedValue) {
  return hidden ? '****' : formattedValue
}

function AccountCard({ onEurClick, onGbpClick, onAccountDetailsClick, balancesHidden }) {
  const gbpAcct = mockCurrencyAccounts.find(a => a.id === 'gbp')
  const eurAcct = mockCurrencyAccounts.find(a => a.id === 'eur')
  const usdAcct = mockCurrencyAccounts.find(a => a.id === 'usd')

  return (
    <div className="account-card">
      <div className="account-card__bg" />
      
      {/* ── Account Details Button */}
      <button
        type="button"
        className="account-card__details-wrap"
        onClick={onAccountDetailsClick}
        aria-label="Account details"
      >
        <div className="account-card__details-bg" />
        <img src={imgBankIcon} className="account-card__bank-icon" draggable={false} alt="" />
        <div className="account-card__details-text">Account details</div>
      </button>

      {/* ── Currency Section */}
      <div className="account-card__currency-section">
        {/* Primary Row (GBP / EUR) */}
        <div className="account-card__primary-row">
          {/* ── GBP hit area — full-row clickable overlay ── */}
          <button
            type="button"
            className="account-card__gbp-hit-area"
            onClick={onGbpClick}
            aria-label="GBP account — £3.00"
          >
            <img src={imgFlagGBP} className="account-card__gbp-flag" draggable={false} alt="" />
            <div className="account-card__gbp-amount">{displayBalance(balancesHidden, `${gbpAcct.symbol}${gbpAcct.amount}`)}</div>
            <img src={imgChevronGBP} className="account-card__gbp-separator" draggable={false} alt="" />
          </button>

          {/* ── EUR hit area — full-row clickable overlay ── */}
          <button
            type="button"
            className="account-card__eur-hit-area"
            onClick={onEurClick}
            aria-label="EUR account — €0.00"
          >
            <img src={imgChevronEUR} className="account-card__eur-chevron" draggable={false} alt="" />
            <div className="account-card__eur-amount">{displayBalance(balancesHidden, `${eurAcct.symbol}${eurAcct.amount}`)}</div>
            <img src={imgFlagEUR} className="account-card__eur-flag" draggable={false} alt="" />
          </button>
        </div>

        {/* USD Row */}
        <div className="account-card__usd-row">
          <img src={imgChevronUSD} className="account-card__usd-chevron" draggable={false} alt="" />
          <div className="account-card__usd-amount">{displayBalance(balancesHidden, `${usdAcct.symbol}${usdAcct.amount}`)}</div>
          <img src={imgFlagUSD} className="account-card__usd-flag" draggable={false} alt="" />
        </div>
      </div>

      {/* ── Card Header */}
      <div className="account-card__header">
        <img src={imgAcctChevron} className="account-card__header-chevron" draggable={false} alt="" />
        <div className="account-card__header-balance">{displayBalance(balancesHidden, `${gbpAcct.symbol}${gbpAcct.amount}`)}</div>
        <div className="account-card__header-title">Current account</div>
        
        <div className="account-card__artwork">
          <img src={imgCardBg} className="account-card__artwork-img" draggable={false} alt="" />
        </div>
        
        <img src={imgWiseLogo} className="account-card__wise-logo" draggable={false} alt="" />
        <img src={imgCardArrow} className="account-card__yourcard-chevron" draggable={false} alt="" />
        <div className="account-card__yourcard-text">Your card</div>
      </div>

    </div>
  )
}

export default AccountCard

