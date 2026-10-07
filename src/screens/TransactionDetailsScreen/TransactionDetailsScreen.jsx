import './TransactionDetailsScreen.css'

import imgClose  from '../../assets/transactions/shared/btn-close.png'
import imgHelp   from '../../assets/transactions/shared/btn-help.png'
import imgMore   from '../../assets/transactions/shared/btn-more.png'
import imgStatusIcon from '../../assets/transactions/details/icon-status-money-added.png'
import imgAmountDir  from '../../assets/transactions/details/icon-amount-direction.png'

import imgIconDown from '../../assets/home/transactions/tx-down.png'
import imgIconUp from '../../assets/home/transactions/tx-up.png'
import imgIconPlus from '../../assets/home/transactions/tx-plus.png'
import imgIconFacebook from '../../assets/home/transactions/tx-facebook.png'
import imgIconHostinger from '../../assets/home/transactions/tx-hostinger.png'
import imgIconShopify from '../../assets/home/transactions/tx-shopify.png'

const ICON_MAP = {
  down: imgIconDown,
  up:   imgIconUp,
  plus: imgIconPlus,
  facebook: imgIconFacebook,
  hostinger: imgIconHostinger,
  shopify: imgIconShopify,
  'eur-down': imgIconDown,
}

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
  if (!transaction) return null;

  const isIncoming = (transaction.amount || '').startsWith('+');
  const amountText = (transaction.amount || '').replace(/^\+\s*/, '');
  const amountColor = transaction.amountColor || '#F3F5F1';
  const recipient = transaction.title || '';

  const dObj = new Date(transaction.dateStr || '2026-10-01T12:00:00Z');
  const dateFormatted = dObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const timeFormatted = dObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const dateLine1 = `${dateFormatted} at`;
  const dateLine2 = timeFormatted;

  let typeVerb = 'You sent';
  if (isIncoming) typeVerb = 'You received';
  if (transaction.listIconKey === 'plus') typeVerb = 'You added';

  let statusLabel = 'Money sent';
  if (isIncoming) statusLabel = 'Money received';
  if (transaction.listIconKey === 'plus') statusLabel = 'Money added';
  if (transaction.subtitle) statusLabel = transaction.subtitle;

  const txIcon = ICON_MAP[transaction.listIconKey] || imgIconDown;


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
          <img src={txIcon} alt="" draggable={false} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>

        {/* ── Amount Row ── */}
        <div className="txdetails-summary__amount-row" data-name="AmountRow">
          {isIncoming && (
            <div
              className="txdetails-summary__amount-direction"
              data-node-id="124:28"
              data-name="AmountDirectionIcon"
            >
              <img src={imgAmountDir} alt="" draggable={false} />
            </div>
          )}
          <div
            className="txdetails-summary__amount"
            data-node-id="124:35"
            data-name="Amount"
            style={{ color: amountColor }}
          >
            {amountText}
          </div>
        </div>

        {/* ── Recipient Name — x:162.5, y:229.125, #c6c8c4, medium 15.167px ── */}
        <div
          className="txdetails-summary__recipient"
          data-node-id="124:34"
          data-name="RecipientName"
        >
          {recipient}
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
              {statusLabel}
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
            <span className="txdetails-row__label" data-node-id="124:18">{typeVerb}</span>
            <span className="txdetails-row__value txdetails-row__value--bold" data-node-id="124:17">
              {amountText}
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
            {transaction.reference && (
              <div className="txdetails-row txdetails-row--reference" data-node-id="124:38" data-name="ReferenceRow">
                <span className="txdetails-row__label txdetails-row__label--ref" data-node-id="124:11">Reference</span>
                <span className="txdetails-row__value" data-node-id="124:10">
                  {transaction.reference}
                </span>
              </div>
            )}

            {/* Transaction number */}
            <div className="txdetails-row txdetails-row--txnumber" data-node-id="124:39" data-name="TransactionNumberRow">
              <span className="txdetails-row__label" data-node-id="124:9">Transaction number</span>
              <span className="txdetails-row__value txdetails-row__value--txnumber" data-node-id="124:8">
                {transaction.transactionNumber || ''}
              </span>
            </div>

          </div>{/* /Groups */}
        </div>{/* /DetailsRows */}
      </div>{/* /TransactionDetails panel */}
    </div>
  )
}

export default TransactionDetailsScreen
