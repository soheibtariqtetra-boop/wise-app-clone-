import React, { useRef, useState, useEffect } from 'react'
import './TransactionsScreen.css'
import TransactionRow from '../../components/TransactionRow/TransactionRow'
import { mockFullTransactions } from '../../data/mockData'

/**
 * Full Transactions Screen
 * One continuous scrollable page.
 * Top content corresponds to TransactionsScreen01
 * Bottom content corresponds to TransactionsScreen02
 */
function TransactionsScreen({ onClose }) {
  const scrollRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Determine if header should be sticky/compact based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      setIsScrolled(scrollRef.current.scrollTop > 50)
    }
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleBackToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="transactions-screen">
      {/* Scrollable Container */}
      <div className="transactions-screen__scroll" ref={scrollRef}>
        
        {/* Header Area */}
        <div className={`transactions-screen__header ${isScrolled ? 'transactions-screen__header--compact' : ''}`}>
          <div className="transactions-screen__controls">
            <button className="transactions-screen__close" onClick={onClose} aria-label="Close">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="44" height="44" rx="22" fill="#2A2C29"/>
                <path d="M15 15L29 29M29 15L15 29" stroke="#F3F5F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isScrolled && (
              <h1 className="transactions-screen__title-compact">Transactions</h1>
            )}

            <div className="transactions-screen__search-analytics">
              <button className="transactions-screen__btn" aria-label="Search">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="44" height="44" rx="22" fill="#2A2C29"/>
                  <path d="M20 27C23.866 27 27 23.866 27 20C27 16.134 23.866 13 20 13C16.134 13 13 16.134 13 20C13 23.866 16.134 27 20 27Z" stroke="#9FE870" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30 30L25 25" stroke="#9FE870" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="transactions-screen__btn" aria-label="Analytics">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="44" height="44" rx="22" fill="#2A2C29"/>
                  <path d="M17 26L17 18M22 26L22 14M27 26L27 21" stroke="#9FE870" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {!isScrolled && (
            <div className="transactions-screen__heading-viewport">
              <h1 className="transactions-screen__title">Transactions</h1>
            </div>
          )}

          {/* Filters Strip */}
          <div className="transactions-screen__filter-viewport">
            <div className="transactions-screen__filter-strip">
              <button className="transactions-screen__filter">Include hidden</button>
              <button className="transactions-screen__filter">Type</button>
              <button className="transactions-screen__filter">Currency</button>
              <button className="transactions-screen__filter transactions-screen__filter--cont">Di</button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="transactions-screen__content">
          {mockFullTransactions.map((group, idx) => (
            <div key={idx} className="transactions-screen__date-section">
              <div className="transactions-screen__date-heading">
                <span className="transactions-screen__date-label">{group.dateGroup}</span>
                <div className="transactions-screen__divider" />
              </div>
              <div className="transactions-screen__date-transactions">
                {group.transactions.map(tx => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
              </div>
            </div>
          ))}

          {/* Back to top */}
          <div className="transactions-screen__return-action">
            <button className="transactions-screen__back-to-top" onClick={handleBackToTop}>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsScreen
