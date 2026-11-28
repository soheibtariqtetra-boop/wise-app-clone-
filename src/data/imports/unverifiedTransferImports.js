/**
 * Private / unverified transfer imports.
 *
 * Source PDFs live under scratch/private-reference/ (gitignored)
 * and must NOT be published to public/ or Vercel.
 *
 * verified: false until confirmed against the account provider.
 * Do not invent missing payout clock times.
 */

export const unverifiedTransferImports = {
  /**
   * Source file: 672 (2).pdf
   * Local private copy: scratch/private-reference/672_2_PRIVATE.pdf
   * Sender Nazar Hussain → Zhichao Wang, −672 EUR.
   * Note: PDF prints BST on November 23 (UK winter is GMT) — flag timezone discrepancy.
   * Paid-out-from IBAN is sender-side only — does not set receiving-account ownership.
   */
  'import-672-2-nazar-zhichao-672': {
    verified: false,
    sourceFileName: '672 (2).pdf',
    privateStoragePath: 'scratch/private-reference/672_2_PRIVATE.pdf',
    publicConfirmationPath: null,
    linkedTransactionId: 'tx-import-zhichao-wang-672',
    extracted: {
      senderName: 'Nazar Hussain',
      senderAddressLines: [
        'Office 2587 321-323 High Road, Chadwell Health',
        'Essex, RM6 6AX',
        'United Kingdom',
      ],
      recipientName: 'Zhichao Wang',
      amountMajor: 672.0,
      currency: 'EUR',
      feesMajor: 0.0,
      createdAtSource: 'November 23, 2026 11:36:58 BST',
      fundedAtSource: 'November 23, 2026 11:43:25 BST',
      paidOutAtSource: 'November 23, 2026',
      payoutClockTimeAvailable: false,
      novemberBstDiscrepancy: true,
      transferNumberPrinted: '#2858268525',
      membershipNumberPrinted: 'P101684505',
      bankingPartnerReference: 'GW26100723803737',
      paymentReference: 'Nazar Hussain',
      // Paid-out-from (sender-side) — not the authorized EUR receiving IBAN.
      senderSideIban: 'BE58 9030 1491 1979',
      senderSideBic: 'TRWIBEB1XXX',
      recipientBankName: 'BUNQ NIEDERLASSUNG DEUTSCHLAND',
      recipientIban: 'DE33 3701 9000 1011 6510 21',
      recipientBic: 'BUNQDE82XXX',
    },
  },

  /**
   * Source file: 672 _1_.pdf
   * Local private copy: scratch/private-reference/672_1_rita-kneisel-PRIVATE.pdf
   */
  'import-672-1-rita-kneisel-1538': {
    verified: false,
    sourceFileName: '672 _1_ (1).pdf',
    privateStoragePath: 'scratch/private-reference/672_1_rita-kneisel-PRIVATE.pdf',
    publicConfirmationPath: 'public/confirmations/rita-kneisel-shahan-confirmation.pdf',
    linkedTransactionId: 'tx-import-muhammad-shahan-afzal-khan',
    extracted: {
      senderName: 'Rita und Günther Kneisel',
      senderAddressLines: [
        'Office 2587 321-323 High Road, Chadwell Health',
        'Essex, RM6 6AX',
        'United Kingdom',
      ],
      recipientName: 'Muhammad Shahan Afzal Khan',
      amountMajor: 1538.0,
      currency: 'EUR',
      feesMajor: 0.0,
      createdAtSource: 'November 24, 2026 07:35:21 CET',
      fundedAtSource: 'November 24, 2026 07:39:19 CET',
      paidOutAtSource: 'November 24, 2026',
      payoutClockTimeAvailable: false,
      transferNumberPrinted: '#2858668525',
      membershipNumberPrinted: 'P101634505',
      bankingPartnerReference: 'GW26100713803737',
      paymentReference: 'Rita und Günther Kneisel',
      senderSideIban: 'DE46 5306 1230 0007 0327 57',
      senderSideBic: 'GENODEF1HUE',
      recipientBankName: 'United People\'s Bank',
      recipientIban: 'DE35 5909 2000 1565 4902 02',
      // Updated from replacement PDF (was BUNQDE82XXX on prior 672 _1_.pdf).
      recipientBic: 'GENODE51SB2',
    },
  },
}
