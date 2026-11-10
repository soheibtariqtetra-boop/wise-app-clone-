/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a real confirmation file.
 * Lucas transfer has no verified confirmation PDF asset yet.
 */
export const TRANSFER_CONFIRMATION_PDFS = {}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
