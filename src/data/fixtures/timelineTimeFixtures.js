/**
 * Isolated UI-test fixtures for TransferDetailsScreen01/02 timeline clocks.
 *
 * Screenshot reference format: "Tuesday, November 24 at 07:35 AM"
 * (12-hour, leading-zero hour, uppercase AM/PM).
 *
 * Verified financial source stamps stay on the transaction record
 * (createdAtSource / fundedAtSource / paidOutAtSource) and are NOT
 * overwritten by these simulated display clocks.
 */

import {
  formatTimelineClockTime,
  formatTimelineTimestamp,
  formatTransferTimelineEvents,
  TIMELINE_CET_TIMEZONE,
} from '../transactionDates.js'

/** Calendar anchor matching 672 _1_.pdf CET create stamp. */
export const TIMELINE_FIXTURE_DATE_STR = '2026-11-24T07:35:21+01:00'

/**
 * Four simulated reference clocks for isolated timeline UI testing.
 * Required display sequence: 07:35 → 07:36 → 07:38 → 07:39 AM.
 */
export const TIMELINE_UI_TEST_REFERENCE_CLOCKS = {
  setup: { hours24: 7, minutes: 35 },
  funded: { hours24: 7, minutes: 36 },
  payout: { hours24: 7, minutes: 38 },
  completion: { hours24: 7, minutes: 39 },
}

export const timelineUiTestClockLabels = {
  setup: formatTimelineClockTime(7, 35),
  funded: formatTimelineClockTime(7, 36),
  payout: formatTimelineClockTime(7, 38),
  completion: formatTimelineClockTime(7, 39),
}

/** Fully formatted stamps — all four events include individual clocks. */
export const timelineUiTestFixtures = {
  timelineTimestamp: formatTimelineTimestamp(
    TIMELINE_FIXTURE_DATE_STR,
    timelineUiTestClockLabels.setup,
    TIMELINE_CET_TIMEZONE,
  ),
  timelineSetupTimestamp: formatTimelineTimestamp(
    TIMELINE_FIXTURE_DATE_STR,
    timelineUiTestClockLabels.setup,
    TIMELINE_CET_TIMEZONE,
  ),
  timelineFundedTimestamp: formatTimelineTimestamp(
    TIMELINE_FIXTURE_DATE_STR,
    timelineUiTestClockLabels.funded,
    TIMELINE_CET_TIMEZONE,
  ),
  timelinePayoutTimestamp: formatTimelineTimestamp(
    TIMELINE_FIXTURE_DATE_STR,
    timelineUiTestClockLabels.payout,
    TIMELINE_CET_TIMEZONE,
  ),
  timelineCompletionTimestamp: formatTimelineTimestamp(
    TIMELINE_FIXTURE_DATE_STR,
    timelineUiTestClockLabels.completion,
    TIMELINE_CET_TIMEZONE,
  ),
}

/**
 * Verified financial timeline shape for Shahan (source PDF):
 * create + fund have CET clocks; payout/completion are date-only.
 * Kept for source-stamp checks — do not use for UI timeline display
 * when the isolated UI-test fixtures are required.
 */
export const shahanVerifiedTimelineFixtures = formatTransferTimelineEvents({
  dateStr: TIMELINE_FIXTURE_DATE_STR,
  createdAtSource: 'November 24, 2026 07:35:21 CET',
  fundedAtSource: 'November 24, 2026 07:39:19 CET',
  paidOutAtSource: 'November 24, 2026',
  timeZone: TIMELINE_CET_TIMEZONE,
})
