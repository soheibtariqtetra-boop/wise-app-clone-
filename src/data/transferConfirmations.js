/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a real confirmation file.
 *
 * brigitte-schmidt-source.pdf documents Johannes Kress → Brigitte Schmidt (−1,000 EUR).
 * Page 1 still prints "Total to GIROmobil"; page 2 "Sent to Brigitte Schmidt".
 * Do not attach this PDF to the simulated Brigitte incoming demo.
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-jose-antonio-maldonado': '/confirmations/lucas-confirmation.pdf',
  'tx-transfer-brigitte-schmidt': '/confirmations/brigitte-schmidt-source.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
