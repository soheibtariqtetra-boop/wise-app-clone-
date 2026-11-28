/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a confirmation file.
 *
 * brigitte-schmidt-source.pdf documents Johannes Kress → Brigitte Schmidt (−1,000 EUR).
 * Do not attach that PDF to the simulated Brigitte incoming demo.
 *
 * viktor-cherniavskyi-source.pdf — Mathias Mundry, und Frau Ina → Viktor Cherniavskyi (−1,013 EUR).
 *
 * rita-kneisel-shahan-confirmation.pdf — replaced 672 _1_ (1).pdf
 * (Rita und Günther Kneisel → Muhammad Shahan Afzal Khan, −1,538 EUR).
 * Recipient BIC on this revision: GENODE51SB2 (was BUNQDE82XXX).
 * Private copy also kept at scratch/private-reference/672_1_rita-kneisel-PRIVATE.pdf.
 *
 * zhichao-wang-source.pdf — 672 (2).pdf
 * (Nazar Hussain → Zhichao Wang, −672 EUR).
 * Private copy: scratch/private-reference/672_2_PRIVATE.pdf.
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-jose-antonio-maldonado': '/confirmations/lucas-confirmation.pdf',
  'tx-transfer-brigitte-schmidt': '/confirmations/brigitte-schmidt-source.pdf',
  'tx-demo-viktor-cherniavskyi': '/confirmations/viktor-cherniavskyi-source.pdf',
  'tx-import-muhammad-shahan-afzal-khan': '/confirmations/rita-kneisel-shahan-confirmation.pdf',
  'tx-import-zhichao-wang-672': '/confirmations/zhichao-wang-source.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
