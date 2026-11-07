/**
 * Transaction display-date helpers.
 * Weekday / month / day are derived from dateStr in a fixed timezone
 * so labels cannot drift from the calendar date.
 */

export const TRANSACTION_DATE_TIMEZONE = 'UTC'

/** e.g. "Saturday, November 07" */
export function formatTransactionDateLabel(
  dateStr,
  timeZone = TRANSACTION_DATE_TIMEZONE,
) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return ''

  const weekday = d.toLocaleDateString('en-US', { weekday: 'long', timeZone })
  const month = d.toLocaleDateString('en-US', { month: 'long', timeZone })
  const day = d.toLocaleDateString('en-US', { day: '2-digit', timeZone })
  return `${weekday}, ${month} ${day}`
}

/** e.g. "Saturday, November 07 at 12:11 PM" — time label is preserved as provided */
export function formatTimelineTimestamp(
  dateStr,
  timeLabel,
  timeZone = TRANSACTION_DATE_TIMEZONE,
) {
  return `${formatTransactionDateLabel(dateStr, timeZone)} at ${timeLabel}`
}

/**
 * Overwrite date / dateGroup / timeline weekday labels from dateStr.
 * Does not change dateStr or the clock times passed in.
 */
export function applyDerivedDateLabels(
  tx,
  { setupTime, paidTime, timestampTime } = {},
) {
  if (!tx?.dateStr) return tx

  const label = formatTransactionDateLabel(tx.dateStr)
  tx.date = label
  tx.dateGroup = label

  if (setupTime) {
    const setupStamp = formatTimelineTimestamp(tx.dateStr, setupTime)
    tx.timelineSetupTimestamp = setupStamp
    tx.timelineTimestamp = formatTimelineTimestamp(
      tx.dateStr,
      timestampTime || setupTime,
    )
  }

  if (paidTime) {
    tx.timelinePaidTimestamp = formatTimelineTimestamp(tx.dateStr, paidTime)
  }

  return tx
}
