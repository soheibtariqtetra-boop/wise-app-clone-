import { useState, useEffect, useRef } from 'react'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import TransactionDetailsScreen from './screens/TransactionDetailsScreen/TransactionDetailsScreen'
import AccountBalanceEURScreen from './screens/AccountBalanceEURScreen/AccountBalanceEURScreen'
import AccountDetailsEURScreen from './screens/AccountDetailsEURScreen/AccountDetailsEURScreen'

/**
 * App root — manages lightweight SPA screen navigation.
 *
 * Routes:
 *   'home'              → HomeScreen
 *   'profile'           → ProfileScreen
 *   'transaction'       → TransactionDetailsScreen  (fed by selectedTransaction state)
 *   'eurAccount'        → AccountBalanceEURScreen
 *   'eurAccountDetails' → AccountDetailsEURScreen
 *
 * Home scroll position is preserved across navigations.
 */
function App() {
  const getInitialRoute = () => {
    if (window.location.pathname.startsWith('/profile')) return 'profile'
    if (window.location.pathname.startsWith('/account/eur/details')) return 'eurAccountDetails'
    if (window.location.pathname.startsWith('/account/eur') || window.location.pathname.startsWith('/eur')) return 'eurAccount'
    return 'home'
  }

  const [currentRoute, setCurrentRoute]               = useState(getInitialRoute)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const homeScrollTopRef                              = useRef(0)

  // Sync with browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path.startsWith('/profile')) {
        setCurrentRoute('profile')
      } else if (path.startsWith('/account/eur/details')) {
        setCurrentRoute('eurAccountDetails')
      } else if (path.startsWith('/account/eur') || path.startsWith('/eur')) {
        setCurrentRoute('eurAccount')
      } else if (path.startsWith('/transaction')) {
        setCurrentRoute(selectedTransaction ? 'transaction' : 'home')
      } else {
        setCurrentRoute('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [selectedTransaction])

  // Restore scroll position when returning to Home
  useEffect(() => {
    if (currentRoute === 'home') {
      const scrollEl = document.querySelector('.home-screen__main-content')
      if (scrollEl && homeScrollTopRef.current > 0) {
        requestAnimationFrame(() => {
          scrollEl.scrollTop = homeScrollTopRef.current
        })
      }
    }
  }, [currentRoute])

  // ── Navigation helpers ────────────────────────────────

  const saveHomeScroll = () => {
    const scrollEl = document.querySelector('.home-screen__main-content')
    if (scrollEl) homeScrollTopRef.current = scrollEl.scrollTop
  }

  const navigateToProfile = () => {
    saveHomeScroll()
    if (window.location.pathname !== '/profile') {
      window.history.pushState({ route: 'profile' }, '', '/profile')
    }
    setCurrentRoute('profile')
  }

  const navigateToHome = () => {
    if (
      window.history.state?.route === 'profile' ||
      window.history.state?.route === 'transaction' ||
      window.history.state?.route === 'eurAccount' ||
      window.history.state?.route === 'eurAccountDetails'
    ) {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  const navigateToEurAccount = () => {
    saveHomeScroll()
    if (window.location.pathname !== '/account/eur') {
      window.history.pushState({ route: 'eurAccount' }, '', '/account/eur')
    }
    setCurrentRoute('eurAccount')
  }

  const closeEurAccount = () => {
    if (window.history.state?.route === 'eurAccount') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  const navigateToEurAccountDetails = () => {
    if (window.location.pathname !== '/account/eur/details') {
      window.history.pushState({ route: 'eurAccountDetails' }, '', '/account/eur/details')
    }
    setCurrentRoute('eurAccountDetails')
  }

  const closeEurAccountDetails = () => {
    if (window.history.state?.route === 'eurAccountDetails') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/account/eur') {
        window.history.pushState({ route: 'eurAccount' }, '', '/account/eur')
      }
      setCurrentRoute('eurAccount')
    }
  }

  const navigateToTransaction = (transaction) => {
    saveHomeScroll()
    setSelectedTransaction(transaction)
    window.history.pushState({ route: 'transaction', txId: transaction.id }, '', '/transaction')
    setCurrentRoute('transaction')
  }

  const closeTransaction = () => {
    setSelectedTransaction(null)
    if (window.history.state?.route === 'transaction') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  // ── Render ───────────────────────────────────────────

  return (
    <div className="app-shell">
      {currentRoute === 'profile' ? (
        <ProfileScreen onBack={navigateToHome} />
      ) : currentRoute === 'transaction' && selectedTransaction ? (
        <TransactionDetailsScreen
          transaction={selectedTransaction}
          onClose={closeTransaction}
        />
      ) : currentRoute === 'eurAccountDetails' ? (
        <AccountDetailsEURScreen onBack={closeEurAccountDetails} />
      ) : currentRoute === 'eurAccount' ? (
        <AccountBalanceEURScreen
          onClose={closeEurAccount}
          onSelectTransaction={navigateToTransaction}
          onOpenDetails={navigateToEurAccountDetails}
        />
      ) : (
        <HomeScreen
          onProfileClick={navigateToProfile}
          onSelectTransaction={navigateToTransaction}
          onEurClick={navigateToEurAccount}
        />
      )}
    </div>
  )
}

export default App
