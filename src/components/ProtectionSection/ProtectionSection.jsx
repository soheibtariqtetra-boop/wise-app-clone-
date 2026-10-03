import React from 'react'
import './ProtectionSection.css'
import imgShield from '../../assets/home/protection/protection-shield.png'

function ProtectionSection() {
  return (
    <section className="protection-section" aria-label="Security and protection" data-node-id="80:2147">
      {/* ── Header: Shield Icon (80:2153) + Heading (80:2152) ── */}
      <div className="protection-section__header">
        <img
          src={imgShield}
          className="protection-section__shield"
          draggable={false}
          alt=""
          data-node-id="80:2153"
        />
        <h2 className="protection-section__title" data-node-id="80:2152">
          Your money, protected
        </h2>
      </div>

      {/* ── Description (80:2151) ── */}
      <p className="protection-section__desc" data-node-id="80:2151">
        We promise to protect every penny with<br />
        cutting-edge tech and anytime customer support.
      </p>

      {/* ── Learn More Button (80:2148) ── */}
      <div className="protection-section__btn-container" data-node-id="80:2148">
        <button
          className="protection-section__btn"
          type="button"
          data-node-id="80:2149"
        >
          <span className="protection-section__btn-label" data-node-id="80:2150">
            Learn more
          </span>
        </button>
      </div>
    </section>
  )
}

export default ProtectionSection
