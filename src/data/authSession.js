/**
 * Demo session gate for LoginScreen01.
 * Logout ends the local authenticated session only —
 * profile identity and app data remain available.
 */

const SESSION_KEY = 'wiseDemoAuthSession'

export const AUTH_STATUS = {
  authenticated: 'authenticated',
  loggedOut: 'logged_out',
}

export function getAuthStatus() {
  try {
    const value = window.localStorage.getItem(SESSION_KEY)
    if (value === AUTH_STATUS.loggedOut) return AUTH_STATUS.loggedOut
    // Default demo: treat missing key as authenticated so existing users
    // are not forced through login until they explicitly log out.
    return AUTH_STATUS.authenticated
  } catch {
    return AUTH_STATUS.authenticated
  }
}

export function isAuthenticated() {
  return getAuthStatus() === AUTH_STATUS.authenticated
}

export function setAuthenticated() {
  try {
    window.localStorage.setItem(SESSION_KEY, AUTH_STATUS.authenticated)
  } catch {
    // ignore quota / private-mode failures in demo
  }
}

export function setLoggedOut() {
  try {
    window.localStorage.setItem(SESSION_KEY, AUTH_STATUS.loggedOut)
  } catch {
    // ignore
  }
}

/**
 * Mask an email for LoginScreen01 using the Figma pattern:
 * first character + 15 asterisks + last local-part character + @domain
 * Example: j***************3@example.com
 */
export function maskEmailForLogin(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return null
  const [local, domain] = email.split('@')
  if (!local || !domain) return null
  if (local.length === 1) return `${local}@${domain}`
  if (local.length === 2) return `${local[0]}*${local[1]}@${domain}`
  // Figma LoginScreen01 uses a fixed 15-asterisk mask span.
  return `${local[0]}${'*'.repeat(15)}${local[local.length - 1]}@${domain}`
}

/** First letter of the account holder's first name for LoginScreen01 avatar. */
export function getLoginAvatarInitial(displayName) {
  if (!displayName || typeof displayName !== 'string') return ''
  const firstToken = displayName.replace(/\n/g, ' ').trim().split(/\s+/)[0] || ''
  const letter = firstToken.match(/[A-Za-z]/)?.[0]
  return letter ? letter.toUpperCase() : ''
}
