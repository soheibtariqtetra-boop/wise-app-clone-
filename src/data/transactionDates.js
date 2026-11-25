/**
 * Transaction display-date helpers.
 * Timeline clock labels use 12-hour time with a leading zero hour
 * and uppercase AM/PM (e.g. "Tuesday, November 24 at 07:35 AM").
 *
 * Source clocks stay in their original zone (CET / GMT / BST).
 * Undocumented event times stay date-only — never invent clocks.
 */

export const TRANSACTION_DATE_TIMEZONE = 'UTC'

/** CET/CEST wall-clock zone used for November CET source stamps. */
export const TIMELINE_CET_TIMEZONE = 'Europe/Berlin'

/**
 * 12-hour clock with leading zero hour and uppercase AM/PM.
 * @example formatTimelineClockTime(7, 35) → "07:35 AM"
 * @example formatTimelineClockTime(0, 5) → "12:05 AM"
 * @example formatTimelineClockTime(12, 0) → "12:00 PM"
 */
export function formatTimelineClockTime(hours24, minutes) {
  const h = Number(hours24)
  const m = Number(minutes)
  if (!Number.isFinite(h) || !Number.isFinite(m)) return ''

  const period = h >= 12 ? 'PM' : 'AM'
  let hour12 = h % 12
  if (hour12 === 0) hour12 = 12

  return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`
}

/**
 * Normalize a free-form clock label to the required timeline format.
 * Accepts "7:35 AM", "07:35 AM", "7:35 am", or 24-hour "17:25".
 * Returns '' when the label has no usable clock.
 */
export function normalizeTimelineClockLabel(timeLabel) {
  if (timeLabel == null) return ''
  const raw = String(timeLabel).trim()
  if (!raw) return ''

  const ampm = raw.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (ampm) {
    let hour12 = Number(ampm[1])
    const minutes = Number(ampm[2])
    const period = ampm[3].toUpperCase()
    if (hour12 < 1 || hour12 > 12 || minutes > 59) return ''
    // Convert to 24h then back so 12 AM / 12 PM stay correct.
    let hours24 = hour12 % 12
    if (period === 'PM') hours24 += 12
    return formatTimelineClockTime(hours24, minutes)
  }

  const h24 = raw.match(/^(\d{1,2}):(\d{2})$/)
  if (h24) {
    const hours24 = Number(h24[1])
    const minutes = Number(h24[2])
    if (hours24 > 23 || minutes > 59) return ''
    return formatTimelineClockTime(hours24, minutes)
  }

  return ''
}

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

/**
 * Full timeline stamp: "Tuesday, November 24 at 07:35 AM"
 * When timeLabel is missing/empty, returns the date-only label.
 */
export function formatTimelineTimestamp(
  dateStr,
  timeLabel,
  timeZone = TRANSACTION_DATE_TIMEZONE,
) {
  const datePart = formatTransactionDateLabel(dateStr, timeZone)
  if (!datePart) return ''

  const clock = normalizeTimelineClockLabel(timeLabel)
  if (!clock) return datePart
  return `${datePart} at ${clock}`
}

/**
 * Parse Wise confirmation source stamps such as:
 *   "November 24, 2026 07:35:21 CET"
 *   "November 24, 2026 10:28:50 GMT"
 * Date-only stamps ("November 24, 2026") yield { hasClock: false }.
 * Preserves the printed wall-clock (no zone conversion).
 */
export function parseTransferSourceTimestamp(source) {
  if (!source || typeof source !== 'string') {
    return { hasClock: false, hours24: null, minutes: null, zone: null }
  }

  const withClock = source.trim().match(
    /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*([A-Z]{2,5})?$/i,
  )
  if (withClock) {
    return {
      hasClock: true,
      monthName: withClock[1],
      day: Number(withClock[2]),
      year: Number(withClock[3]),
      hours24: Number(withClock[4]),
      minutes: Number(withClock[5]),
      zone: withClock[6] ? withClock[6].toUpperCase() : null,
    }
  }

  const dateOnly = source.trim().match(
    /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/i,
  )
  if (dateOnly) {
    return {
      hasClock: false,
      monthName: dateOnly[1],
      day: Number(dateOnly[2]),
      year: Number(dateOnly[3]),
      hours24: null,
      minutes: null,
      zone: null,
    }
  }

  return { hasClock: false, hours24: null, minutes: null, zone: null }
}

/**
 * Format one timeline event from a verified source stamp + dateStr.
 * Undocumented clocks → date-only label.
 */
export function formatTimelineEventFromSource(
  dateStr,
  sourceStamp,
  timeZone = TIMELINE_CET_TIMEZONE,
) {
  const parsed = parseTransferSourceTimestamp(sourceStamp)
  if (!parsed.hasClock) {
    return formatTransactionDateLabel(dateStr, timeZone)
  }
  return formatTimelineTimestamp(
    dateStr,
    formatTimelineClockTime(parsed.hours24, parsed.minutes),
    timeZone,
  )
}

/**
 * Resolve the four TransferDetails timeline labels.
 * Only events with a verified clock get "at HH:MM AM/PM".
 *
 * @param {{
 *   dateStr: string,
 *   createdAtSource?: string,
 *   fundedAtSource?: string,
 *   paidOutAtSource?: string,
 *   completedAtSource?: string,
 *   timeZone?: string,
 * }} fields
 */
export function formatTransferTimelineEvents({
  dateStr,
  createdAtSource,
  fundedAtSource,
  paidOutAtSource,
  completedAtSource,
  timeZone = TIMELINE_CET_TIMEZONE,
} = {}) {
  const setup = formatTimelineEventFromSource(dateStr, createdAtSource, timeZone)
  const funded = formatTimelineEventFromSource(dateStr, fundedAtSource, timeZone)
  const payout = formatTimelineEventFromSource(
    dateStr,
    paidOutAtSource,
    timeZone,
  )
  // Completion uses completedAtSource when present; otherwise paid-out stamp.
  const completion = formatTimelineEventFromSource(
    dateStr,
    completedAtSource ?? paidOutAtSource,
    timeZone,
  )

  return {
    timelineTimestamp: setup,
    timelineSetupTimestamp: setup,
    timelineFundedTimestamp: funded,
    timelinePayoutTimestamp: payout,
    timelineCompletionTimestamp: completion,
  }
}

/**
 * Overwrite date / dateGroup / timeline weekday labels from dateStr.
 * Does not invent clocks — normalizes any provided time labels.
 */
export function applyDerivedDateLabels(
  tx,
  { setupTime, paidTime, timestampTime, fundedTime, payoutTime, completionTime } = {},
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

  if (fundedTime) {
    tx.timelineFundedTimestamp = formatTimelineTimestamp(tx.dateStr, fundedTime)
  }

  if (paidTime) {
    tx.timelinePaidTimestamp = formatTimelineTimestamp(tx.dateStr, paidTime)
  }

  if (payoutTime) {
    tx.timelinePayoutTimestamp = formatTimelineTimestamp(tx.dateStr, payoutTime)
  } else if (payoutTime === '') {
    tx.timelinePayoutTimestamp = formatTransactionDateLabel(tx.dateStr)
  }

  if (completionTime) {
    tx.timelineCompletionTimestamp = formatTimelineTimestamp(
      tx.dateStr,
      completionTime,
    )
  } else if (completionTime === '') {
    tx.timelineCompletionTimestamp = formatTransactionDateLabel(tx.dateStr)
  }

  return tx
}
