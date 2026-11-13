/**
 * Session-only flags for transfer confirmation downloads.
 * Lets View remain available after returning from the in-app PDF viewer
 * without triggering another file download.
 */
const downloadedTxIds = new Set()

export function markConfirmationDownloaded(transactionId) {
  if (transactionId) downloadedTxIds.add(transactionId)
}

export function hasConfirmationDownloaded(transactionId) {
  return Boolean(transactionId && downloadedTxIds.has(transactionId))
}
