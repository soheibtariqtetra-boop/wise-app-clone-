/**
 * Single authorized prototype account identity.
 *
 * Bound by: ProfileScreen, LoginScreen01, Home TopBar,
 * AccountDetailsEURScreen03 Name, AccountBalanceEURScreen01 (via mockEurAccount),
 * GBP account Name.
 *
 * Prototype / unofficial app test profile: Nazar Hussain.
 * EUR receiving fields from 672 (2).pdf "Paid out from" / "Your details".
 */

import { getLoginAvatarInitial } from './authSession.js'

/** Two-letter avatar initials from an account full name (first + last token). */
export function getTwoLetterInitials(fullName) {
  if (!fullName || typeof fullName !== 'string') return ''
  const parts = fullName.replace(/\n/g, ' ').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0].match(/[A-Za-z]/)?.[0] || ''
  if (parts.length === 1) {
    const second = parts[0].match(/[A-Za-z]/g)?.[1] || ''
    return `${first}${second}`.toUpperCase()
  }
  const last = parts[parts.length - 1].match(/[A-Za-z]/)?.[0] || ''
  return `${first}${last}`.toUpperCase()
}

/**
 * Prototype test account — Nazar Hussain.
 * Postal + membership from 672 (2).pdf.
 */
export const sampleAccountIdentity = {
  isPrototypeTestAccount: true,
  fullName: 'Nazar Hussain',
  /** ProfileScreen stacked display (newline separates lines). */
  profileName: 'NAZAR\nHUSSAIN',
  handle: '@NazarHussain',
  // LoginScreen01 UI masking (Figma 15-asterisk pattern)
  // nazar.hussain@gmail.com → n***************n@gmail.com
  email: 'nazar.hussain@gmail.com',
  /** Printed on 672 (2).pdf */
  membershipNumber: 'P101684505',
  /** Personal postal from 672 (2).pdf "Your details". */
  personalAddressLines: [
    'Office 2587 321-323 High Road, Chadwell Health',
    'Essex, RM6 6AX',
    'United Kingdom',
  ],
}

sampleAccountIdentity.initials = getTwoLetterInitials(sampleAccountIdentity.fullName)
sampleAccountIdentity.loginAvatarInitial = getLoginAvatarInitial(sampleAccountIdentity.fullName)

/**
 * EUR account details for AccountDetailsEURScreen03 / EUR IBAN pill.
 * Banking identifiers from 672 (2).pdf "Paid out from".
 * Postal shown under "Bank name and address" from PDF "Your details" address.
 */
export const authorizedReceivingEurAccount = {
  accountName: sampleAccountIdentity.fullName,
  iban: 'BE58903014911979',
  ibanDisplay: 'BE58 9030 1491 1979',
  ibanDisplayIsPlaceholder: false,
  swiftBic: 'TRWIBEB1XXX',
  bankAddressLines: [
    'Office 2587 321-323 High Road, Chadwell Health',
    'Essex, RM6 6AX',
    'United Kingdom',
  ],
  sourceDocument: '672 (2).pdf',
}
