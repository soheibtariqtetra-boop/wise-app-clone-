import './BottomNavBar.css'

import imgBg from '../../assets/home/navigation/nav-bg.png'
import imgPayments from '../../assets/home/navigation/nav-payments.png'
import imgRecipients from '../../assets/home/navigation/nav-recipients.png'
import imgCards from '../../assets/home/navigation/nav-cards.png'
import imgHome from '../../assets/home/navigation/nav-home.png'

function BottomNavBar() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <img src={imgBg} className="bottom-nav__bg" draggable={false} alt="" />

      <button className="bottom-nav__tab bottom-nav__tab--home">
        <img src={imgHome} className="bottom-nav__icon" draggable={false} alt="" />
        <div className="bottom-nav__label">Home</div>
      </button>

      <button className="bottom-nav__tab bottom-nav__tab--cards">
        <img src={imgCards} className="bottom-nav__icon" draggable={false} alt="" />
        <div className="bottom-nav__label">Cards</div>
      </button>

      <button className="bottom-nav__tab bottom-nav__tab--recipients">
        <img src={imgRecipients} className="bottom-nav__icon" draggable={false} alt="" />
        <div className="bottom-nav__label">Recipients</div>
      </button>

      <button className="bottom-nav__tab bottom-nav__tab--payments">
        <img src={imgPayments} className="bottom-nav__icon" draggable={false} alt="" />
        <div className="bottom-nav__label">Payments</div>
      </button>
    </nav>
  )
}

export default BottomNavBar
