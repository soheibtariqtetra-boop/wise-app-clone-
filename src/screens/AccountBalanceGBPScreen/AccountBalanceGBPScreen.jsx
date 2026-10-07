import { useState } from 'react'
import './AccountBalanceGBPScreen.css'

import { mockGbpAccount, mockGbpTransactions } from '../../data/mockData'

/* ── Local assets (reusing exact local assets) ── */
import imgClose         from '../../assets/accounts/eur/btn-close.png'
import imgMore          from '../../assets/accounts/eur/btn-more.png'
import imgCurrencyIcon  from '../../assets/accounts/eur/icon-currency.png'
import imgCurrencyFlag  from '../../assets/accounts/gbp/flag-gbp.png'
import imgIbanBank      from '../../assets/accounts/eur/icon-iban-bank.png'
import imgIbanChevron   from '../../assets/accounts/eur/icon-iban-chevron.png'
import imgFlower        from '../../assets/accounts/eur/artwork-flower.png'
import imgInterestClose from '../../assets/accounts/eur/btn-interest-close.png'
import imgTabsBg        from '../../assets/accounts/eur/bg-transaction-tabs.png'
import imgTxDown        from '../../assets/home/transactions/tx-down.png'
import imgTxUp          from '../../assets/home/transactions/tx-up.png'
import imgTxPlus        from '../../assets/home/transactions/tx-plus.png'
import imgViewAllIcon   from '../../assets/accounts/eur/icon-view-all.png'
import imgRowChevron    from '../../assets/accounts/eur/icon-row-chevron.png'
import imgActionAdd     from '../../assets/accounts/eur/icon-action-add.png'
import imgActionConvert from '../../assets/accounts/eur/icon-action-convert.png'
import imgActionSend    from '../../assets/accounts/eur/icon-action-send.png'
import imgActionGetpaid from '../../assets/accounts/eur/icon-action-getpaid.png'

const txIconMap = {
  down: imgTxDown,
  up: imgTxUp,
  plus: imgTxPlus,
}

/**
 * AccountBalanceGBPScreen — Single continuous screen representing
 * both Screen01 (scrollTop = 0) and Screen02 (scrolled state).
 *
 * Figma Frames:
 *   - AccountBalanceGBPScreen01 (Node 31:510)
 *   - AccountBalanceGBPScreen02 (Node 31:397)
 * Viewport: 390 × 844
 *
 * Props:
 *   onClose             — called when X is tapped; returns to Home
 *   onSelectTransaction — called with a transaction object to open details
 *   onOpenDetails       — called when green account details pill is tapped; opens GBPAccountDetailsScreen
 */
function AccountBalanceGBPScreen({ onClose, onSelectTransaction, onOpenDetails }) {
  const [interestVisible, setInterestVisible] = useState(true)
  const [isScrolled, setIsScrolled]           = useState(false)

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 100)
  }

  const handleTxRowClick = (tx) => {
    if (onSelectTransaction) {
      onSelectTransaction(tx)
    }
  }

  const gbpAccount = mockGbpAccount || {
    currency: 'GBP',
    balance: '3.00',
    accountLabel: 'Current account / GBP',
    pillLabel: '60-84-64 · 54158151',
    interestRate: '3.29%',
  }

  return (
    <div
      className="gbp-screen"
      data-node-id="31:510"
      data-name="AccountBalanceGBPScreen01"
    >
      {/* ══ FIXED TOP BAR / CONTROLS (31:562 / 31:448) ══ */}
      <header
        className={`gbp-screen__top-controls ${isScrolled ? 'gbp-screen__top-controls--scrolled' : ''}`}
        data-node-id="31:562"
      >
        <button
          type="button"
          className="gbp-screen__btn gbp-screen__btn--close"
          onClick={onClose}
          aria-label="Close account balance"
          data-node-id="31:564"
        >
          <img src={imgClose} alt="" draggable={false} />
        </button>

        {/* Compact identity title — smoothly visible when scrolled (31:448) */}
        <div
          className={`gbp-screen__compact-identity ${isScrolled ? 'gbp-screen__compact-identity--visible' : ''}`}
          data-node-id="31:451"
        >
          <div className="gbp-screen__compact-icons">
            <img
              src={imgCurrencyIcon}
              className="gbp-screen__compact-currency-icon"
              alt=""
              draggable={false}
            />
            <img
              src={imgCurrencyFlag}
              className="gbp-screen__compact-flag"
              alt=""
              draggable={false}
            />
          </div>
          <span className="gbp-screen__compact-title" data-node-id="31:450">
            GBP
          </span>
        </div>

        <button
          type="button"
          className="gbp-screen__btn gbp-screen__btn--more"
          aria-label="More options"
          data-node-id="31:563"
        >
          <img src={imgMore} alt="" draggable={false} />
        </button>
      </header>

      {/* ══ SCROLL VIEWPORT (Single scroll owner) ══ */}
      <div className="gbp-screen__scroll" onScroll={handleScroll}>
        <div className="gbp-screen__scroll-inner">

          {/* ── Account Hero (Screen01 / 31:556-559) ── */}
          <div className="gbp-screen__hero">
            {/* Currency/Flag icons (31:556, 31:560, 31:561) */}
            <div className="gbp-screen__currency-icons">
              <div className="gbp-screen__currency-icon">
                <img src={imgCurrencyIcon} alt="" draggable={false} />
              </div>
              <div className="gbp-screen__flag-icon">
                <img src={imgCurrencyFlag} alt="" draggable={false} />
              </div>
            </div>

            {/* Account label (31:559) */}
            <div className="gbp-screen__account-label" data-node-id="31:559">
              {gbpAccount.accountLabel}
            </div>

            {/* Balance (31:558) */}
            <div className="gbp-screen__balance" data-node-id="31:558">
              {gbpAccount.balance} {gbpAccount.currency}
            </div>

            {/* Green Account Details Pill (31:550/31:551) — Full Pill Touch Target */}
            <button
              type="button"
              className="gbp-screen__details-pill"
              onClick={onOpenDetails}
              aria-label={`Account details — ${gbpAccount.pillLabel}`}
              data-node-id="31:551"
            >
              <img
                src={imgIbanBank}
                className="gbp-screen__details-bank-icon"
                alt=""
                draggable={false}
              />
              <span className="gbp-screen__details-text" data-node-id="31:555">
                {gbpAccount.pillLabel}
              </span>
              <img
                src={imgIbanChevron}
                className="gbp-screen__details-chevron"
                alt=""
                draggable={false}
              />
            </button>
          </div>

          {/* ── Interest Card (31:544) ── */}
          {interestVisible && (
            <div className="gbp-screen__interest-card" data-node-id="31:544">
              <div className="gbp-screen__interest-bg" data-node-id="31:545" />

              <button
                type="button"
                className="gbp-screen__interest-close"
                onClick={() => setInterestVisible(false)}
                aria-label="Dismiss interest card"
                data-node-id="31:546"
              >
                <img src={imgInterestClose} alt="" draggable={false} />
              </button>

              <div className="gbp-screen__interest-flower" data-node-id="31:547">
                <img src={imgFlower} alt="" draggable={false} />
              </div>

              <div className="gbp-screen__interest-body">
                <div className="gbp-screen__interest-text" data-node-id="31:549">
                  You could be earning a<br />
                  {gbpAccount.interestRate} variable rate
                </div>
                <button
                  type="button"
                  className="gbp-screen__interest-link"
                  data-node-id="31:548"
                >
                  Learn more
                </button>
              </div>
            </div>
          )}

          {/* ── Risk Disclaimer (31:557 / 31:446) ── */}
          <div className="gbp-screen__disclaimer" data-node-id="31:557">
            Capital at risk. Growth not guaranteed. Investment services are
            provided by Wise Assets UK Ltd. Variable rate is based on
            7-day performance as of Sep 23, 2026.
          </div>

          {/* ── Transaction Tabs (31:536 / 31:440) ── */}
          <div className="gbp-screen__tabs" data-node-id="31:536">
            {/* Tabs background pill */}
            <div className="gbp-screen__tabs-bg" data-node-id="31:537">
              <img src={imgTabsBg} alt="" draggable={false} />
            </div>

            {/* Transactions tab (active) */}
            <button
              type="button"
              className="gbp-screen__tab--transactions"
              data-node-id="31:541"
            >
              <div className="gbp-screen__tab-transactions-bg" data-node-id="31:542" />
              <span className="gbp-screen__tab-transactions-label" data-node-id="31:543">
                Transactions
              </span>
            </button>

            {/* Options tab (inactive) */}
            <button
              type="button"
              className="gbp-screen__tab--options"
              data-node-id="31:538"
            >
              <div className="gbp-screen__tab-options-bg" data-node-id="31:539" />
              <span className="gbp-screen__tab-options-label" data-node-id="31:540">
                Options
              </span>
            </button>
          </div>

          {/* ── Transaction List (Data-Driven & Repeatable — Screen01 + Screen02 combined) ── */}
          <div className="gbp-screen__tx-list" data-node-id="31:417">
            {mockGbpTransactions.map((tx) => {
              const iconSrc = txIconMap[tx.listIconKey] || imgTxDown
              return (
                <button
                  key={tx.id}
                  type="button"
                  className="gbp-screen__tx-row"
                  onClick={() => handleTxRowClick(tx)}
                  aria-label={`${tx.title}, ${tx.amount}`}
                >
                  <div className="gbp-screen__tx-icon">
                    <img src={iconSrc} alt="" draggable={false} />
                  </div>
                  <div
                    className="gbp-screen__tx-title"
                    style={{ color: tx.titleColor || '#c7c9c5' }}
                  >
                    {tx.title}
                  </div>
                  <div className="gbp-screen__tx-date">
                    {tx.date}
                  </div>
                  <div
                    className="gbp-screen__tx-amount"
                    style={{ color: tx.amountColor || '#a8c596' }}
                  >
                    {tx.amount}
                  </div>
                </button>
              )
            })}

            {/* View all Transactions Row (Screen02 / 31:418) */}
            <button
              type="button"
              className="gbp-screen__view-all-row"
              aria-label="View all Transactions"
              data-node-id="31:418"
            >
              <div className="gbp-screen__view-all-icon" data-node-id="31:422">
                <img src={imgViewAllIcon} alt="" draggable={false} />
              </div>
              <div className="gbp-screen__view-all-title" data-node-id="31:421">
                View all
              </div>
              <div className="gbp-screen__view-all-subtitle" data-node-id="31:420">
                Transactions
              </div>
              <div className="gbp-screen__view-all-chevron" data-node-id="31:419">
                <img src={imgRowChevron} alt="" draggable={false} />
              </div>
            </button>
          </div>

        </div>{/* /scroll-inner */}
      </div>{/* /scroll */}

      {/* ══ FLOATING ACTION BAR (Capsule radius 36px / Node 31:515 & 31:402) ══ */}
      <div className="gbp-screen__floating-bar-wrap" data-node-id="31:402">
        <div className="gbp-screen__action-bar" data-node-id="31:403">
          {/* Add */}
          <button type="button" className="gbp-screen__action-item" aria-label="Add money" data-node-id="31:414">
            <div className="gbp-screen__action-icon">
              <img src={imgActionAdd} alt="" draggable={false} />
            </div>
            <span className="gbp-screen__action-label">Add</span>
          </button>

          {/* Convert */}
          <button type="button" className="gbp-screen__action-item" aria-label="Convert currency" data-node-id="31:411">
            <div className="gbp-screen__action-icon gbp-screen__action-icon--convert">
              <img src={imgActionConvert} alt="" draggable={false} />
            </div>
            <span className="gbp-screen__action-label">Convert</span>
          </button>

          {/* Send */}
          <button type="button" className="gbp-screen__action-item" aria-label="Send money" data-node-id="31:408">
            <div className="gbp-screen__action-icon gbp-screen__action-icon--send">
              <img src={imgActionSend} alt="" draggable={false} />
            </div>
            <span className="gbp-screen__action-label">Send</span>
          </button>

          {/* Get paid */}
          <button type="button" className="gbp-screen__action-item" aria-label="Get paid" data-node-id="31:405">
            <div className="gbp-screen__action-icon gbp-screen__action-icon--getpaid">
              <img src={imgActionGetpaid} alt="" draggable={false} />
            </div>
            <span className="gbp-screen__action-label gbp-screen__action-label--getpaid">Get paid</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceGBPScreen
