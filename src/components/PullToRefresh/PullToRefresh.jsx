import { useRef, useCallback, useEffect } from 'react'
import './PullToRefresh.css'

/* ──────────────────────────────────────────────────────────────
   PullToRefresh — Global reusable pull-to-refresh container.

   Usage:
     <PullToRefresh
       onRefresh={async () => { ... }}       // required — async refresh callback
       scrollContentClass="my-scroll-class"  // optional — extra class on scroll container
       threshold={80}                        // optional — pull distance to trigger refresh (px)
       maxPull={130}                         // optional — maximum visual pull distance (px)
     >
       <div className="scroll-inner">
         ...content...
       </div>
     </PullToRefresh>

   The component renders:
     .ptr-wrapper          — outer container (takes flex:1)
       .ptr-indicator      — circular refresh indicator
       .ptr-scroll-content — the scrollable area (overflow-y:auto)
         {children}

   State machine:  idle → pulling → ready → refreshing → settling → idle
   ────────────────────────────────────────────────────────────── */

// ── Constants ─────────────────────────────────
const DEFAULT_THRESHOLD = 80       // px to reach "ready" state
const DEFAULT_MAX_PULL = 130       // max visual displacement
const DRAG_START_THRESHOLD = 8     // min px movement before treating as drag
const RESISTANCE_FACTOR = 0.45     // initial resistance
const RESISTANCE_EXPONENT = 0.7    // progressive damping exponent
const SETTLE_DURATION = 300        // ms for return animation
const MIN_REFRESH_TIME = 800       // ms minimum refresh display time

// ── States ────────────────────────────────────
const STATE_IDLE       = 'idle'
const STATE_PULLING    = 'pulling'
const STATE_READY      = 'ready'
const STATE_REFRESHING = 'refreshing'
const STATE_SETTLING   = 'settling'

/**
 * Apply pull resistance — feels elastic, not 1:1.
 * Uses a power curve: output grows sub-linearly with input.
 */
function applyResistance(rawDistance, maxPull) {
  const normalised = rawDistance / maxPull
  const dampened = Math.pow(normalised, RESISTANCE_EXPONENT) * RESISTANCE_FACTOR
  return Math.min(dampened * maxPull, maxPull)
}

/**
 * Refresh arrow SVG — green curved arrow on dark circle.
 * Created as inline SVG; no external icon dependencies.
 */
function RefreshArrowSVG() {
  return (
    <svg
      className="ptr-indicator__arrow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12
           C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14
           H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12
           C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4
           L17.65 6.35Z"
        fill="#9ee770"
      />
    </svg>
  )
}


function PullToRefresh({
  children,
  onRefresh,
  scrollContentClass = '',
  threshold = DEFAULT_THRESHOLD,
  maxPull = DEFAULT_MAX_PULL,
}) {
  // ── Refs (avoid React re-renders during gesture) ──
  const scrollRef     = useRef(null)
  const indicatorRef  = useRef(null)
  const wrapperRef    = useRef(null)

  // Gesture tracking (mutable refs for perf)
  const stateRef      = useRef(STATE_IDLE)
  const startYRef     = useRef(0)
  const startXRef     = useRef(0)
  const pullDistRef   = useRef(0)
  const dirDecidedRef = useRef(false)  // has direction been decided?
  const isVertRef     = useRef(false)  // is this a vertical gesture?
  const isMouseRef    = useRef(false)  // is this a mouse gesture?
  const mouseDownRef  = useRef(false)  // is mouse currently down?
  const rafIdRef      = useRef(null)
  const refreshCountRef = useRef(0)    // guard against double-fires

  // ── DOM update (no React state — pure transforms) ──
  const updateVisuals = useCallback((pullDist) => {
    const scrollEl    = scrollRef.current
    const indicatorEl = indicatorRef.current
    if (!scrollEl || !indicatorEl) return

    const progress = Math.min(pullDist / threshold, 1)

    // Content translation
    scrollEl.style.transform = pullDist > 0
      ? `translate3d(0, ${pullDist}px, 0)`
      : ''

    // Indicator position & visibility
    // Indicator starts hidden above content; as pullDist grows it moves into view
    const indicatorY = pullDist > 0
      ? -40 + pullDist  // -40 is the indicator height (hidden above)
      : -40
    indicatorEl.style.transform = `translate(-50%, ${indicatorY}px)`
    indicatorEl.style.opacity = pullDist > 4 ? Math.min(progress * 1.5, 1) : 0

    // Update arrow rotation via inline style (the SVG element inside indicator)
    const arrowEl = indicatorEl.querySelector('.ptr-indicator__arrow')
    if (arrowEl) {
      arrowEl.style.transform = `rotate(${progress * 360}deg)`
    }
  }, [threshold])

  // ── Settle animation (return to idle) ──
  const settle = useCallback((fromDist, onComplete) => {
    const scrollEl    = scrollRef.current
    const indicatorEl = indicatorRef.current
    if (!scrollEl || !indicatorEl) return

    // Add settling class for CSS transitions
    indicatorEl.classList.add('ptr-indicator--settling')
    scrollEl.style.transition = `transform ${SETTLE_DURATION}ms cubic-bezier(0.2, 0, 0, 1)`

    // Animate to zero
    requestAnimationFrame(() => {
      scrollEl.style.transform = 'translate3d(0, 0, 0)'
      indicatorEl.style.transform = 'translate(-50%, -40px)'
      indicatorEl.style.opacity = '0'

      const arrowEl = indicatorEl.querySelector('.ptr-indicator__arrow')
      if (arrowEl) arrowEl.style.transform = 'rotate(0deg)'
    })

    let settled = false
    const handleEnd = () => {
      if (settled) return
      settled = true
      scrollEl.style.transition = ''
      scrollEl.style.transform = ''
      indicatorEl.classList.remove('ptr-indicator--settling')
      indicatorEl.classList.remove('ptr-indicator--refreshing')
      if (onComplete) onComplete()
    }

    scrollEl.addEventListener('transitionend', handleEnd, { once: true })

    // Safety fallback if transitionend doesn't fire
    setTimeout(handleEnd, SETTLE_DURATION + 50)
  }, [])

  // ── Settle to refresh resting position ──
  const settleToRefresh = useCallback((fromDist) => {
    const scrollEl    = scrollRef.current
    const indicatorEl = indicatorRef.current
    if (!scrollEl || !indicatorEl) return

    const restDist = threshold * 0.65  // resting position during refresh
    scrollEl.style.transition = `transform 200ms cubic-bezier(0.2, 0, 0, 1)`

    requestAnimationFrame(() => {
      scrollEl.style.transform = `translate3d(0, ${restDist}px, 0)`
      const indicatorY = -40 + restDist
      indicatorEl.style.transform = `translate(-50%, ${indicatorY}px)`
      indicatorEl.style.opacity = '1'
    })

    let done = false
    const handleEnd = () => {
      if (done) return
      done = true
      scrollEl.style.transition = ''
    }
    scrollEl.addEventListener('transitionend', handleEnd, { once: true })
    setTimeout(handleEnd, 250)
  }, [threshold])

  // ── Execute refresh ──
  const executeRefresh = useCallback(async () => {
    stateRef.current = STATE_REFRESHING
    const currentCount = ++refreshCountRef.current

    const indicatorEl = indicatorRef.current
    if (indicatorEl) {
      indicatorEl.classList.add('ptr-indicator--refreshing')
    }

    settleToRefresh(pullDistRef.current)

    const startTime = Date.now()

    try {
      if (onRefresh) await onRefresh()
    } catch (e) {
      console.warn('[PullToRefresh] onRefresh error:', e)
    }

    // Guard: only the latest refresh settles
    if (refreshCountRef.current !== currentCount) return

    // Ensure minimum visible refresh time
    const elapsed = Date.now() - startTime
    if (elapsed < MIN_REFRESH_TIME) {
      await new Promise(r => setTimeout(r, MIN_REFRESH_TIME - elapsed))
    }

    stateRef.current = STATE_SETTLING
    pullDistRef.current = 0
    settle(0, () => {
      stateRef.current = STATE_IDLE
    })
  }, [onRefresh, settle, settleToRefresh])

  // ── Core gesture processing (shared by touch and mouse) ──
  const processGestureStart = useCallback((clientX, clientY) => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return false

    // Ignore if already in a gesture, refreshing, or settling
    if (stateRef.current === STATE_REFRESHING ||
        stateRef.current === STATE_SETTLING) return false

    // Only start tracking if scroll is at top
    if (scrollEl.scrollTop > 0) return false

    startYRef.current     = clientY
    startXRef.current     = clientX
    dirDecidedRef.current = false
    isVertRef.current     = false
    pullDistRef.current   = 0
    return true
  }, [])

  const processGestureMove = useCallback((clientX, clientY) => {
    if (stateRef.current === STATE_REFRESHING ||
        stateRef.current === STATE_SETTLING) return false

    const scrollEl = scrollRef.current
    if (!scrollEl) return false

    const deltaY = clientY - startYRef.current
    const deltaX = clientX - startXRef.current

    // Direction decision gate
    if (!dirDecidedRef.current) {
      const absDy = Math.abs(deltaY)
      const absDx = Math.abs(deltaX)

      if (absDy < DRAG_START_THRESHOLD && absDx < DRAG_START_THRESHOLD) return false

      dirDecidedRef.current = true

      // Horizontal movement dominates → not a pull-to-refresh gesture
      if (absDx > absDy) {
        isVertRef.current = false
        return false
      }

      // Upward drag → normal scroll, not pull-to-refresh
      if (deltaY < 0) {
        isVertRef.current = false
        return false
      }

      // Scroll is not at top → not eligible
      if (scrollEl.scrollTop > 0) {
        isVertRef.current = false
        return false
      }

      isVertRef.current = true
    }

    if (!isVertRef.current) return false

    // Re-check scrollTop
    if (scrollEl.scrollTop > 0) {
      isVertRef.current = false
      if (pullDistRef.current > 0) {
        stateRef.current = STATE_SETTLING
        settle(pullDistRef.current, () => {
          stateRef.current = STATE_IDLE
        })
        pullDistRef.current = 0
      }
      return false
    }

    const rawDist = Math.max(0, deltaY)
    const visualDist = applyResistance(rawDist, maxPull)
    pullDistRef.current = visualDist

    // Update state
    if (visualDist >= threshold) {
      stateRef.current = STATE_READY
    } else if (visualDist > 0) {
      stateRef.current = STATE_PULLING
    }

    // Schedule visual update
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      updateVisuals(visualDist)
    })

    return true // Gesture was consumed
  }, [maxPull, threshold, updateVisuals, settle])

  const processGestureEnd = useCallback(() => {
    if (stateRef.current === STATE_REFRESHING ||
        stateRef.current === STATE_SETTLING) return

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }

    const wasReady = stateRef.current === STATE_READY

    if (wasReady) {
      executeRefresh()
    } else if (pullDistRef.current > 0) {
      stateRef.current = STATE_SETTLING
      settle(pullDistRef.current, () => {
        stateRef.current = STATE_IDLE
      })
      pullDistRef.current = 0
    } else {
      stateRef.current = STATE_IDLE
    }

    dirDecidedRef.current = false
    isVertRef.current = false
  }, [executeRefresh, settle])

  // ── Touch event handlers (primary for mobile) ──
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleTouchStart = (e) => {
      if (isMouseRef.current) return  // ignore if mouse is driving
      if (e.touches.length !== 1) return  // only single-finger
      const touch = e.touches[0]
      processGestureStart(touch.clientX, touch.clientY)
    }

    const handleTouchMove = (e) => {
      if (isMouseRef.current) return
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const consumed = processGestureMove(touch.clientX, touch.clientY)
      if (consumed && isVertRef.current) {
        e.preventDefault()  // prevent native overscroll/bounce
      }
    }

    const handleTouchEnd = (e) => {
      if (isMouseRef.current) return
      processGestureEnd()
    }

    const handleTouchCancel = () => {
      if (isMouseRef.current) return
      if (pullDistRef.current > 0 &&
          stateRef.current !== STATE_REFRESHING) {
        stateRef.current = STATE_SETTLING
        settle(pullDistRef.current, () => {
          stateRef.current = STATE_IDLE
        })
        pullDistRef.current = 0
      }
      dirDecidedRef.current = false
      isVertRef.current = false
    }

    scrollEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollEl.addEventListener('touchmove', handleTouchMove, { passive: false })
    scrollEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    scrollEl.addEventListener('touchcancel', handleTouchCancel, { passive: true })

    return () => {
      scrollEl.removeEventListener('touchstart', handleTouchStart)
      scrollEl.removeEventListener('touchmove', handleTouchMove)
      scrollEl.removeEventListener('touchend', handleTouchEnd)
      scrollEl.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [processGestureStart, processGestureMove, processGestureEnd, settle])

  // ── Mouse event handlers (for desktop development/testing) ──
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleMouseDown = (e) => {
      if (e.button !== 0) return  // only primary button
      isMouseRef.current = true
      mouseDownRef.current = true
      processGestureStart(e.clientX, e.clientY)
    }

    const handleMouseMove = (e) => {
      if (!mouseDownRef.current) return
      const consumed = processGestureMove(e.clientX, e.clientY)
      if (consumed && isVertRef.current) {
        e.preventDefault()
      }
    }

    const handleMouseUp = (e) => {
      if (!mouseDownRef.current) return
      mouseDownRef.current = false
      processGestureEnd()
      // Keep isMouseRef true briefly to prevent touch events from double-firing
      setTimeout(() => { isMouseRef.current = false }, 100)
    }

    scrollEl.addEventListener('mousedown', handleMouseDown, { passive: true })
    // Bind move/up to window so we get events even if pointer leaves element
    window.addEventListener('mousemove', handleMouseMove, { passive: false })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      scrollEl.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [processGestureStart, processGestureMove, processGestureEnd])

  // ── Clean up on unmount ──
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  const scrollClasses = ['ptr-scroll-content', scrollContentClass].filter(Boolean).join(' ')

  return (
    <div
      className="ptr-wrapper"
      ref={wrapperRef}
    >
      {/* ── Refresh indicator ── */}
      <div ref={indicatorRef} className="ptr-indicator" aria-hidden="true">
        <RefreshArrowSVG />
      </div>

      {/* ── Scrollable content ── */}
      <div
        ref={scrollRef}
        className={scrollClasses}
      >
        {children}
      </div>
    </div>
  )
}

// Expose the scroll content class for external use (e.g. scroll listeners)
PullToRefresh.SCROLL_CONTENT_CLASS = 'ptr-scroll-content'

export default PullToRefresh
