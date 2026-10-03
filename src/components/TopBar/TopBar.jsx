import { useEffect, useState } from 'react'
import './TopBar.css'

import imgChartIcon from '../../assets/home/shared/analytics-icon.png'
import imgPlusIcon from '../../assets/home/shared/plus-icon.png'

function TopBar({ onProfileClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Attach to the actual scroll owner — .home-screen__main-content
    const scrollEl = document.querySelector('.home-screen__main-content')
    if (!scrollEl) return

    const handleScroll = () => {
      setScrolled(scrollEl.scrollTop > 1)
    }

    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`top-bar-shell${scrolled ? ' top-bar-shell--scrolled' : ''}`}>
      <header className="top-bar" aria-label="Top bar">

        {/* ML Avatar */}
        <div className="top-bar__avatar-container">
          <button
            className="top-bar__avatar"
            aria-label="Profile"
            type="button"
            onClick={onProfileClick}
          >
            <span className="top-bar__avatar-text">ML</span>
          </button>
        </div>

        {/* Earn £50 */}
        <div className="top-bar__earn-container">
          <button className="top-bar__btn--earn" aria-label="Earn £50">
            Earn £50
          </button>
        </div>

        {/* Open + */}
        <div className="top-bar__open-container">
          <button className="top-bar__btn--open" aria-label="Open new account">
            Open
            <img src={imgPlusIcon} alt="" aria-hidden="true" className="top-bar__plus-icon" draggable={false} />
          </button>
        </div>

        {/* Stats/Chart icon */}
        <button className="top-bar__icon-btn" aria-label="View statistics">
          <img src={imgChartIcon} alt="" className="top-bar__chart-icon" draggable={false} />
        </button>

      </header>
    </div>
  )
}

export default TopBar
