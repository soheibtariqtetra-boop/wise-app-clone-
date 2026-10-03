import './CarouselDots.css'

import imgDot1 from '../../assets/home/account/carousel-dot-active.png'
import imgDot2 from '../../assets/home/account/carousel-dot-inactive.png'

function CarouselDots() {
  return (
    <div className="carousel-dots" aria-label="Carousel pagination">
      <div className="carousel-dots__bg" />
      <img src={imgDot1} className="carousel-dots__dot1" draggable={false} alt="" />
      <img src={imgDot2} className="carousel-dots__dot2" draggable={false} alt="" />
    </div>
  )
}

export default CarouselDots
