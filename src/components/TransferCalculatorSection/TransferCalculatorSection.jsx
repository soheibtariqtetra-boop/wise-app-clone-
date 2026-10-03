import './TransferCalculatorSection.css'

import imgRateLineArtwork from '../../assets/home/calculator/calc-rate-line-expanded.png'
import imgCurrentRateIndicator from '../../assets/home/calculator/calc-current-rate-indicator.png'
import imgGbpFlag from '../../assets/home/shared/flag-gbp.png'
import imgGbpDropdownChevron from '../../assets/home/calculator/chevron-dropdown-gbp.png'
import imgCurrencyConnector from '../../assets/home/calculator/currency-connector.png'
import imgCurrencySwapButton from '../../assets/home/calculator/currency-swap-button.png'
import imgCurrencySwapIcon from '../../assets/home/calculator/swap-icon.png'
import imgZarFlag from '../../assets/home/calculator/flag-zar.png'
import imgZarDropdownChevron from '../../assets/home/calculator/chevron-dropdown-zar.png'
import imgDetailsDivider from '../../assets/home/calculator/details-divider.png'
import imgFeeInfoIcon from '../../assets/home/calculator/fee-info-icon.png'
import imgBellIcon from '../../assets/home/calculator/bell-icon.png'
import imgUpdatesChevron from '../../assets/home/calculator/updates-chevron.png'

function TransferCalculatorSection() {
  return (
    <div className="transfer-calc-section">
      {/* ── Calculator & Chart Region (Figma node 80:2078) ─── */}
      <div className="transfer-calc-card-container">
        {/* ── Rate Chart Card (Figma node 80:2108) ─── */}
        <div className="rate-chart-card">
          {/* Y-axis value labels */}
          <div className="rate-chart-card__val-label rate-chart-card__val-label--22">22.0</div>
          <div className="rate-chart-card__val-label rate-chart-card__val-label--21-8">21.8</div>
          <div className="rate-chart-card__val-label rate-chart-card__val-label--21-5">21.5</div>

          {/* Date labels */}
          <div className="rate-chart-card__date-label rate-chart-card__date-label--aug">Aug 29</div>
          <div className="rate-chart-card__date-label rate-chart-card__date-label--today">Today</div>

          {/* Green rate line */}
          <img src={imgRateLineArtwork} className="rate-chart-card__line-artwork" draggable={false} alt="" />

          {/* Current rate dot/indicator */}
          <img src={imgCurrentRateIndicator} className="rate-chart-card__rate-indicator" draggable={false} alt="" />
        </div>

        {/* ── Transfer Calculator Card (Figma node 80:2079) ─── */}
        <div className="calc-card">
          <div className="calc-card__bg" />

          {/* ── Exchange Rate Text (Figma node 80:2107) ─── */}
          <div className="calc-card__rate-text">1GBP=21.7338 ZAR</div>

          {/* ── Currency Converter (Figma node 84:2) ─── */}
          <div className="currency-converter">

            {/* Source Row — GBP (Figma node 80:2102) */}
            <div className="currency-row currency-row--source">
              <div className="currency-row__bg currency-row__bg--source" />
              <div className="currency-row__amount">3</div>
              <img src={imgGbpFlag} className="currency-row__flag currency-row__flag--source" draggable={false} alt="GBP" />
              <span className="currency-row__code currency-row__code--gbp">GBP</span>
              <img src={imgGbpDropdownChevron} className="currency-row__chevron currency-row__chevron--source" draggable={false} alt="" />
            </div>

            {/* Swap control */}
            <div className="currency-swap">
              <img src={imgCurrencyConnector} className="currency-swap__connector" draggable={false} alt="" />
              <img src={imgCurrencySwapButton} className="currency-swap__button" draggable={false} alt="" />
              <img src={imgCurrencySwapIcon} className="currency-swap__icon" draggable={false} alt="" />
            </div>

            {/* Target Row — ZAR (Figma node 80:2092) */}
            <div className="currency-row currency-row--target">
              <div className="currency-row__bg currency-row__bg--target" />
              <div className="currency-row__amount currency-row__amount--target">14.7</div>
              <img src={imgZarFlag} className="currency-row__flag currency-row__flag--target" draggable={false} alt="ZAR" />
              <span className="currency-row__code currency-row__code--zar">ZAR</span>
              <img src={imgZarDropdownChevron} className="currency-row__chevron currency-row__chevron--target" draggable={false} alt="" />
            </div>
          </div>

          {/* ── Transfer Details (Figma node 80:2084) ─── */}
          <div className="transfer-details">
            <div className="transfer-details__bg" />
            <img src={imgDetailsDivider} className="transfer-details__divider" draggable={false} alt="" />
            
            {/* Left: Fees */}
            <span className="transfer-details__label transfer-details__label--fee">Includes fees</span>
            <img src={imgFeeInfoIcon} className="transfer-details__fee-icon" draggable={false} alt="" />
            <span className="transfer-details__value transfer-details__value--fee">2.34 GBP</span>

            {/* Right: Arrival */}
            <span className="transfer-details__label transfer-details__label--arrival">Should arrive</span>
            <span className="transfer-details__value transfer-details__value--arrival">By Wednesday</span>
          </div>

          {/* ── Send Button (Figma node 80:2081) ─── */}
          <div className="calc-send-button">
            <div className="calc-send-button__bg" />
            <span className="calc-send-button__label">Send</span>
          </div>

        </div>{/* end calc-card */}
      </div>{/* end transfer-calc-card-container */}

      {/* ── Get Exchange Rate Updates (Figma node 84:3) ──────────────────── */}
      <div className="exchange-rate-updates">
        <img src={imgBellIcon} className="exchange-rate-updates__icon" draggable={false} alt="" />
        <span className="exchange-rate-updates__label">Get exchange rate updates</span>
        <img src={imgUpdatesChevron} className="exchange-rate-updates__chevron" draggable={false} alt="" />
      </div>

    </div>
  )
}

export default TransferCalculatorSection
