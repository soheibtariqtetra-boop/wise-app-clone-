/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a confirmation file.
 *
 * brigitte-schmidt-source.pdf documents Johannes Kress → Brigitte Schmidt (−1,000 EUR).
 * Do not attach that PDF to the simulated Brigitte incoming demo.
 *
 * viktor-cherniavskyi-source.pdf — Mathias Mundry, und Frau Ina → Viktor Cherniavskyi (−1,013 EUR).
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-jose-antonio-maldonado': '/confirmations/lucas-confirmation.pdf',
  'tx-transfer-brigitte-schmidt': '/confirmations/brigitte-schmidt-source.pdf',
  'tx-demo-viktor-cherniavskyi': '/confirmations/viktor-cherniavskyi-source.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
