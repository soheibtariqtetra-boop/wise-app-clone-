/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a real confirmation file.
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-thomas-andre': '/confirmations/panagiotis-confirmation.pdf',
  'tx-transfer-jose-antonio-maldonado': '/confirmations/jose-antonio-confirmation.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
