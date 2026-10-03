import React from 'react'
import './ProfileSettingsRow.css'
import imgDefaultChevron from '../../assets/profile/shared/chevron-right.png'

/**
 * Reusable Settings Row for ProfileScreen Part 2 (Figma ProfileScreen02).
 * Displays:
 *   - Left circular outlined icon
 *   - Center text column (title + optional multi-line description)
 *   - Right disclosure chevron
 */
function ProfileSettingsRow({
  icon,
  title,
  description,
  chevron = imgDefaultChevron,
  height,
  paddingTop,
  iconWidth = 52,
  iconHeight = 52,
  titleWidth,
  descWidth,
  titleBold = false,
  titleSize = 16.792,
  descSize = 14.625,
  titleColor = '#d0d2ce',
  descColor = '#c1c4bf',
  titleLineHeight = 'normal',
  descLineHeight = 'normal',
  chevronHeight = 13,
  chevronY = 30.875,
  isClipped = false,
  dataNodeId,
  onClick,
  ariaLabel,
  className = '',
}) {
  return (
    <button
      type="button"
      className={`profile-settings-row ${isClipped ? 'profile-settings-row--clipped' : ''} ${className}`}
      style={{
        height: height ? `${height}px` : undefined,
        paddingTop: paddingTop ? `${paddingTop}px` : undefined,
      }}
      onClick={onClick}
      aria-label={ariaLabel || (typeof title === 'string' ? title : undefined)}
      data-node-id={dataNodeId}
    >
      {/* ── Left Icon Container (Figma node RowIcon) ── */}
      <div
        className="profile-settings-row__icon-container"
        style={{
          width: `${iconWidth}px`,
          height: `${iconHeight}px`,
        }}
      >
        <img
          src={icon}
          alt=""
          className="profile-settings-row__icon"
          style={{
            width: `${iconWidth}px`,
            height: `${iconHeight}px`,
          }}
          draggable={false}
        />
      </div>

      {/* ── Center Text Column (Figma node RowTitle + RowDescription) ── */}
      <div className="profile-settings-row__text">
        <span
          className={`profile-settings-row__title ${titleBold ? 'profile-settings-row__title--bold' : ''}`}
          style={{
            maxWidth: titleWidth ? `${titleWidth}px` : undefined,
            fontSize: `${titleSize}px`,
            color: titleColor,
            lineHeight: titleLineHeight,
          }}
        >
          {title}
        </span>

        {description && (
          <span
            className="profile-settings-row__description"
            style={{
              maxWidth: descWidth ? `${descWidth}px` : undefined,
              fontSize: `${descSize}px`,
              color: descColor,
              lineHeight: descLineHeight,
            }}
          >
            {description}
          </span>
        )}
      </div>

      {/* ── Right Chevron (Figma node RowChevron) ── */}
      <div
        className="profile-settings-row__chevron-container"
        style={{
          top: `${chevronY}px`,
          height: `${chevronHeight}px`,
        }}
      >
        <img
          src={chevron}
          alt=""
          className="profile-settings-row__chevron"
          style={{
            height: `${chevronHeight}px`,
          }}
          draggable={false}
        />
      </div>
    </button>
  )
}

export default ProfileSettingsRow
