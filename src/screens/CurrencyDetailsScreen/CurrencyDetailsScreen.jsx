import React from 'react'
import './CurrencyDetailsScreen.css'

import imgBackButton from '../../assets/currency-details/btn-back.png'
import imgFlagGBP from '../../assets/currency-details/flag-gbp.png'
import imgFlagEUR from '../../assets/currency-details/flag-eur.png'
import imgPlusCircle from '../../assets/currency-details/icon-plus-circle.png'
import imgChevron from '../../assets/currency-details/icon-chevron.png'

/**
 * CurrencyDetailsScreen — Figma Node 169:79 (CurrencyDetailsScreen)
 *
 * Props:
 *   onBack                 — returns to Home
 *   onEurClick             — navigates to EUR account details
 *   onGbpClick             — navigates to GBP account details (if connected)
 *   onOtherCurrenciesClick — handles other currencies action
 */
function CurrencyDetailsScreen({ onBack, onEurClick, onGbpClick, onOtherCurrenciesClick }) {
  return (
    <div className="currency-details-screen" data-node-id="169:79" data-name="CurrencyDetailsScreen">
      {/* ── Back Button (169:80) ── */}
      <div className="currency-details-screen__back-container" data-node-id="169:80">
        <button
          type="button"
          className="currency-details-screen__back-btn"
          onClick={onBack}
          aria-label="Back"
          data-node-id="169:81"
        >
          <img src={imgBackButton} alt="Back" className="currency-details-screen__back-icon" draggable={false} />
        </button>
      </div>

      {/* ── Header Section (169:82) ── */}
      <div className="currency-details-screen__header" data-node-id="169:82">
        <h1 className="currency-details-screen__title" data-node-id="169:83">
          Choose a currency to<br />view your details
        </h1>
        <p className="currency-details-screen__desc" data-node-id="169:84">
          Receive bank transfers from around the world.{' '}
          <span className="currency-details-screen__learn-more">Learn more.</span>
        </p>
      </div>

      {/* ── Currency Options (169:85) ── */}
      <div className="currency-details-screen__options" data-node-id="169:85">
        {/* British pound row (169:86) */}
        <button
          type="button"
          className="currency-option-row"
          onClick={onGbpClick}
          aria-label="British pound — 60-84-64 · 54158151"
          data-node-id="169:86"
        >
          <div className="currency-option-row__flag-container" data-node-id="169:87">
            <img src={imgFlagGBP} alt="UK flag" className="currency-option-row__flag" draggable={false} />
          </div>
          <div className="currency-option-row__text-group" data-node-id="169:88">
            <span className="currency-option-row__currency-name" data-node-id="169:89">British pound</span>
            <span className="currency-option-row__account-details" data-node-id="169:90">60-84-64 · 54158151</span>
          </div>
          <img src={imgChevron} alt="" className="currency-option-row__chevron" data-node-id="169:91" draggable={false} />
        </button>

        {/* Euro row (169:92) */}
        <button
          type="button"
          className="currency-option-row"
          onClick={onEurClick}
          aria-label="Euro — BE58 9030 1491 1979"
          data-node-id="169:92"
        >
          <div className="currency-option-row__flag-container" data-node-id="169:93">
            <img src={imgFlagEUR} alt="EU flag" className="currency-option-row__flag" draggable={false} />
          </div>
          <div className="currency-option-row__text-group" data-node-id="169:94">
            <span className="currency-option-row__currency-name" data-node-id="169:95">Euro</span>
            <span className="currency-option-row__account-details" data-node-id="169:96">BE58 9030 1491 1979</span>
          </div>
          <img src={imgChevron} alt="" className="currency-option-row__chevron" data-node-id="169:97" draggable={false} />
        </button>

        {/* Receive other currencies row (169:98) */}
        <button
          type="button"
          className="currency-option-row"
          onClick={onOtherCurrenciesClick}
          aria-label="Receive other currencies"
          data-node-id="169:98"
        >
          <div className="currency-option-row__flag-container" data-node-id="169:99">
            <img src={imgPlusCircle} alt="Add currency" className="currency-option-row__flag" draggable={false} />
          </div>
          <div className="currency-option-row__text-group" data-node-id="169:100">
            <span className="currency-option-row__currency-name" data-node-id="169:101">Receive other currencies</span>
          </div>
          <img src={imgChevron} alt="" className="currency-option-row__chevron" data-node-id="169:102" draggable={false} />
        </button>
      </div>
    </div>
  )
}

export default CurrencyDetailsScreen
