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
 * Incoming-transfer details layout aligned to Wise reference proportions.
 * Demo/simulated flags stay in transaction data; status pill shows Wise UI labels.
 */
function TransactionDetailsScreen({ transaction, onClose }) {
  if (!transaction) return null;

  const isIncoming = (transaction.amount || '').startsWith('+');
  const amountText = (transaction.amount || '').replace(/^\+\s*/, '');
  const amountColor = transaction.amountColor || '#F3F5F1';
  const recipient = transaction.title || '';

  const dObj = new Date(transaction.dateStr || '2026-10-01T12:00:00Z');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNum = dObj.getUTCDate();
  const monthName = monthNames[dObj.getUTCMonth()];
  const yearNum = dObj.getUTCFullYear();
  const hour24 = String(dObj.getUTCHours()).padStart(2, '0');
  const minuteStr = String(dObj.getUTCMinutes()).padStart(2, '0');
  // Display-only 24-hour format: "10 November 2026 at 15:49" (no AM/PM).
  const receivedOnDisplay = `${dayNum} ${monthName} ${yearNum} at ${hour24}:${minuteStr}`;

  let typeVerb = 'You sent';
  if (isIncoming) typeVerb = 'You received';
  if (transaction.listIconKey === 'plus') typeVerb = 'You added';

  // Pill labels match Wise reference UI; demoStatus stays in data only.
  let statusLabel = 'Money sent';
  if (isIncoming || transaction.listIconKey === 'plus') statusLabel = 'Money added';

  const txIcon = ICON_MAP[transaction.listIconKey] || imgIconDown;
  const showReference =
    Boolean(transaction.reference)
    && transaction.reference !== 'DEMO'
    && !transaction.isSimulated;
  const showTransactionNumber = Boolean(transaction.transactionNumber);

  return (
    <div
      className="txdetails-screen"
      data-node-id="124:2"
      data-name="TransactionDetailsScreen01"
    >
      <header className="txdetails-summary" data-node-id="124:21">
        <div className="txdetails-summary__actions" data-node-id="124:30">
          <button
            type="button"
            className="txdetails-btn txdetails-btn--close"
            onClick={onClose}
            aria-label="Close transaction details"
            data-node-id="124:33"
          >
            <img src={imgClose} alt="" draggable={false} />
          </button>

          <div className="txdetails-summary__actions-right">
            <button
              type="button"
              className="txdetails-btn txdetails-btn--help"
              aria-label="Help"
              data-node-id="124:32"
            >
              <img src={imgHelp} alt="" draggable={false} />
            </button>
            <button
              type="button"
              className="txdetails-btn txdetails-btn--more"
              aria-label="More options"
              data-node-id="124:31"
            >
              <img src={imgMore} alt="" draggable={false} />
            </button>
          </div>
        </div>

        <div className="txdetails-summary__body">
          <div
            className="txdetails-summary__tx-icon"
            data-node-id="124:29"
            data-name="TransactionIcon"
          >
            <img src={txIcon} alt="" draggable={false} />
          </div>

          <div className="txdetails-summary__amount-row" data-name="AmountRow">
            {isIncoming && (
              <div
                className="txdetails-summary__amount-direction"
                data-node-id="124:28"
                aria-hidden="true"
              >
                <img src={imgAmountDir} alt="" draggable={false} />
              </div>
            )}
            <div
              className="txdetails-summary__amount"
              data-node-id="124:35"
              style={{ color: amountColor }}
            >
              {amountText}
            </div>
          </div>

          <div
            className="txdetails-summary__recipient"
            data-node-id="124:34"
          >
            {recipient}
          </div>

          <div
            className="txdetails-summary__status-container"
            data-node-id="124:23"
          >
            <div className="txdetails-summary__status-pill" data-node-id="124:24">
              <div className="txdetails-summary__status-icon" data-node-id="124:26">
                <img src={imgStatusIcon} alt="" draggable={false} />
              </div>
              <div className="txdetails-summary__status-label" data-node-id="124:27">
                {statusLabel}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="txdetails-details" data-node-id="124:4">
        <h2 className="txdetails-details__title" data-node-id="124:20">
          Transaction details
        </h2>

        <div className="txdetails-details__rows" data-node-id="124:6">
          <div className="txdetails-divider" data-node-id="124:19" />

          <div className="txdetails-row txdetails-row--received" data-node-id="124:16">
            <span className="txdetails-row__label" data-node-id="124:18">{typeVerb}</span>
            <span className="txdetails-row__value txdetails-row__value--bold" data-node-id="124:17">
              {amountText}
            </span>
          </div>

          <div className="txdetails-divider" data-node-id="124:15" />

          <div className="txdetails-groups" data-node-id="124:7">
            <div className="txdetails-row txdetails-row--received-date" data-node-id="124:37">
              <span className="txdetails-row__label" data-node-id="124:14">Received on</span>
              <span className="txdetails-row__value txdetails-row__value--received-on" data-node-id="124:13">
                {receivedOnDisplay}
              </span>
            </div>

            {showReference && (
              <div className="txdetails-row txdetails-row--reference" data-node-id="124:38">
                <span className="txdetails-row__label" data-node-id="124:11">Reference</span>
                <span className="txdetails-row__value" data-node-id="124:10">
                  {transaction.reference}
                </span>
              </div>
            )}

            {showTransactionNumber && (
              <div className="txdetails-row txdetails-row--txnumber" data-node-id="124:39">
                <span className="txdetails-row__label" data-node-id="124:9">Transaction number</span>
                <span className="txdetails-row__value txdetails-row__value--txnumber" data-node-id="124:8">
                  {transaction.transactionNumber}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TransactionDetailsScreen
