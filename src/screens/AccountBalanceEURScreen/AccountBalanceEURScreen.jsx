import { useState, useRef, useEffect } from 'react'
import './AccountBalanceEURScreen.css'

import { mockEurAccount, mockEurTransactions } from '../../data/mockData'

/* ── Local assets (extracted from Figma nodes 31:454 & 24:144) ── */
import imgClose         from '../../assets/accounts/eur/btn-close.png'
import imgMore          from '../../assets/accounts/eur/btn-more.png'
import imgCurrencyIcon  from '../../assets/accounts/eur/icon-currency.png'
import imgCurrencyFlag  from '../../assets/accounts/eur/flag-eur.png'
import imgIbanBank      from '../../assets/accounts/eur/icon-iban-bank.png'
import imgIbanChevron   from '../../assets/accounts/eur/icon-iban-chevron.png'
import imgFlower        from '../../assets/accounts/eur/artwork-flower.png'
import imgInterestClose from '../../assets/accounts/eur/btn-interest-close.png'
import imgTabsBg        from '../../assets/accounts/eur/bg-transaction-tabs.png'
import imgTxDown        from '../../assets/accounts/eur/icon-tx-down.png'
import imgViewAllIcon   from '../../assets/accounts/eur/icon-view-all.png'
import imgRowChevron    from '../../assets/accounts/eur/icon-row-chevron.png'
import imgActionAdd     from '../../assets/accounts/eur/icon-action-add.png'
import imgActionConvert from '../../assets/accounts/eur/icon-action-convert.png'
import imgActionSend    from '../../assets/accounts/eur/icon-action-send.png'
import imgActionGetpaid from '../../assets/accounts/eur/icon-action-getpaid.png'

/**
 * AccountBalanceEURScreen — Single continuous screen representing
 * both Screen01 (scrollTop = 0) and Screen02 (scrolled state).
 *
 * Figma Frames:
 *   - AccountBalanceEURScreen01 (Node 31:454)
 *   - AccountBalanceEURScreen02 (Node 24:144)
 * Viewport: 390 × 844
 *
 * Props:
 *   onClose             — called when X is tapped; returns to Home
 *   onSelectTransaction — called with a transaction object to open details
 */
function AccountBalanceEURScreen({ onClose, onSelectTransaction, onOpenDetails }) {
  const [interestVisible, setInterestVisible] = useState(true)
  const [isScrolled, setIsScrolled]           = useState(false)
  const scrollRef                             = useRef(null)

  useEffect(() => {
    const el = scrollRef.current;
    const savedPos = window.history.state?.scrollPos;
    if (el && savedPos !== undefined && savedPos > 0) {
      requestAnimationFrame(() => {
        el.scrollTop = savedPos;
        setIsScrolled(savedPos > 100);
      });
    }
  }, [])

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 100)
  }

  const handleTxRowClick = (tx) => {
    if (onSelectTransaction) {
      onSelectTransaction(tx)
    }
  }

  return (
    <div
      className="eur-screen"
      data-node-id="31:454"
      data-name="AccountBalanceEURScreen"
    >
      {/* ══ FIXED TOP BAR / CONTROLS (31:507 / 24:177) ══ */}
      <header
        className={`eur-screen__top-controls ${isScrolled ? 'eur-screen__top-controls--scrolled' : ''}`}
        data-node-id="24:177"
      >
        <button
          type="button"
          className="eur-screen__btn eur-screen__btn--close"
          onClick={onClose}
          aria-label="Close account balance"
          data-node-id="24:191"
        >
          <img src={imgClose} alt="" draggable={false} />
        </button>

        {/* Compact identity title — smoothly visible when scrolled */}
        <div
          className={`eur-screen__compact-identity ${isScrolled ? 'eur-screen__compact-identity--visible' : ''}`}
          data-node-id="24:186"
        >
          <div className="eur-screen__compact-icons">
            <img
              src={imgCurrencyIcon}
              className="eur-screen__compact-currency-icon"
              alt=""
              draggable={false}
            />
            <img
              src={imgCurrencyFlag}
              className="eur-screen__compact-flag"
              alt=""
              draggable={false}
            />
          </div>
          <span className="eur-screen__compact-title" data-node-id="24:188">
            EUR
          </span>
        </div>

        <button
          type="button"
          className="eur-screen__btn eur-screen__btn--more"
          aria-label="More options"
          data-node-id="24:187"
        >
          <img src={imgMore} alt="" draggable={false} />
        </button>
      </header>

      {/* ══ SCROLL VIEWPORT (Single scroll owner) ══ */}
      <div className="eur-screen__scroll" onScroll={handleScroll} ref={scrollRef}>
        <div className="eur-screen__scroll-inner">

          {/* ── Account Hero (Screen01) ── */}
          <div className="eur-screen__hero">
            {/* Currency/Flag icons (31:500, 31:501, 31:502) */}
            <div className="eur-screen__currency-icons">
              <div className="eur-screen__currency-icon" data-node-id="31:501">
                <img src={imgCurrencyIcon} alt="" draggable={false} className="eur-screen__wise-logo" />
              </div>
              <div className="eur-screen__flag-icon" data-node-id="31:502">
                <img src={imgCurrencyFlag} alt="" draggable={false} />
              </div>
            </div>

            {/* Account label (31:505) */}
            <div className="eur-screen__account-label" data-node-id="31:505">
              {mockEurAccount.accountLabel}
            </div>

            {/* Balance (31:504) */}
            <div className="eur-screen__balance" data-node-id="31:504">
              {mockEurAccount.balance} {mockEurAccount.currency}
            </div>

            {/* IBAN Pill (31:494/31:495) — Full Pill Touch Target */}
            <button
              type="button"
              className="eur-screen__iban-pill"
              onClick={onOpenDetails}
              aria-label="Account details — BE58 9030 1491 1979"
              data-node-id="31:495"
            >
              <img
                src={imgIbanBank}
                className="eur-screen__iban-bank-icon"
                alt=""
                draggable={false}
              />
              <span className="eur-screen__iban-text" data-node-id="31:499">
                {mockEurAccount.iban}
              </span>
              <img
                src={imgIbanChevron}
                className="eur-screen__iban-chevron"
                alt=""
                draggable={false}
              />
            </button>
          </div>

          {/* ── Interest Card (31:488) ── */}
          {interestVisible && (
            <div className="eur-screen__interest-card" data-node-id="31:488">
              <div className="eur-screen__interest-bg" data-node-id="31:489" />

              <button
                type="button"
                className="eur-screen__interest-close"
                onClick={() => setInterestVisible(false)}
                aria-label="Dismiss interest card"
                data-node-id="31:490"
              >
                <img src={imgInterestClose} alt="" draggable={false} />
              </button>

              <div className="eur-screen__interest-flower" data-node-id="31:491">
                <img src={imgFlower} alt="" draggable={false} />
              </div>

              <div className="eur-screen__interest-body">
                <div className="eur-screen__interest-text" data-node-id="31:493">
                  You could be earning a<br />
                  2.25% variable rate
                </div>
                <button
                  type="button"
                  className="eur-screen__interest-link"
                  data-node-id="31:492"
                >
                  Learn more
                </button>
              </div>
            </div>
          )}

          {/* ── Risk Disclaimer (31:503) ── */}
          <div className="eur-screen__disclaimer" data-node-id="31:503">
            Capital at risk. Growth not guaranteed. Investment services are
            provided by Wise Assets UK Ltd. Variable rate is based on
            7-day performance as of Sep 23, 2026.
          </div>

          {/* ── Transaction Tabs (31:480 / 24:180) ── */}
          <div className="eur-screen__tabs" data-node-id="24:180">
            {/* Tabs background pill */}
            <div className="eur-screen__tabs-bg" data-node-id="24:181">
              <img src={imgTabsBg} alt="" draggable={false} />
            </div>

            {/* Transactions tab (active) */}
            <button
              type="button"
              className="eur-screen__tab--transactions"
              data-node-id="24:182"
            >
              <div className="eur-screen__tab-transactions-bg" data-node-id="24:183" />
              <span className="eur-screen__tab-transactions-label" data-node-id="24:184">
                Transactions
              </span>
            </button>

            {/* Options tab (inactive) */}
            <button
              type="button"
              className="eur-screen__tab--options"
              data-node-id="24:185"
            >
              <div className="eur-screen__tab-options-bg" />
              <span className="eur-screen__tab-options-label">
                Options
              </span>
            </button>
          </div>

          {/* ── Transaction List (Data-Driven & Repeatable) ── */}
          <div className="eur-screen__tx-list" data-node-id="24:165">
            {/* Davy Lim Transaction Row */}
            {mockEurTransactions.map((tx) => (
              <button
                key={tx.id}
                type="button"
                className="eur-screen__tx-row"
                onClick={() => handleTxRowClick(tx)}
                aria-label={`${tx.title}, ${tx.amount}`}
                data-node-id="24:171"
              >
                <div className="eur-screen__tx-icon" data-node-id="24:176">
                  <img src={imgTxDown} alt="" draggable={false} />
                </div>
                <div
                  className="eur-screen__tx-title"
                  style={{ color: tx.titleColor }}
                  data-node-id="24:175"
                >
                  {tx.title}
                </div>
                <div className="eur-screen__tx-date" data-node-id="24:174">
                  {tx.date}
                </div>
                <div
                  className="eur-screen__tx-amount"
                  style={{ color: tx.amountColor }}
                  data-node-id="24:172"
                >
                  {tx.amount}
                </div>
              </button>
            ))}

            {/* View all Transactions Row (Screen02 / 24:166) */}
            <button
              type="button"
              className="eur-screen__view-all-row"
              aria-label="View all Transactions"
              data-node-id="24:166"
            >
              <div className="eur-screen__view-all-icon" data-node-id="24:170">
                <img src={imgViewAllIcon} alt="" draggable={false} />
              </div>
              <div className="eur-screen__view-all-title" data-node-id="24:169">
                View all
              </div>
              <div className="eur-screen__view-all-subtitle" data-node-id="24:168">
                Transactions
              </div>
              <div className="eur-screen__view-all-chevron" data-node-id="24:167">
                <img src={imgRowChevron} alt="" draggable={false} />
              </div>
            </button>
          </div>

        </div>{/* /scroll-inner */}
      </div>{/* /scroll */}

      {/* ══ FLOATING ACTION BAR (instances = 1, symmetrical capsule radius) ══ */}
      <div className="eur-screen__floating-bar-wrap" data-node-id="24:150">
        <div className="eur-screen__action-bar" data-node-id="24:152">
          {/* Add */}
          <button type="button" className="eur-screen__action-item" aria-label="Add money" data-node-id="24:162">
            <div className="eur-screen__action-icon">
              <img src={imgActionAdd} alt="" draggable={false} />
            </div>
            <span className="eur-screen__action-label">Add</span>
          </button>

          {/* Convert */}
          <button type="button" className="eur-screen__action-item" aria-label="Convert currency" data-node-id="24:159">
            <div className="eur-screen__action-icon eur-screen__action-icon--convert">
              <img src={imgActionConvert} alt="" draggable={false} />
            </div>
            <span className="eur-screen__action-label">Convert</span>
          </button>

          {/* Send */}
          <button type="button" className="eur-screen__action-item" aria-label="Send money" data-node-id="24:156">
            <div className="eur-screen__action-icon eur-screen__action-icon--send">
              <img src={imgActionSend} alt="" draggable={false} />
            </div>
            <span className="eur-screen__action-label">Send</span>
          </button>

          {/* Get paid */}
          <button type="button" className="eur-screen__action-item" aria-label="Get paid" data-node-id="24:153">
            <div className="eur-screen__action-icon eur-screen__action-icon--getpaid">
              <img src={imgActionGetpaid} alt="" draggable={false} />
            </div>
            <span className="eur-screen__action-label eur-screen__action-label--getpaid">Get paid</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceEURScreen
