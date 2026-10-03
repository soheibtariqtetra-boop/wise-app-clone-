import React, { useState } from 'react'
import './ProfileInfoRow.css'

/**
 * Reusable Info Row with Copy button for ProfileScreen Part 3.
 * Used for:
 *   - Your membership number (Node 21:71)
 *   - Your app version (Node 21:65)
 */
function ProfileInfoRow({
  label,
  value,
  labelBold = false,
  labelColor = '#d2d4d0',
  valueSize = 14.625,
  valueColor = '#c3c6c1',
  copyBorder = false,
  height,
  dataNodeId,
  buttonDataNodeId,
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div
      className="profile-info-row"
      style={{ height: height ? `${height}px` : undefined }}
      data-node-id={dataNodeId}
    >
      <div className="profile-info-row__content">
        <span
          className={`profile-info-row__label ${labelBold ? 'profile-info-row__label--bold' : ''}`}
          style={{ color: labelColor }}
        >
          {label}
        </span>
        <span
          className="profile-info-row__value"
          style={{ fontSize: `${valueSize}px`, color: valueColor }}
        >
          {value}
        </span>
      </div>

      <button
        type="button"
        className={`profile-info-row__copy-btn ${copyBorder ? 'profile-info-row__copy-btn--bordered' : ''}`}
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        data-node-id={buttonDataNodeId}
      >
        <span className="profile-info-row__copy-text">
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>
    </div>
  )
}

export default ProfileInfoRow
