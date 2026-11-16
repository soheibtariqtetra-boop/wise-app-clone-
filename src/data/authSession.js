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
 * first character + asterisks + last local-part character + @domain
 * Example: m***************0@gmail.com
 */
export function maskEmailForLogin(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return null
  const [local, domain] = email.split('@')
  if (!local || !domain) return null
  if (local.length === 1) return `${local}@${domain}`
  if (local.length === 2) return `${local[0]}*${local[1]}@${domain}`
  const stars = '*'.repeat(Math.max(local.length - 2, 1))
  return `${local[0]}${stars}${local[local.length - 1]}@${domain}`
}
