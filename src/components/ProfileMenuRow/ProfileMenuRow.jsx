import React from 'react'
import './ProfileMenuRow.css'
import imgChevron from '../../assets/profile/account/chevron-right.png'

function ProfileMenuRow({
  icon,
  label,
  subtitle,
  onClick,
  ariaLabel,
  className = '',
  dataNodeId,
}) {
  const hasSubtitle = Boolean(subtitle)

  return (
    <button
      type="button"
      className={`profile-menu-row ${hasSubtitle ? 'profile-menu-row--with-subtitle' : ''} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      data-node-id={dataNodeId}
    >
      {/* Icon */}
      <div className="profile-menu-row__icon-container">
        <img
          src={icon}
          alt=""
          className="profile-menu-row__icon"
          draggable={false}
        />
      </div>

      {/* Text block */}
      <div className="profile-menu-row__text">
        <span className="profile-menu-row__label">{label}</span>
        {hasSubtitle && (
          <span className="profile-menu-row__subtitle">{subtitle}</span>
        )}
      </div>

      {/* Right chevron */}
      <img
        src={imgChevron}
        alt=""
        className="profile-menu-row__chevron"
        draggable={false}
      />
    </button>
  )
}

export default ProfileMenuRow
