import { useState } from 'react'
import './GBPAccountDetailsScreen.css'

/* ── Local assets (Figma node 177:308 — GBPAccountDetailsScreen) ── */
import imgBackButton from '../../assets/accounts/gbp/btn-back.png'
import imgUkFlag     from '../../assets/accounts/gbp/flag-gbp.png'
import imgCopyIcon   from '../../assets/accounts/gbp/icon-copy.png'

/* Reused from EUR (same visual assets) */
import imgChevronRight from '../../assets/accounts/eur/icon-chevron-right-small.png'
import imgCheckGreen   from '../../assets/accounts/eur/icon-check-green.png'
import imgDocumentIcon from '../../assets/accounts/eur/icon-document.png'

/**
 * GBPAccountDetailsScreen — Figma node 177:308
 * Viewport reference: 390 × 844
 *
 * ONE continuous vertically scrollable page combining:
 *   - Header (fixed)
 *   - Receive GBP + Share
 *   - Account details card (Name, Account number, Sort code, IBAN, Swift/BIC, Bank address)
 *   - Quick facts (Fees / Speed / Limits tabs)
 *   - Availability
 *   - Documents
 *
 * Props:
 *   onBack — returns to CurrencyDetailsScreen
 */
function GBPAccountDetailsScreen({ onBack }) {
  const [copiedField, setCopiedField] = useState(null)
  const [activeTab, setActiveTab]     = useState('Fees')

  const account = {
    name:          'Muhammad Rana hussnain',
    accountNumber: '54158151',
    sortCode:      '60-84-64',
    iban:          'GB28 TRWI 6084 6454 1581 51',
    swiftBic:      'TRWIGB2LXXX',
    bankAddress:   [
      'Wise Payments Limited,',
      'Worship Square, 65 Clifton',
      'Street, London, EC2A 4JE,',
      'United Kingdom',
    ],
  }

  const handleCopy = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {})
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="gbp-details" data-node-id="177:308" data-name="GBPAccountDetailsScreen">

      {/* ══ FIXED HEADER (177:309) ══ */}
      <header className="gbp-details__header" data-node-id="177:309">
        <div className="gbp-details__header-identity" data-node-id="177:310">
          <button
            type="button"
            className="gbp-details__back-btn"
            onClick={onBack}
            aria-label="Back to currency details"
            data-node-id="177:311"
          >
            <img src={imgBackButton} alt="" draggable={false} />
          </button>

          <div className="gbp-details__header-text" data-node-id="177:312">
            <span className="gbp-details__header-currency" data-node-id="177:313">GBP</span>
            <span className="gbp-details__header-subtitle" data-node-id="177:314">Account details</span>
          </div>
        </div>

        <img
          src={imgUkFlag}
          className="gbp-details__flag"
          alt="UK flag"
          draggable={false}
          data-node-id="177:316"
        />
      </header>

      {/* ══ SCROLLABLE CONTENT ══ */}
      <div className="gbp-details__scroll">
        <div className="gbp-details__scroll-inner">

          {/* ── RECEIVE GBP SECTION (177:317) ── */}
          <div className="gbp-details__receive-section" data-node-id="177:317">
            <div className="gbp-details__receive-copy" data-node-id="177:318">
              <h1 className="gbp-details__receive-title" data-node-id="177:319">
                Receive GBP
              </h1>
              <div className="gbp-details__receive-subtitle" data-node-id="177:320">
                From the UK and{' '}
                <span className="gbp-details__receive-highlight">150+ countries</span>
              </div>
            </div>

            <button
              type="button"
              className="gbp-details__share-btn"
              aria-label="Share account details"
              data-node-id="177:322"
            >
              Share
            </button>
          </div>

          {/* ── ACCOUNT DETAILS CARD (177:324) ── */}
          <div className="gbp-details__card" data-node-id="177:324">

            {/* Name (177:325) */}
            <div className="gbp-details__row" data-node-id="177:325">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label" data-node-id="177:327">Name</span>
                <span className="gbp-details__row-value" data-node-id="177:329">
                  {account.name}
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn"
                onClick={() => handleCopy('Name', account.name)}
                aria-label={copiedField === 'Name' ? 'Copied!' : 'Copy name'}
                data-node-id="177:330"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'Name' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

            {/* Account number (177:331) */}
            <div className="gbp-details__row" data-node-id="177:331">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label" data-node-id="177:333">Account number</span>
                <span className="gbp-details__row-value" data-node-id="177:335">
                  {account.accountNumber}
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn"
                onClick={() => handleCopy('AccountNumber', account.accountNumber)}
                aria-label={copiedField === 'AccountNumber' ? 'Copied!' : 'Copy account number'}
                data-node-id="177:336"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'AccountNumber' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

            {/* Sort code (177:337) */}
            <div className="gbp-details__row" data-node-id="177:337">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label" data-node-id="177:339">Sort code</span>
                <span className="gbp-details__row-value" data-node-id="177:341">
                  {account.sortCode}
                </span>
                <span className="gbp-details__row-note" data-node-id="177:343">
                  Only used for domestic transfers
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn"
                onClick={() => handleCopy('SortCode', account.sortCode)}
                aria-label={copiedField === 'SortCode' ? 'Copied!' : 'Copy sort code'}
                data-node-id="177:344"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'SortCode' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

            {/* IBAN (177:345) */}
            <div className="gbp-details__row" data-node-id="177:345">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label gbp-details__row-label--small" data-node-id="177:347">IBAN</span>
                <span className="gbp-details__row-value" data-node-id="177:349">
                  {account.iban}
                </span>
                <span className="gbp-details__row-note" data-node-id="177:351">
                  Can receive GBP and{' '}
                  <span className="gbp-details__row-note-highlight">other currencies</span>
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn"
                onClick={() => handleCopy('IBAN', account.iban)}
                aria-label={copiedField === 'IBAN' ? 'Copied!' : 'Copy IBAN'}
                data-node-id="177:352"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'IBAN' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

            {/* Swift/BIC (177:353) */}
            <div className="gbp-details__row" data-node-id="177:353">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label" data-node-id="177:355">Swift/BIC</span>
                <span className="gbp-details__row-value" data-node-id="177:357">
                  {account.swiftBic}
                </span>
                <span className="gbp-details__row-note" data-node-id="177:359">
                  Only used for international Swift transfers
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn"
                onClick={() => handleCopy('SwiftBIC', account.swiftBic)}
                aria-label={copiedField === 'SwiftBIC' ? 'Copied!' : 'Copy Swift/BIC'}
                data-node-id="177:360"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'SwiftBIC' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

            {/* Bank name and address (177:361) */}
            <div className="gbp-details__row gbp-details__row--last" data-node-id="177:361">
              <div className="gbp-details__row-content">
                <span className="gbp-details__row-label" data-node-id="177:363">Bank name and address</span>
                <div className="gbp-details__row-value" data-node-id="177:365">
                  {account.bankAddress.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <span className="gbp-details__row-note" data-node-id="177:366">
                  Some senders may need this.{' '}
                  <button type="button" className="gbp-details__link">Learn more</button>
                </span>
              </div>
              <button
                type="button"
                className="gbp-details__copy-btn gbp-details__copy-btn--address"
                onClick={() => handleCopy('BankAddress', account.bankAddress.join('\n'))}
                aria-label={copiedField === 'BankAddress' ? 'Copied!' : 'Copy bank address'}
                data-node-id="177:367"
              >
                <img src={imgCopyIcon} alt="" draggable={false} />
                {copiedField === 'BankAddress' && <span className="gbp-details__copy-toast">Copied!</span>}
              </button>
            </div>

          </div>{/* /card */}

          {/* ── QUICK FACTS ── */}
          <div className="gbp-details__quick-facts">
            <h2 className="gbp-details__section-title">Quick facts</h2>

            <div className="gbp-details__tab-row">
              {['Fees', 'Speed', 'Limits'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`gbp-details__tab${activeTab === tab ? ' gbp-details__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="gbp-details__cost-label">What does it cost?</div>

            <div className="gbp-details__fees-card">
              {/* From the UK (domestic) */}
              <div className="gbp-details__fees-row">
                <div className="gbp-details__fees-col">
                  <span className="gbp-details__fees-type">From the UK (domestic)</span>
                  <span className="gbp-details__fees-amount">No fees</span>
                </div>
              </div>

              {/* From outside the UK (Swift) */}
              <div className="gbp-details__fees-row gbp-details__fees-row--swift">
                <div className="gbp-details__fees-col">
                  <span className="gbp-details__fees-type">From outside the UK (Swift)</span>
                  <span className="gbp-details__fees-amount">2.16 GBP Wise fee</span>
                  <span className="gbp-details__fees-note">Bank fees may also apply</span>
                </div>
                <img src={imgChevronRight} alt="" className="gbp-details__row-chevron" draggable={false} />
              </div>
            </div>
          </div>

          {/* ── AVAILABILITY ── */}
          <div className="gbp-details__availability">
            <h2 className="gbp-details__section-title">Availability</h2>
            <div className="gbp-details__feature-card">
              <img src={imgCheckGreen} alt="" className="gbp-details__feature-icon" draggable={false} />
              <div className="gbp-details__feature-text">
                <span className="gbp-details__feature-title">Direct Debits available</span>
                <span className="gbp-details__feature-desc">
                  Make regular payments. Works with<br />Amazon, PayPal, Stripe and more.
                </span>
              </div>
            </div>
          </div>

          {/* ── DOCUMENTS ── */}
          <div className="gbp-details__documents">
            <h2 className="gbp-details__section-title">Documents</h2>
            <button type="button" className="gbp-details__feature-card gbp-details__feature-card--clickable">
              <img src={imgDocumentIcon} alt="" className="gbp-details__feature-icon" draggable={false} />
              <div className="gbp-details__feature-text">
                <span className="gbp-details__feature-title">Proof of account ownership</span>
                <span className="gbp-details__feature-desc">
                  A certified document proving you<br />own your account
                </span>
              </div>
              <img src={imgChevronRight} alt="" className="gbp-details__row-chevron" draggable={false} />
            </button>
          </div>

          <div className="gbp-details__footer-link">
            Details not accepted?
          </div>

        </div>{/* /scroll-inner */}
      </div>{/* /scroll */}

    </div>
  )
}

export default GBPAccountDetailsScreen
