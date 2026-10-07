import { useState, useEffect, useRef } from 'react'
import { mockFullTransactions } from './data/mockData'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import TransactionDetailsScreen from './screens/TransactionDetailsScreen/TransactionDetailsScreen'
import AccountBalanceEURScreen from './screens/AccountBalanceEURScreen/AccountBalanceEURScreen'
import AccountDetailsEURScreen from './screens/AccountDetailsEURScreen/AccountDetailsEURScreen'
import CurrencyDetailsScreen from './screens/CurrencyDetailsScreen/CurrencyDetailsScreen'
import GBPAccountDetailsScreen from './screens/GBPAccountDetailsScreen/GBPAccountDetailsScreen'
import AccountBalanceGBPScreen from './screens/AccountBalanceGBPScreen/AccountBalanceGBPScreen'
import TransactionsScreen from './screens/TransactionsScreen/TransactionsScreen'

/**
 * App root — manages lightweight SPA screen navigation.
 */
function App() {
  const getInitialRoute = () => {
    if (window.location.pathname.startsWith('/profile')) return 'profile'
    if (window.location.pathname.startsWith('/account/eur/details')) return 'eurAccountDetails'
    if (window.location.pathname.startsWith('/account/gbp/details')) return 'gbpAccountDetails'
    if (window.location.pathname.startsWith('/account/details') || window.location.pathname.startsWith('/currency-details')) return 'currencyDetails'
    if (window.location.pathname.startsWith('/account/eur') || window.location.pathname.startsWith('/eur')) return 'eurAccount'
    if (window.location.pathname.startsWith('/account/gbp') || window.location.pathname.startsWith('/gbp')) return 'gbpAccount'
    if (window.location.pathname.startsWith('/transactions')) return 'transactions'
    if (window.location.pathname.startsWith('/transaction/')) return 'transaction'
    return 'home'
  }

  const getInitialTransaction = () => {
    if (window.location.pathname.startsWith('/transaction/')) {
      const txId = window.location.pathname.split('/transaction/')[1]
      for (const group of mockFullTransactions) {
        const tx = group.transactions.find(t => t.id === txId)
        if (tx) return tx
      }
    }
    return null
  }

  const [currentRoute, setCurrentRoute]               = useState(getInitialRoute)
  const [selectedTransaction, setSelectedTransaction] = useState(getInitialTransaction)
  const homeScrollTopRef                              = useRef(0)

  // Sync with browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path.startsWith('/profile')) {
        setCurrentRoute('profile')
      } else if (path.startsWith('/account/eur/details')) {
        setCurrentRoute('eurAccountDetails')
      } else if (path.startsWith('/account/gbp/details')) {
        setCurrentRoute('gbpAccountDetails')
      } else if (path.startsWith('/account/details') || path.startsWith('/currency-details')) {
        setCurrentRoute('currencyDetails')
      } else if (path.startsWith('/account/eur') || path.startsWith('/eur')) {
        setCurrentRoute('eurAccount')
      } else if (path.startsWith('/account/gbp') || path.startsWith('/gbp')) {
        setCurrentRoute('gbpAccount')
      } else if (path.startsWith('/transaction/') && !path.startsWith('/transactions')) {
        const txId = path.split('/transaction/')[1]
        let found = null
        for (const group of mockFullTransactions) {
          const tx = group.transactions.find(t => t.id === txId)
          if (tx) { found = tx; break; }
        }
        if (found) {
          setSelectedTransaction(found)
          setCurrentRoute('transaction')
        } else {
          setCurrentRoute('home')
        }
      } else if (path.startsWith('/transactions')) {
        setCurrentRoute('transactions')
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

  const navigateToTransaction = (transaction) => {
    saveHomeScroll()
    setSelectedTransaction(transaction)
    window.history.pushState({ route: 'transaction', txId: transaction.id }, '', `/transaction/${transaction.id}`)
    setCurrentRoute('transaction')
  }

  const closeTransaction = () => {
    if (window.history.state?.route === 'transaction') {
      window.history.back()
    } else {
      // Fallback for direct URL entry
      if (window.location.pathname !== '/transactions') {
        window.history.pushState({ route: 'transactions' }, '', '/transactions')
      }
      setCurrentRoute('transactions')
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

