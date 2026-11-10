/**
 * Static transfer-confirmation PDF paths keyed by transaction id.
 * Only mapped transfers expose a real confirmation file.
 *
 * NOTE: lucas-confirmation.pdf and gasper-confirmation.pdf are unverified /
 * inconsistent source documents (shared printed transfer #2418268688; page-1
 * overview names Jose Antonio while page-2 recipients differ). PDFs are preserved
 * unchanged and must not be treated as independently authenticated.
 */
export const TRANSFER_CONFIRMATION_PDFS = {
  'tx-transfer-jose-antonio-maldonado': '/confirmations/lucas-confirmation.pdf',
  'tx-transfer-gasper-marence': '/confirmations/gasper-confirmation.pdf',
}

export function getTransferConfirmationPdfPath(transactionId) {
  if (!transactionId) return null
  return TRANSFER_CONFIRMATION_PDFS[transactionId] || null
}
