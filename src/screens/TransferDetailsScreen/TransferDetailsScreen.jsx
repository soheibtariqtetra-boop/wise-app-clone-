import { useState } from 'react'
import './TransferDetailsScreen.css'

import imgClose  from '../../assets/transactions/shared/btn-close.png'
import imgHelp   from '../../assets/transactions/shared/btn-help.png'
import imgMore   from '../../assets/transactions/shared/btn-more.png'
import imgIconUp from '../../assets/home/transactions/tx-up.png'
import imgGeneral from '../../assets/transactions/details/icon-status-money-added.png'

const CheckmarkIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8L6.5 13.5L19 1" stroke="#9FE870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function TransferDetailsScreen({ transaction, onClose }) {
  const [activeTab, setActiveTab] = useState('updates')

  if (!transaction) return null;

  return (
    <div className="transfer-screen">
      <div className="transfer-header">
        <div className="transfer-header__actions">
          <button type="button" className="transfer-btn" onClick={onClose}>
            <img src={imgClose} alt="Close" draggable={false} />
          </button>
          <div className="transfer-header__actions-right">
            <button type="button" className="transfer-btn">
              <img src={imgHelp} alt="Help" draggable={false} />
            </button>
            <button type="button" className="transfer-btn">
              <img src={imgMore} alt="More" draggable={false} />
            </button>
          </div>
        </div>

        <div className="transfer-summary">
          <div className="transfer-icon">
            <img src={imgIconUp} alt="" draggable={false} />
          </div>
          <div className="transfer-status-text">Sent</div>
          <div className="transfer-amount">{transaction.amount.replace('-', '')} {transaction.currency || 'EUR'}</div>
          <div className="transfer-recipient">{transaction.title}</div>
          
          <div className="transfer-pill">
            <img src={imgGeneral} alt="" className="transfer-pill-icon" />
            <span>General</span>
          </div>
        </div>
      </div>

      <div className="transfer-content">
        <div className="transfer-tabs">
          <button 
            className={`transfer-tab ${activeTab === 'updates' ? 'transfer-tab--active' : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            Updates
          </button>
          <button 
            className={`transfer-tab ${activeTab === 'details' ? 'transfer-tab--active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>

        {activeTab === 'updates' ? (
          <div className="transfer-updates">
            <h2 className="transfer-section-title">Transfer timeline</h2>
            <div className="timeline">
              <div className="timeline-item-container">
                <div className="timeline-item">
                  <div className="timeline-indicator-col">
                    <div className="timeline-icon">
                      <CheckmarkIcon />
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">Wednesday, September 23 at 16:49</div>
                    <div className="timeline-text">You set up your transfer</div>
                  </div>
                </div>
              </div>

              <div className="timeline-item-container">
                <div className="timeline-item">
                  <div className="timeline-indicator-col">
                    <div className="timeline-icon">
                      <CheckmarkIcon />
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">Wednesday, September 23 at 16:49 PM</div>
                    <div className="timeline-text">We've taken the funds from Shoaib khan  Wise account</div>
                  </div>
                </div>
              </div>

              <div className="timeline-item-container">
                <div className="timeline-item">
                  <div className="timeline-indicator-col">
                    <div className="timeline-icon">
                      <CheckmarkIcon />
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">Wednesday, September 23 at 16:49</div>
                    <div className="timeline-text">We paid out your EUR</div>
                  </div>
                </div>
              </div>

              <div className="timeline-item-container">
                <div className="timeline-item">
                  <div className="timeline-indicator-col">
                    <div className="timeline-icon">
                      <CheckmarkIcon />
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">Wednesday, September 23 at 16:49</div>
                    <div className="timeline-text">Your transfer is complete.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="transfer-details-tab">
            <div className="transfer-details-section">
              <h2 className="transfer-section-title">Transaction details</h2>
              <div className="details-row">
                <span className="details-label">You sent</span>
                <span className="details-value">1 EUR</span>
              </div>
              <div className="details-row">
                <span className="details-label">Wise's fees</span>
                <span className="details-value">0 EUR</span>
              </div>
              <div className="details-row">
                <span className="details-label">Erkan Schwarz received</span>
                <span className="details-value">1 EUR</span>
              </div>
              <div className="details-row">
                <span className="details-label">Transaction number</span>
                <span className="details-value">#2418268688</span>
              </div>
            </div>

            <div className="transfer-details-divider"></div>

            <div className="transfer-details-section">
              <h2 className="transfer-section-title">Erkan Schwarz's bank details</h2>
              <div className="details-row">
                <span className="details-label">Account holder name</span>
                <span className="details-value">Erkan Schwarz</span>
              </div>
              <div className="details-row">
                <span className="details-label">Bank code (BIC/SWIFT)</span>
                <span className="details-value">BYLADEM1001</span>
              </div>
              <div className="details-row">
                <span className="details-label">IBAN</span>
                <span className="details-value">DE62 1203 0000 1083 3924 05</span>
              </div>
              <div className="details-row">
                <span className="details-label">Bank name</span>
                <span className="details-value">DEUTSCHE KREDIT BANK A.G. BERLIN</span>
              </div>
            </div>

            <div className="transfer-details-divider"></div>
            
            <div className="transfer-download">
              <span className="download-text">Download transfer confirmation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransferDetailsScreen
