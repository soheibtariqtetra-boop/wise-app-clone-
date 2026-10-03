import './ReturnsSection.css'

import imgReturnsChevron from '../../assets/home/returns/returns-chevron.png'
import imgReturnsCardBackground from '../../assets/home/returns/returns-flag-badge.png'

function ReturnsSection() {
  return (
    <div className="returns-section">
      <div className="returns-section__header">
        <h2 className="returns-section__title">Your returns</h2>
        <button className="returns-section__explore">Explore</button>
      </div>

      <div className="returns-card">
        <div className="returns-card__bg" />
        <img src={imgReturnsCardBackground} className="returns-card__icon" draggable={false} alt="" />
        
        <div className="returns-card__text">
          <div className="returns-card__text-main">Your GBP isn't growing yet</div>
          <div className="returns-card__text-sub">start earning a return</div>
        </div>

        <img src={imgReturnsChevron} className="returns-card__chevron" draggable={false} alt="" />
      </div>

      <div className="returns-section__disclaimer">
        Capital at risk. Growth not guaranteed.
      </div>
    </div>
  )
}

export default ReturnsSection
