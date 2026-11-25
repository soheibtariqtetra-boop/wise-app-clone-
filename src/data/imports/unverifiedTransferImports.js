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
