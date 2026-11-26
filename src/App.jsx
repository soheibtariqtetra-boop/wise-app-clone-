import { useState, useEffect, useRef, useCallback } from 'react'
import { mockFullTransactions } from './data/mockData'
import { findEurInteractiveTestTransaction } from './data/eurInteractiveTestTransaction'
import {
  isAuthenticated as readIsAuthenticated,
  setAuthenticated as persistAuthenticated,
  setLoggedOut as persistLoggedOut,
} from './data/authSession'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import TransactionDetailsScreen from './screens/TransactionDetailsScreen/TransactionDetailsScreen'
import AccountBalanceEURScreen from './screens/AccountBalanceEURScreen/AccountBalanceEURScreen'
import AccountDetailsEURScreen from './screens/AccountDetailsEURScreen/AccountDetailsEURScreen'
import CurrencyDetailsScreen from './screens/CurrencyDetailsScreen/CurrencyDetailsScreen'
import GBPAccountDetailsScreen from './screens/GBPAccountDetailsScreen/GBPAccountDetailsScreen'
import AccountBalanceGBPScreen from './screens/AccountBalanceGBPScreen/AccountBalanceGBPScreen'
import TransactionsScreen from './screens/TransactionsScreen/TransactionsScreen'
import TransferDetailsScreen from './screens/TransferDetailsScreen/TransferDetailsScreen'

/**
 * App root — manages lightweight SPA screen navigation.
 */
function App() {
  const resolveRouteFromPath = (path) => {
    if (path.startsWith('/login')) return 'login'
    if (path.startsWith('/profile')) return 'profile'
    if (path.startsWith('/account/eur/details')) return 'eurAccountDetails'
    if (path.startsWith('/account/gbp/details')) return 'gbpAccountDetails'
    if (path.startsWith('/account/details') || path.startsWith('/currency-details')) return 'currencyDetails'
    if (path.startsWith('/account/eur') || path.startsWith('/eur')) return 'eurAccount'
    if (path.startsWith('/account/gbp') || path.startsWith('/gbp')) return 'gbpAccount'
    if (path.startsWith('/transactions')) return 'transactions'
    if (path.startsWith('/transfer/')) return 'transfer'
    if (path.startsWith('/transaction/')) return 'transaction'
    return 'home'
  }

  const getInitialRoute = () => {
    if (!readIsAuthenticated()) return 'login'
    return resolveRouteFromPath(window.location.pathname)
  }

  const findTransactionById = (txId) => {
    if (!txId) return null
    for (const group of mockFullTransactions) {
      const tx = group.transactions.find((t) => t.id === txId)
      if (tx) return tx
    }
    // Interactive EUR UI-test transfer — not part of the financial ledger.
    return findEurInteractiveTestTransaction(txId)
  }

  const getInitialTransaction = () => {
    if (!readIsAuthenticated()) return null
    if (window.location.pathname.startsWith('/transaction/') || window.location.pathname.startsWith('/transfer/')) {
      const txId = window.location.pathname.split(/\/(?:transaction|transfer)\//)[1]
      return findTransactionById(txId)
    }
    return null
  }

  const [currentRoute, setCurrentRoute]               = useState(getInitialRoute)
  const [selectedTransaction, setSelectedTransaction] = useState(getInitialTransaction)
  const [authReady, setAuthReady]                     = useState(() => readIsAuthenticated())
  const homeScrollTopRef                              = useRef(0)

  const forceLoginRoute = useCallback(() => {
    if (window.location.pathname !== '/login') {
      window.history.replaceState({ route: 'login' }, '', '/login')
    }
    setSelectedTransaction(null)
    setCurrentRoute('login')
  }, [])

  // Keep logged-out users on LoginScreen01 across refresh / deep links.
  useEffect(() => {
    if (!authReady) {
      forceLoginRoute()
    }
  }, [authReady, forceLoginRoute])

  // Sync with browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (!readIsAuthenticated()) {
        persistLoggedOut()
        setAuthReady(false)
        forceLoginRoute()
        return
      }

      const path = window.location.pathname
      const nextRoute = resolveRouteFromPath(path)

      if (nextRoute === 'login') {
        // Authenticated user landed on /login — send home.
        window.history.replaceState({ route: 'home' }, '', '/')
        setCurrentRoute('home')
        return
      }

      if (nextRoute === 'profile') {
        setCurrentRoute('profile')
      } else if (nextRoute === 'eurAccountDetails') {
        setCurrentRoute('eurAccountDetails')
      } else if (nextRoute === 'gbpAccountDetails') {
        setCurrentRoute('gbpAccountDetails')
      } else if (nextRoute === 'currencyDetails') {
        setCurrentRoute('currencyDetails')
      } else if (nextRoute === 'eurAccount') {
        setCurrentRoute('eurAccount')
      } else if (nextRoute === 'gbpAccount') {
        setCurrentRoute('gbpAccount')
      } else if (nextRoute === 'transfer' || nextRoute === 'transaction') {
        const txId = path.split(/\/(?:transaction|transfer)\//)[1]
        const found = findTransactionById(txId)
        if (found) {
          setSelectedTransaction(found)
          setCurrentRoute(nextRoute)
        } else {
          setCurrentRoute('home')
        }
      } else if (nextRoute === 'transactions') {
        setCurrentRoute('transactions')
      } else {
        setCurrentRoute('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [forceLoginRoute])

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
      window.history.state?.route === 'transfer' ||
      window.history.state?.route === 'eurAccount' ||
      window.history.state?.route === 'eurAccountDetails' ||
      window.history.state?.route === 'gbpAccount' ||
      window.history.state?.route === 'currencyDetails' ||
      window.history.state?.route === 'gbpAccountDetails'
    ) {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  const navigateToTransactions = () => {
    saveHomeScroll()
    if (window.location.pathname !== '/transactions') {
      window.history.pushState({ route: 'transactions' }, '', '/transactions')
    }
    setCurrentRoute('transactions')
  }

  const closeTransactions = () => {
    if (window.history.state?.route === 'transactions') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  const navigateToCurrencyDetails = () => {
    saveHomeScroll()
    if (window.location.pathname !== '/account/details') {
      window.history.pushState({ route: 'currencyDetails' }, '', '/account/details')
    }
    setCurrentRoute('currencyDetails')
  }

  const navigateToGbpAccount = () => {
    saveHomeScroll()
    if (window.location.pathname !== '/account/gbp') {
      window.history.pushState({ route: 'gbpAccount' }, '', '/account/gbp')
    }
    setCurrentRoute('gbpAccount')
  }

  const closeGbpAccount = () => {
    if (window.history.state?.route === 'gbpAccount') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ route: 'home' }, '', '/')
      }
      setCurrentRoute('home')
    }
  }

  const navigateToGbpAccountDetails = () => {
    if (window.location.pathname !== '/account/gbp/details') {
      window.history.pushState({ route: 'gbpAccountDetails' }, '', '/account/gbp/details')
    }
    setCurrentRoute('gbpAccountDetails')
  }

  const closeGbpAccountDetails = () => {
    if (window.history.state?.route === 'gbpAccountDetails') {
      window.history.back()
    } else {
      if (window.location.pathname !== '/account/gbp') {
        window.history.pushState({ route: 'gbpAccount' }, '', '/account/gbp')
      }
      setCurrentRoute('gbpAccount')
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

  const resolveTransaction = (transaction) => {
    if (!transaction?.id) return transaction
    return findTransactionById(transaction.id) || transaction
  }

  const navigateToTransaction = (transaction) => {
    let scrollPos = 0;
    if (currentRoute === 'transactions') {
      scrollPos = document.querySelector('.transactions-screen__scroll')?.scrollTop || 0;
    } else if (currentRoute === 'gbpAccount') {
      scrollPos = document.querySelector('.gbp-screen__scroll')?.scrollTop || 0;
    } else if (currentRoute === 'eurAccount') {
      scrollPos = document.querySelector('.eur-screen__scroll')?.scrollTop || 0;
    }

    if (scrollPos > 0) {
      const currentState = window.history.state || { route: currentRoute };
      window.history.replaceState({ ...currentState, scrollPos }, '', window.location.pathname);
    }

    saveHomeScroll()
    const resolved = resolveTransaction(transaction)
    setSelectedTransaction(resolved)
    
    if (resolved.type === 'transfer') {
      window.history.pushState({ route: 'transfer', txId: resolved.id }, '', `/transfer/${resolved.id}`)
      setCurrentRoute('transfer')
    } else {
      window.history.pushState({ route: 'transaction', txId: resolved.id }, '', `/transaction/${resolved.id}`)
      setCurrentRoute('transaction')
    }
  }

  const closeTransaction = () => {
    if (window.history.state?.route === 'transaction' || window.history.state?.route === 'transfer') {
      window.history.back()
    } else {
      // Fallback for direct URL entry
      if (window.location.pathname !== '/transactions') {
        window.history.pushState({ route: 'transactions' }, '', '/transactions')
      }
      setCurrentRoute('transactions')
    }
  }

  const navigateToLogin = () => {
    persistLoggedOut()
    setAuthReady(false)
    // Replace so browser Back cannot re-enter protected screens.
    window.history.replaceState({ route: 'login' }, '', '/login')
    setSelectedTransaction(null)
    setCurrentRoute('login')
  }

  const handleLogBackIn = () => {
    // Demo session restore — no password / real auth system in this clone.
    persistAuthenticated()
    setAuthReady(true)
    window.history.replaceState({ route: 'home' }, '', '/')
    setCurrentRoute('home')
  }

  const handleLoginBack = () => {
    // Logged-out back must not reopen protected account screens.
    forceLoginRoute()
  }

  const handleUseAnotherAccount = () => {
    // No account-selection route exists in this clone yet.
    // Keep the user on LoginScreen01 rather than inventing an auth system.
  }

  // ── Render ───────────────────────────────────────────

  return (
    <div className="app-shell">
      {/* App-scoped overlay host for floating toasts (outside scroll content). */}
      <div id="app-overlay" className="app-overlay" aria-live="polite" />
      {!authReady || currentRoute === 'login' ? (
        <LoginScreen
          onLogBackIn={handleLogBackIn}
          onUseAnotherAccount={handleUseAnotherAccount}
          onBack={handleLoginBack}
        />
      ) : currentRoute === 'profile' ? (
        <ProfileScreen onBack={navigateToHome} onLogout={navigateToLogin} />
      ) : currentRoute === 'transfer' && selectedTransaction ? (
        <TransferDetailsScreen
          transaction={selectedTransaction}
          onClose={closeTransaction}
        />
      ) : currentRoute === 'transaction' && selectedTransaction ? (
        <TransactionDetailsScreen
          transaction={selectedTransaction}
          onClose={closeTransaction}
        />
      ) : currentRoute === 'gbpAccountDetails' ? (
        <GBPAccountDetailsScreen
          onBack={closeGbpAccountDetails}
        />
      ) : currentRoute === 'currencyDetails' ? (
        <CurrencyDetailsScreen
          onBack={navigateToHome}
          onEurClick={navigateToEurAccountDetails}
          onGbpClick={navigateToGbpAccountDetails}
          onOtherCurrenciesClick={() => {}}
        />
      ) : currentRoute === 'eurAccountDetails' ? (
        <AccountDetailsEURScreen onBack={closeEurAccountDetails} />
      ) : currentRoute === 'eurAccount' ? (
        <AccountBalanceEURScreen
          onClose={closeEurAccount}
          onSelectTransaction={navigateToTransaction}
          onOpenDetails={navigateToEurAccountDetails}
        />
      ) : currentRoute === 'gbpAccount' ? (
        <AccountBalanceGBPScreen
          onClose={closeGbpAccount}
          onSelectTransaction={navigateToTransaction}
          onOpenDetails={navigateToGbpAccountDetails}
        />
      ) : currentRoute === 'transactions' ? (
        <TransactionsScreen
          onClose={closeTransactions}
          onSelectTransaction={navigateToTransaction}
        />
      ) : (
        <HomeScreen
          onProfileClick={navigateToProfile}
          onSelectTransaction={navigateToTransaction}
          onEurClick={navigateToEurAccount}
          onGbpClick={navigateToGbpAccount}
          onAccountDetailsClick={navigateToCurrencyDetails}
          onSeeAllTransactions={navigateToTransactions}
        />
      )}
    </div>
  )
}

export default App

