/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a real confirmation file.
 *
 * NOTE: lucas-confirmation.pdf is an unverified / inconsistent source document.
 * gasper-confirmation.pdf (1766.pdf) is intentionally unmapped — the former
 * -1,766 Gasper transfer was replaced by simulated ±1,000 demo records that
 * must not present that PDF as confirmation of either demo payment.
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-jose-antonio-maldonado': '/confirmations/lucas-confirmation.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
