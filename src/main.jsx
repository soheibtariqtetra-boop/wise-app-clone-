import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── PWA Service Worker Registration ─────────────────────────────────────────
//
// updateViaCache: 'none'
//   The browser ALWAYS fetches sw.js from the network, bypassing HTTP cache.
//   This is critical: without it, the browser may serve a stale sw.js from
//   its own HTTP cache and never discover the updated service worker.
//
// registration.update()
//   Explicitly triggers a check for a new sw.js after the page has loaded.
//   Combined with updateViaCache:'none', this guarantees the browser checks
//   for an updated worker on every page load.
//
// controllerchange
//   Fires when a new service worker takes control (after skipWaiting + claim).
//   We do ONE reload to move the current page onto the new build.
//   A sessionStorage flag prevents infinite reload loops.
//
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        // Never serve sw.js from HTTP cache — always check network.
        updateViaCache: 'none',
      });

      console.log('[SW] Registered, scope:', registration.scope);

      // Explicitly check for an updated worker on every page load.
      // This fires after the page is fully loaded to avoid blocking rendering.
      registration.update().catch(() => {
        // Silently ignore if update check fails (e.g. offline).
      });

      // Listen for a new worker taking control.
      // When the new sw.js activates (skipWaiting + clients.claim), reload
      // the page once so the latest assets are used.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Guard: only reload once per session to prevent loops.
        // If we've already reloaded this session due to a SW update, skip.
        if (sessionStorage.getItem('sw-reloaded') === 'true') {
          console.log('[SW] Controller changed but already reloaded this session — skipping.')
          return
        }
        sessionStorage.setItem('sw-reloaded', 'true')
        console.log('[SW] New service worker activated — reloading for latest build.')
        window.location.reload()
      });

      // Clear the reload guard on a normal (non-SW-triggered) navigation.
      // This ensures the guard only prevents loops within one SW update cycle,
      // not across separate future deployments.
      if (registration.active && !navigator.serviceWorker.controller) {
        sessionStorage.removeItem('sw-reloaded')
      }

    } catch (err) {
      console.warn('[SW] Registration failed:', err)
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
