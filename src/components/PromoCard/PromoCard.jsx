import './PromoCard.css'

import imgChevron from '../../assets/home/account/promo-chevron.png'
import imgProgress from '../../assets/home/account/promo-progress.png'

function PromoCard() {
  return (
    <div className="promo-card">
      <div className="promo-card__bg" />
      <img src={imgChevron} className="promo-card__chevron" draggable={false} alt="" />
      
      <div className="promo-card__button">
        <img src={imgProgress} className="promo-card__button-bg" draggable={false} alt="" />
        <div className="promo-card__button-text">1/3</div>
      </div>

      <div className="promo-card__subtitle">
        <p style={{ margin: 0 }}>Simple ways to get more from</p>
        <p style={{ margin: 0 }}>your business account.</p>
      </div>

      <div className="promo-card__title">
        Get more from Wise
      </div>
    </div>
  )
}

export default PromoCard
