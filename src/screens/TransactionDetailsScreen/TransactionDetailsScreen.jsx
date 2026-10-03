import './TransactionDetailsScreen.css'

import imgClose  from '../../assets/transactions/shared/btn-close.png'
import imgHelp   from '../../assets/transactions/shared/btn-help.png'
import imgMore   from '../../assets/transactions/shared/btn-more.png'
import imgTxIcon from '../../assets/transactions/details/icon-tx-arrow-down.png'
import imgStatusIcon from '../../assets/transactions/details/icon-status-money-added.png'
import imgAmountDir  from '../../assets/transactions/details/icon-amount-direction.png'

/**
 * TransactionDetailsScreen — Figma: TransactionDetailsScreen01, Node 124:2
 * Frame: 390 × 844
 *
 * Receives a `transaction` object (from mockTransactions[n].detail) and
 * renders it exactly. Adding new transactions later only requires data
 * changes — this component is the ONE reusable details screen.
 *
 * Props:
 *   transaction — full transaction object (including .detail)
 *   onClose     — called when X is tapped; returns to previous screen
 */
function TransactionDetailsScreen({ transaction, onClose }) {
  const d = transaction?.detail || {}

  // Split the received date across two lines as Figma defines
  const dateParts = (d.receivedDate || '').split('\n')
  const dateLine1 = dateParts[0] || ''
  const dateLine2 = dateParts[1] || ''

  return (
    <div
      className="txdetails-screen"
      data-node-id="124:2"
      data-name="TransactionDetailsScreen01"
    >
      {/* ══ TRANSACTION SUMMARY PANEL (top 352.625px) ══ */}
      <div
        className="txdetails-summary"
        data-node-id="124:21"
        data-name="TransactionSummary"
      >
        {/* Summary Background — #292c27 */}
        <div className="txdetails-summary__bg" data-node-id="124:22" />

        {/* ── Action Buttons Row (y: 8.125 in summary) ── */}
        <div
          className="txdetails-summary__actions"
          data-node-id="124:30"
          data-name="SummaryActions"
        >
          {/* Close Button — x:17.333, y:24.917, size:43.333 */}
          <button
            type="button"
            className="txdetails-btn txdetails-btn--close"
            onClick={onClose}
            aria-label="Close transaction details"
            data-node-id="124:33"
          >
            <img src={imgClose} alt="" draggable={false} />
          </button>

          {/* Help Button — x:277.333 */}
          <button
            type="button"
            className="txdetails-btn txdetails-btn--help"
            aria-label="Help"
            data-node-id="124:32"
          >
            <img src={imgHelp} alt="" draggable={false} />
          </button>

          {/* More Button — x:329.333 */}
          <button
            type="button"
            className="txdetails-btn txdetails-btn--more"
            aria-label="More options"
            data-node-id="124:31"
          >
            <img src={imgMore} alt="" draggable={false} />
          </button>
        </div>

        {/* ── Transaction Icon (large circular ↓) — x:155.458, y:84.5, size:78.542 ── */}
        <div
          className="txdetails-summary__tx-icon"
          data-node-id="124:29"
          data-name="TransactionIcon"
        >
          <img src={imgTxIcon} alt="" draggable={false} />
        </div>

        {/* ── Amount direction indicator (+) — x:118.083, y:193.917, size:16.25 ── */}
        <div
          className="txdetails-summary__amount-direction"
          data-node-id="124:28"
          data-name="AmountDirectionIcon"
        >
          <img src={imgAmountDir} alt="" draggable={false} />
        </div>

        {/* ── Amount text — x:145.167, y:182.542, #bcdca8, bold 31.958px ── */}
        <div
          className="txdetails-summary__amount"
          data-node-id="124:35"
          data-name="Amount"
          style={{ color: d.detailAmountColor || '#bcdca8' }}
        >
          {/* The AmountDirectionIcon already shows '+'; strip it from text */}
          {(d.detailAmount || '').replace(/^\+\s*/, '')}
        </div>

        {/* ── Recipient Name — x:162.5, y:229.125, #c6c8c4, medium 15.167px ── */}
        <div
          className="txdetails-summary__recipient"
          data-node-id="124:34"
          data-name="RecipientName"
        >
          {d.recipient || ''}
        </div>

        {/* ── Status Pill — centered, y:275.167 ── */}
        <div
          className="txdetails-summary__status-container"
          data-node-id="124:23"
          data-name="StatusPillContainer"
        >
          <div className="txdetails-summary__status-pill" data-node-id="124:24">
            <div className="txdetails-summary__status-pill-bg" data-node-id="124:25" />
            <div className="txdetails-summary__status-icon" data-node-id="124:26">
              <img src={imgStatusIcon} alt="" draggable={false} />
            </div>
            <div className="txdetails-summary__status-label" data-node-id="124:27">
              {d.statusLabel || ''}
            </div>
          </div>
        </div>
      </div>

      {/* ══ TRANSACTION DETAILS PANEL (bottom 481px) ══ */}
      <div
        className="txdetails-details"
        data-node-id="124:4"
        data-name="TransactionDetails"
      >
        <div className="txdetails-details__bg" data-node-id="124:5" />

        {/* ── Section Title — x:17.875, y:44.958, #caccc8, semibold 22.75px ── */}
        <div
          className="txdetails-details__title"
          data-node-id="124:20"
          data-name="SectionTitle"
        >
          Transaction details
        </div>

        {/* ── Rows area ── */}
        <div className="txdetails-details__rows" data-node-id="124:6" data-name="DetailsRows">

          {/* Top section divider */}
          <div className="txdetails-divider txdetails-divider--top" data-node-id="124:19" />

          {/* You received row */}
          <div className="txdetails-row txdetails-row--received" data-node-id="124:16" data-name="ReceivedRow">
            <span className="txdetails-row__label" data-node-id="124:18">You received</span>
            <span className="txdetails-row__value txdetails-row__value--bold" data-node-id="124:17">
              {d.receivedValue || ''}
            </span>
          </div>

          {/* Rows divider */}
          <div className="txdetails-divider txdetails-divider--rows" data-node-id="124:15" />

          {/* Groups: Received Date + Reference + Transaction Number */}
          <div className="txdetails-groups" data-node-id="124:7" data-name="Groups">

            {/* Received on */}
            <div className="txdetails-row txdetails-row--received-date" data-node-id="124:37" data-name="ReceivedDateRow">
              <span className="txdetails-row__label" data-node-id="124:14">Received on</span>
              <div className="txdetails-row__date-value" data-node-id="124:13-12">
                <span className="txdetails-row__date-line" data-node-id="124:13">{dateLine1}</span>
                <span className="txdetails-row__date-line" data-node-id="124:12">{dateLine2}</span>
              </div>
            </div>

            {/* Reference */}
            <div className="txdetails-row txdetails-row--reference" data-node-id="124:38" data-name="ReferenceRow">
              <span className="txdetails-row__label txdetails-row__label--ref" data-node-id="124:11">Reference</span>
              <span className="txdetails-row__value" data-node-id="124:10">
                {d.reference || ''}
              </span>
            </div>

            {/* Transaction number */}
            <div className="txdetails-row txdetails-row--txnumber" data-node-id="124:39" data-name="TransactionNumberRow">
              <span className="txdetails-row__label" data-node-id="124:9">Transaction number</span>
              <span className="txdetails-row__value txdetails-row__value--txnumber" data-node-id="124:8">
                {d.transactionNumber || ''}
              </span>
            </div>

          </div>{/* /Groups */}
        </div>{/* /DetailsRows */}
      </div>{/* /TransactionDetails panel */}
    </div>
  )
}

export default TransactionDetailsScreen
