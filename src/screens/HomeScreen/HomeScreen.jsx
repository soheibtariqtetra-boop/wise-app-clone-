import React, { useState, useCallback } from 'react'
import TopBar from '../../components/TopBar/TopBar'
import BalanceSection from '../../components/BalanceSection/BalanceSection'
import ActionButtonsRow from '../../components/ActionButtonsRow/ActionButtonsRow'
import AccountCard from '../../components/AccountCard/AccountCard'
import CarouselDots from '../../components/CarouselDots/CarouselDots'
import PromoCard from '../../components/PromoCard/PromoCard'
import TransactionsSection from '../../components/TransactionsSection/TransactionsSection'
import ReturnsSection from '../../components/ReturnsSection/ReturnsSection'
import TransferCalculatorSection from '../../components/TransferCalculatorSection/TransferCalculatorSection'
import ProtectionSection from '../../components/ProtectionSection/ProtectionSection'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar'
import PullToRefresh from '../../components/PullToRefresh/PullToRefresh'
import './HomeScreen.css'

/**
 * HomeScreen — layout unchanged.
 * PullToRefresh wraps the scrollable content area.
 * Props:
 *   onProfileClick      — opens Profile
 *   onSelectTransaction — called with a transaction object when a row is tapped
 */
function HomeScreen({ onProfileClick, onSelectTransaction, onEurClick, onAccountDetailsClick }) {
  const [balancesHidden, setBalancesHidden] = useState(false)
  const handleTogglePrivacy = () => setBalancesHidden(prev => !prev)

  /**
   * Simulated refresh — in production this would reload
   * account data from the API. Does NOT reload the page.
   */
  const handleRefresh = useCallback(async () => {
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 600))
  }, [])

  return (
    <div className="home-screen">

      {/* ── Fixed Top Chrome — only TopBar is sticky ── */}
      <TopBar onProfileClick={onProfileClick} />

      {/* ── Scrollable Main Content with Pull-to-Refresh ── */}
      <PullToRefresh
        onRefresh={handleRefresh}
        scrollContentClass="home-screen__main-content"
      >
        <div className="home-screen__scroll-inner">
          {/* BalanceSection and ActionButtonsRow scroll with content */}
          <BalanceSection balancesHidden={balancesHidden} onToggle={handleTogglePrivacy} />
          <ActionButtonsRow />
          <AccountCard
            onEurClick={onEurClick}
            onAccountDetailsClick={onAccountDetailsClick}
            balancesHidden={balancesHidden}
          />
          <CarouselDots />
          <PromoCard />
          <TransactionsSection onSelectTransaction={onSelectTransaction} />
          <ReturnsSection />
          <TransferCalculatorSection />
          <ProtectionSection />
        </div>
      </PullToRefresh>

      {/* ── Fixed Bottom Nav ── */}
      <BottomNavBar />

    </div>
  )
}

export default HomeScreen
