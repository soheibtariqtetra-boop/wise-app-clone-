/**
 * Single authorized prototype account identity.
 *
 * Bound by: ProfileScreen, LoginScreen01, Home TopBar,
 * AccountDetailsEURScreen03 Name, AccountBalanceEURScreen01 (via mockEurAccount),
 * GBP account Name.
 *
 * Prototype / unofficial app test profile: Zain UL Abideen.
 * EUR receiving banking fields remain from 672 (2).pdf paid-out-from / address.
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
 * Prototype test account — Zain UL Abideen.
 */
export const sampleAccountIdentity = {
  isPrototypeTestAccount: true,
  fullName: 'Zain UL Abideen',
  /** ProfileScreen stacked display (newline separates lines). */
  profileName: 'ZAIN UL\nABIDEEN',
  handle: '@ZainULAbideen',
  // LoginScreen01 UI masking (Figma 15-asterisk pattern)
  // humairaamc26@gmail.com → h***************6@gmail.com
  email: 'humairaamc26@gmail.com',
  membershipNumber: 'P101684505',
  /** Personal postal (kept from 672 (2).pdf Your details address). */
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
 * Holder name follows selected prototype identity.
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
