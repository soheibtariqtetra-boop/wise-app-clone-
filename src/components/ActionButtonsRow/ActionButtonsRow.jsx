import './ActionButtonsRow.css'

import imgQRIcon from '../../assets/home/account/qr-icon.png'
import imgDropdownIcon from '../../assets/home/shared/chevron-down.png'

function ActionButtonsRow() {
  return (
    <div className="action-row" role="group" aria-label="Quick actions">
      {/* Send */}
      <button className="action-row__btn-wrap action-row__btn--send-wrap" aria-label="Send money">
        <div className="action-row__btn-bg action-row__btn--send-bg" />
        <div className="action-row__btn-content action-row__btn--send-text">Send</div>
      </button>

      {/* Add money */}
      <button className="action-row__btn-wrap action-row__btn--add-wrap" aria-label="Add money to account">
        <div className="action-row__btn-bg action-row__btn--add-bg" />
        <div className="action-row__btn-content action-row__btn--add-text">Add money</div>
      </button>

      {/* Get paid */}
      <button className="action-row__btn-wrap action-row__btn--get-wrap" aria-label="Get paid options">
        <div className="action-row__btn-bg action-row__btn--get-bg" />
        <div className="action-row__btn-content action-row__btn--get-text">Get paid</div>
        <img src={imgDropdownIcon} alt="" aria-hidden="true" className="action-row__btn--get-chevron" draggable={false} />
      </button>

      {/* QR scan icon */}
      <button className="action-row__qr-wrap" aria-label="Scan QR code">
        <img src={imgQRIcon} alt="Scan QR" className="action-row__qr-icon" draggable={false} />
      </button>
    </div>
  )
}

export default ActionButtonsRow
