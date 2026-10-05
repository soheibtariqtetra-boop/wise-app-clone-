/**
 * sw.js — Wise PWA Service Worker
 *
 * STRATEGY OVERVIEW
 * ─────────────────
 * NAVIGATION (HTML / SPA routes)   → NETWORK FIRST
 *   Online  : always fetches current Vercel HTML → app stays fresh
 *   Offline : falls back to cached index.html shell
 *
 * HASHED VITE ASSETS (/assets/*)   → CACHE FIRST
 *   Vite produces content-hashed filenames (e.g. index-ABC123.js).
 *   These are immutable: same URL = same content, forever.
 *   Safe to serve from cache; new deployments produce new URLs.
 *
 * EVERYTHING ELSE                  → NETWORK ONLY (pass-through)
 *   Non-GET, external requests, dynamic data, API calls — not cached.
 *
 * UPDATE LIFECYCLE
 * ─────────────────
 * • skipWaiting()   → new worker activates immediately, no tab-close needed
 * • clients.claim() → new worker controls all open tabs immediately
 * • activate        → deletes ALL old application caches (anything ≠ CACHE_NAME)
 * • CACHE_NAME      → bump ONLY when the cache schema itself changes, NOT every deploy
 *
 * WHY FUTURE DEPLOYS WORK WITHOUT A CACHE_NAME BUMP
 * ─────────────────────────────────────────────────
 * Navigation uses network-first: an online phone ALWAYS fetches the current
 * index.html from Vercel. The new index.html references new hashed JS/CSS
 * filenames. Those are not in the old cache → fetched fresh → new build lands.
 * No cache-version bump needed for normal application code updates.
 *
 * CACHE_NAME bump is only required if the caching *logic* or *schema* changes.
 */

const CACHE_NAME = 'wise-pwa-v2';

// Minimal app-shell to pre-cache: only the HTML fallback.
// Hashed assets are cached lazily on first request.
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ── INSTALL ───────────────────────────────────────────────────────────────────
// Pre-cache the minimal navigation fallback shell.
// skipWaiting() ensures the new worker activates without waiting for tabs to close.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Activate immediately — do not hold behind the old worker.
  self.skipWaiting();
});

// ── ACTIVATE ──────────────────────────────────────────────────────────────────
// Delete ALL old caches owned by this app (anything whose name ≠ CACHE_NAME).
// This removes wise-pwa-v1 and any future stale versions.
// clients.claim() makes this worker control all open tabs right away.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ── FETCH ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests. Pass through everything else (POST, etc).
  if (request.method !== 'GET') return;

  // Only handle same-origin requests. Do not intercept external CDNs, APIs, etc.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // ── STRATEGY 1: NAVIGATION (HTML / SPA routes) → NETWORK FIRST ──────────
  // Covers: /, /profile, /account/eur, /account/details, /transaction, etc.
  // An online user always gets the latest deployed index.html from Vercel.
  // Only falls back to cache when the network genuinely fails (offline).
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // ── STRATEGY 2: HASHED VITE ASSETS → CACHE FIRST ────────────────────────
  // Matches /assets/index-HASH.js, /assets/index-HASH.css, /assets/image-HASH.png, etc.
  // These filenames are immutable: if content changes, Vite emits a new filename.
  // Serving from cache is safe and avoids redundant re-downloads.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirstAsset(request));
    return;
  }

  // ── STRATEGY 3: OTHER SAME-ORIGIN RESOURCES → NETWORK FIRST ─────────────
  // e.g. /icons/*, /manifest.json, /sw.js itself.
  // Network-first keeps them fresh; caches as a fallback.
  event.respondWith(networkFirstGeneric(request));
});

// ── STRATEGY IMPLEMENTATIONS ──────────────────────────────────────────────────

/**
 * NETWORK FIRST — for navigation/HTML requests.
 * Tries network, updates cache on success.
 * Falls back to cached index.html if offline.
 */
async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const networkResponse = await fetch(request);
    // Cache the fresh response for offline fallback.
    // Clone because the response body can only be read once.
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    // Offline or network failure — serve cached shell.
    const cached = await cache.match('/index.html') || await cache.match('/');
    if (cached) return cached;
    // Last resort: return a minimal offline message (should rarely happen).
    return new Response('<html><body>You are offline. Please reconnect.</body></html>', {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

/**
 * CACHE FIRST — for immutable hashed Vite assets.
 * Serves from cache instantly if present.
 * Fetches and caches on first miss.
 */
async function cacheFirstAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    // Asset not cached and network failed — nothing we can do.
    return new Response('Asset unavailable offline', { status: 503 });
  }
}

/**
 * NETWORK FIRST — for other same-origin resources (icons, manifest, etc).
 * Tries network, falls back to cache.
 */
async function networkFirstGeneric(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response('Resource unavailable offline', { status: 503 });
  }
}
