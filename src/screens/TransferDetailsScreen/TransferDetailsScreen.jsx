import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import './TransferDetailsScreen.css'

import imgClose  from '../../assets/transactions/shared/btn-close.png'
import imgHelp   from '../../assets/transactions/shared/btn-help.png'
import imgMore   from '../../assets/transactions/shared/btn-more.png'
import imgIconUp from '../../assets/home/transactions/tx-up.png'
import imgGeneral from '../../assets/transactions/details/icon-general.png'
import {
  generateTransferConfirmationPdf,
  triggerBlobDownload,
} from '../../utils/generateTransferConfirmationPdf'

const CheckmarkIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8L6.5 13.5L19 1" stroke="#9FE870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function TransferDetailsScreen({ transaction, onClose }) {
  const [activeTab, setActiveTab] = useState(() => 
    typeof window !== 'undefined' && window.location.hash === '#details' ? 'details' : 'updates'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [downloadError, setDownloadError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const scrollRef = useRef(null);
  const scrollPositions = useRef({ updates: 0, details: 0 });
  const pdfObjectUrlRef = useRef(null);
  const downloadInFlightRef = useRef(false);

  const revokePdfUrl = useCallback(() => {
    if (pdfObjectUrlRef.current) {
      URL.revokeObjectURL(pdfObjectUrlRef.current)
      pdfObjectUrlRef.current = null
    }
  }, [])

  useEffect(() => () => {
    revokePdfUrl()
  }, [revokePdfUrl])

  const handleDownloadConfirmation = useCallback(async () => {
    if (downloadInFlightRef.current || downloadStatus === 'downloading') return

    downloadInFlightRef.current = true
    setDownloadError('')
    setToastVisible(true)
    setDownloadStatus('downloading')

    // Yield so the downloading toast paints before PDF work.
    await new Promise((resolve) => requestAnimationFrame(() => resolve()))

    try {
      const { blob, filename } = await generateTransferConfirmationPdf(transaction)
      if (!blob || blob.size < 1) {
        throw new Error('Generated confirmation was empty')
      }

      revokePdfUrl()
      const objectUrl = triggerBlobDownload(blob, filename)
      pdfObjectUrlRef.current = objectUrl
      setDownloadStatus('downloaded')
    } catch (err) {
      revokePdfUrl()
      setDownloadError(err?.message || 'Unable to download confirmation')
      setDownloadStatus('error')
    } finally {
      downloadInFlightRef.current = false
    }
  }, [downloadStatus, revokePdfUrl, transaction])

  const handleViewConfirmation = useCallback(() => {
    const url = pdfObjectUrlRef.current
    if (!url) {
      setDownloadError('Confirmation file is no longer available. Please download again.')
      setDownloadStatus('error')
      setToastVisible(true)
      return
    }

    const opened = window.open(url, '_blank', 'noopener,noreferrer')
    if (opened) return

    // Popup blocked — try an explicit anchor open without leaving this screen.
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.target = '_blank'
    anchor.rel = 'noopener noreferrer'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }, [])

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    setIsScrolled(top > 120);
    scrollPositions.current[activeTab] = top;
  };

  const handleTabSwitch = (newTab) => {
    scrollPositions.current[activeTab] = scrollRef.current?.scrollTop ?? 0;
    setActiveTab(newTab);
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const syncViewport = () => {
      el.style.setProperty('--transfer-viewport', `${el.clientHeight}px`);
    };
    syncViewport();
    const observer = new ResizeObserver(syncViewport);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const top = scrollPositions.current[activeTab] ?? 0;
    scrollRef.current.scrollTop = top;
    // Programmatic scrollTop does not fire onScroll.
    setIsScrolled(top > 120);
  }, [activeTab]);

  if (!transaction) return null;

  const displayAmount = transaction.amount.replace('-', '').trim();
  const displayCurrency = transaction.currency || 'EUR';
  const fullAmountStr = displayAmount.includes(displayCurrency) 
    ? displayAmount 
    : `${displayAmount} ${displayCurrency}`;
  // Expanded Screen01 vs compact Screen02/03 use separate presentation fields.
  const fullRecipientName =
    transaction.fullRecipientName
    ?? transaction.title;
  const compactRecipientName =
    transaction.compactRecipientName
    ?? transaction.compactRecipient
    ?? transaction.title;
  const timelineTimestamp = transaction.timelineTimestamp || 'Wednesday, october 19 at 6:10 PM';
  const timelineSetupTimestamp = transaction.timelineSetupTimestamp || timelineTimestamp;
  const timelinePaidTimestamp = transaction.timelinePaidTimestamp || timelineTimestamp;
  const timelineCompletionTitle = transaction.timelineCompletionTitle;
  const timelineCompletionDetail = transaction.timelineCompletionDetail;
  const senderAccountName = transaction.senderAccountName || "Manzooran Bibi's";

  return (
    <div className="transfer-screen" onScroll={handleScroll} ref={scrollRef}>
      
      {/* ── Compact Header — TransferDetailsScreen02 scrolled state ── */}
      <div className={`transfer-compact-header ${isScrolled ? 'transfer-compact-header--visible' : ''}`} aria-hidden={!isScrolled}>
        <button type="button" className="transfer-btn" onClick={onClose} tabIndex={isScrolled ? 0 : -1}>
          <img src={imgClose} alt="Close" draggable={false} />
        </button>
        <div className="transfer-compact-identity">
          <div className="transfer-compact-amount">{fullAmountStr}</div>
          <div className="transfer-compact-recipient">{compactRecipientName}</div>
        </div>
        <div className="transfer-header__actions-right">
          <button type="button" className="transfer-btn">
            <img src={imgHelp} alt="Help" draggable={false} />
          </button>
          <button type="button" className="transfer-btn">
            <img src={imgMore} alt="More" draggable={false} />
          </button>
        </div>
      </div>

      {/* ── Hero summary — TransferDetailsScreen01 top state ── */}
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
          <div className="transfer-amount">{fullAmountStr}</div>
          <div className="transfer-recipient">{fullRecipientName}</div>
          
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
            onClick={() => handleTabSwitch('updates')}
          >
            Updates
          </button>
          <button 
            className={`transfer-tab ${activeTab === 'details' ? 'transfer-tab--active' : ''}`}
            onClick={() => handleTabSwitch('details')}
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
                    <div className="timeline-time">{timelineSetupTimestamp}</div>
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
                    <div className="timeline-time">{timelinePaidTimestamp}</div>
                    <div className="timeline-text">We've taken the funds from {senderAccountName} Wise account</div>
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
                    <div className="timeline-time">{timelinePaidTimestamp}</div>
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
                    <div className="timeline-time">{timelinePaidTimestamp}</div>
                    {timelineCompletionDetail ? (
                      <>
                        <div className="timeline-completion-title">
                          {timelineCompletionTitle || "Your transfer's complete"}
                        </div>
                        <div className="timeline-text">{timelineCompletionDetail}</div>
                      </>
                    ) : (
                      <div className="timeline-text">
                        {timelineCompletionTitle || `We sent ${fullAmountStr} to ${transaction.title} .`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="transfer-actions">
              <button className="transfer-action-btn transfer-action-btn--primary">
                Repeat this transfer
              </button>
              <button className="transfer-action-btn transfer-action-btn--secondary">
                Rate the app
              </button>
              <button className="transfer-action-btn transfer-action-btn--primary">
                Share with recipient
              </button>
            </div>
          </div>
        ) : (
          <div className="transfer-details-tab">
            <div className="transfer-details-section">
              <h2 className="transfer-section-title">Transaction details</h2>
              
              <div className="details-row-container">
                <div className="details-row">
                  <span className="details-label">You sent</span>
                  <span className="details-value">{fullAmountStr}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Wise's fees</span>
                  <span className="details-value">0 EUR</span>
                </div>
                <div className="transfer-dashed-divider"></div>
                <div className="details-row details-row--tall">
                  <span className="details-label">{transaction.recipientReceivedLabel || `${compactRecipientName} received`}</span>
                  <span className="details-value details-value--bold">{fullAmountStr}</span>
                </div>
                <div className="transfer-dashed-divider"></div>
                {transaction.transactionNumber && (
                  <div className="details-row">
                    <span className="details-label">Transaction number</span>
                    <span className="details-value">{transaction.transactionNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {transaction.recipientBankDetails && (
              <div className="transfer-details-section">
                <h2 className="transfer-section-title">
                  {(transaction.recipientBankDetails.bankDetailsHeadingName
                    || transaction.recipientBankDetails.accountHolderName)
                  }'s bank details
                </h2>
                
                <div className="details-row-container">
                  <div className="details-row-compact">
                    <span className="details-label">Account holder name</span>
                    <span className="details-value">
                      {transaction.recipientBankDetails.accountHolderName}
                    </span>
                  </div>
                  <div className="details-row-compact">
                    <span className="details-label">Bank code (BIC/SWIFT)</span>
                    <span className="details-value">
                      {transaction.recipientBankDetails.swiftBic}
                    </span>
                  </div>
                  <div className="details-row-compact details-row-compact--iban">
                    <span className="details-label">IBAN</span>
                    <span className="details-value details-value--iban">
                      {transaction.recipientBankDetails.iban}
                    </span>
                  </div>
                  <div className="details-row-compact details-row-compact--bank-name">
                    <span className="details-label">Bank name</span>
                    <span className="details-value details-value--bank-name">
                      {transaction.recipientBankDetails.bankNameLines?.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < transaction.recipientBankDetails.bankNameLines.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="transfer-download-btn"
              onClick={handleDownloadConfirmation}
              disabled={downloadStatus === 'downloading'}
              aria-busy={downloadStatus === 'downloading'}
            >
              Download transfer confirmation
            </button>
          </div>
        )}
      </div>

      {toastVisible && downloadStatus !== 'idle' && (
        <div
          className={`transfer-download-toast transfer-download-toast--${downloadStatus}`}
          role="status"
          aria-live="polite"
        >
          {downloadStatus === 'downloading' && (
            <p className="transfer-download-toast__text">
              Downloading transfer confirmation
            </p>
          )}

          {downloadStatus === 'downloaded' && (
            <>
              <p className="transfer-download-toast__text">
                Transfer confirmation downloaded
              </p>
              <button
                type="button"
                className="transfer-download-toast__view"
                onClick={handleViewConfirmation}
              >
                View
              </button>
            </>
          )}

          {downloadStatus === 'error' && (
            <>
              <p className="transfer-download-toast__text">
                {downloadError || 'Unable to download confirmation'}
              </p>
              <button
                type="button"
                className="transfer-download-toast__view"
                onClick={handleDownloadConfirmation}
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TransferDetailsScreen
