import { useState } from 'react'
import './AccountDetailsEURScreen.css'

import { mockEurAccount } from '../../data/mockData'

/* ── Local assets (extracted from Figma node 31:344) ── */
import imgBackButton from '../../assets/accounts/eur/btn-back-details.png'
import imgCountryFlag from '../../assets/accounts/eur/flag-eur.png'
import imgCopyIcon    from '../../assets/accounts/eur/icon-copy.png'
import imgChevronRightSmall from '../../assets/accounts/eur/icon-chevron-right-small.png'
import imgDocumentIcon      from '../../assets/accounts/eur/icon-document.png'
import imgCheckGreen        from '../../assets/accounts/eur/icon-check-green.png'

/**
 * AccountDetailsEURScreen03 — Figma node 31:344
 * Viewport: 390 × 844
 *
 * Props:
 *   onBack  — returns to EUR Account Balance screen
 *   account — optional data override, defaults to mockEurAccount
 */
function AccountDetailsEURScreen({ onBack, account = mockEurAccount }) {
  const [copiedField, setCopiedField] = useState(null)

  const handleCopy = (fieldLabel, value) => {
    navigator.clipboard?.writeText(value)
    setCopiedField(fieldLabel)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div
      className="eur-details-screen"
      data-node-id="31:344"
      data-name="AccountDetailsEURScreen03"
    >
      {/* ══ TOP HEADER (31:392) ══ */}
      <header className="eur-details-screen__header" data-node-id="31:392">
        <button
          type="button"
          className="eur-details-screen__back-btn"
          onClick={onBack}
          aria-label="Back to Account Balance"
          data-node-id="31:396"
        >
          <img src={imgBackButton} alt="" draggable={false} />
        </button>

        <div className="eur-details-screen__header-titles">
          <span className="eur-details-screen__header-currency" data-node-id="31:395">
            {account.currency}
          </span>
          <span className="eur-details-screen__header-subtitle" data-node-id="31:394">
            Account details
          </span>
        </div>

        <img
          src={imgCountryFlag}
          className="eur-details-screen__flag"
          alt="EUR flag"
          draggable={false}
          data-node-id="31:393"
        />
      </header>

      {/* ══ SCROLL VIEWPORT ══ */}
      <div className="eur-details-screen__scroll" data-node-id="31:347">
        <div className="eur-details-screen__scroll-inner">

          {/* ── RECEIVE HEADER (31:385) ── */}
          <div className="eur-details-screen__receive-header" data-node-id="31:385">
            <div className="eur-details-screen__receive-titles">
              <h1 className="eur-details-screen__receive-title" data-node-id="31:391">
                Receive {account.currency}
              </h1>
              <div className="eur-details-screen__receive-subtitle" data-node-id="31:390">
                From SEPA and{' '}
                <span className="eur-details-screen__receive-highlight" data-node-id="31:389">
                  100+ countries
                </span>
              </div>
            </div>

            <button
              type="button"
              className="eur-details-screen__share-btn"
              aria-label="Share account details"
              data-node-id="31:386"
            >
              Share
            </button>
          </div>

          {/* ── ACCOUNT INFO CARD (31:365) ── */}
          <div className="eur-details-screen__info-card" data-node-id="31:365">

            {/* Name */}
            <div className="eur-details-screen__info-row">
              <div className="eur-details-screen__info-header-row">
                <span className="eur-details-screen__info-label" data-node-id="31:384">
                  Name
                </span>
                <button
                  type="button"
                  className="eur-details-screen__copy-btn"
                  onClick={() => handleCopy('Name', account.accountName)}
                  aria-label="Copy Name"
                  data-node-id="31:370"
                >
                  <img src={imgCopyIcon} className="eur-details-screen__copy-icon" alt="" draggable={false} />
                </button>
              </div>
              <div className="eur-details-screen__info-value" data-node-id="31:383">
                {account.accountName}
              </div>
            </div>

            {/* IBAN */}
            <div className="eur-details-screen__info-row">
              <div className="eur-details-screen__info-header-row">
                <span className="eur-details-screen__info-label" data-node-id="31:382">
                  IBAN
                </span>
                <button
                  type="button"
                  className="eur-details-screen__copy-btn"
                  onClick={() => handleCopy('IBAN', account.iban)}
                  aria-label="Copy IBAN"
                  data-node-id="31:369"
                >
                  <img src={imgCopyIcon} className="eur-details-screen__copy-icon" alt="" draggable={false} />
                </button>
              </div>
              <div className="eur-details-screen__info-value eur-details-screen__info-value--bold" data-node-id="31:381">
                {account.iban}
              </div>
              <div className="eur-details-screen__info-note" data-node-id="31:380">
                Can receive EUR and other currencies.{' '}
                <button type="button" className="eur-details-screen__link" data-node-id="31:378">
                  How it works
                </button>
              </div>
            </div>

            {/* Swift/BIC */}
            <div className="eur-details-screen__info-row">
              <div className="eur-details-screen__info-header-row">
                <span className="eur-details-screen__info-label" data-node-id="31:377">
                  Swift/BIC
                </span>
                <button
                  type="button"
                  className="eur-details-screen__copy-btn"
                  onClick={() => handleCopy('Swift/BIC', account.swiftBic)}
                  aria-label="Copy Swift/BIC"
                  data-node-id="31:368"
                >
                  <img src={imgCopyIcon} className="eur-details-screen__copy-icon" alt="" draggable={false} />
                </button>
              </div>
              <div className="eur-details-screen__info-value eur-details-screen__info-value--bold" data-node-id="31:376">
                {account.swiftBic}
              </div>
              <div className="eur-details-screen__info-note" data-node-id="31:375">
                Only used for international Swift transfers
              </div>
            </div>

            {/* Bank name and address */}
            <div className="eur-details-screen__info-row">
              <div className="eur-details-screen__info-header-row">
                <span className="eur-details-screen__info-label" data-node-id="31:374">
                  Bank name and address
                </span>
                <button
                  type="button"
                  className="eur-details-screen__copy-btn"
                  onClick={() => handleCopy('Bank Address', account.bankAddressLines.join(' '))}
                  aria-label="Copy Bank name and address"
                  data-node-id="31:367"
                >
                  <img src={imgCopyIcon} className="eur-details-screen__copy-icon" alt="" draggable={false} />
                </button>
              </div>
              <div className="eur-details-screen__info-value" data-node-id="31:373">
                {account.bankAddressLines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
              <div className="eur-details-screen__info-note" data-node-id="31:372">
                Some senders may need this.{' '}
                <button type="button" className="eur-details-screen__link" data-node-id="31:371">
                  Learn more
                </button>
              </div>
            </div>

          </div>

          {/* ── QUICK FACTS SECTION ── */}
          <div className="eur-details-screen__quick-facts" data-node-id="140:2">
            <h2 className="eur-details-screen__section-title" data-node-id="24:234">
              Quick facts
            </h2>

            <div className="eur-details-screen__tab-list" data-node-id="24:223">
              <button
                type="button"
                className="eur-details-screen__fact-tab eur-details-screen__fact-tab--fees"
                data-node-id="24:231"
              >
                Fees
              </button>
              <button
                type="button"
                className="eur-details-screen__fact-tab eur-details-screen__fact-tab--speed"
                data-node-id="24:228"
              >
                Speed
              </button>
              <button
                type="button"
                className="eur-details-screen__fact-tab eur-details-screen__fact-tab--limits"
                data-node-id="24:225"
              >
                Limits
              </button>
            </div>

            <div className="eur-details-screen__cost-label" data-node-id="24:222">
              What does it cost?
            </div>

            <div className="eur-details-screen__fees-card" data-node-id="24:214">
              <div className="eur-details-screen__fees-row">
                <div className="eur-details-screen__fees-col">
                  <span className="eur-details-screen__fees-type" data-node-id="24:221">From SEPA (domestic)</span>
                  <span className="eur-details-screen__fees-amount" data-node-id="24:220">No fees</span>
                </div>
              </div>

              <div className="eur-details-screen__fees-row eur-details-screen__fees-row--swift">
                <div className="eur-details-screen__fees-col">
                  <span className="eur-details-screen__fees-type" data-node-id="24:219">From outside SEPA (Swift)</span>
                  <span className="eur-details-screen__fees-amount" data-node-id="24:218">2.39 EUR Wise fee</span>
                  <span className="eur-details-screen__fees-note" data-node-id="24:217">Bank fees may also apply</span>
                </div>
                <img src={imgChevronRightSmall} alt="" className="eur-details-screen__chevron" draggable={false} data-node-id="24:216" />
              </div>
            </div>
          </div>

          {/* ── AVAILABILITY SECTION ── */}
          <div className="eur-details-screen__availability-section" data-node-id="24:198">
            <h2 className="eur-details-screen__section-title" data-node-id="24:213">
              Availability
            </h2>
            <div className="eur-details-screen__feature-card" data-node-id="24:208">
              <img src={imgCheckGreen} alt="" className="eur-details-screen__feature-icon" draggable={false} data-node-id="24:210" />
              <div className="eur-details-screen__feature-text-col">
                <span className="eur-details-screen__feature-title" data-node-id="24:212">SEPA Direct Debits available</span>
                <span className="eur-details-screen__feature-desc" data-node-id="24:211">
                  Make regular payments. Works with<br/>Amazon, PayPal, Stripe and more.
                </span>
              </div>
            </div>
          </div>

          {/* ── DOCUMENTS SECTION ── */}
          <div className="eur-details-screen__documents-section" data-node-id="24:199">
            <h2 className="eur-details-screen__section-title" data-node-id="24:207">
              Documents
            </h2>
            <button type="button" className="eur-details-screen__feature-card eur-details-screen__feature-card--clickable" data-node-id="24:201">
              <img src={imgDocumentIcon} alt="" className="eur-details-screen__feature-icon" draggable={false} data-node-id="24:204" />
              <div className="eur-details-screen__feature-text-col">
                <span className="eur-details-screen__feature-title" data-node-id="24:206">Proof of account ownership</span>
                <span className="eur-details-screen__feature-desc" data-node-id="24:205">
                  A certified document proving you<br/>own your account
                </span>
              </div>
              <img src={imgChevronRightSmall} alt="" className="eur-details-screen__chevron" draggable={false} data-node-id="24:203" />
            </button>
          </div>

          <div className="eur-details-screen__footer-link" data-node-id="24:200">
            Details not accepted?
          </div>

        </div>{/* /scroll-inner */}
      </div>{/* /scroll */}
    </div>
  )
}

export default AccountDetailsEURScreen
