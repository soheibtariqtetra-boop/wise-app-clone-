import { useCallback, useEffect, useRef, useState } from 'react'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { getTransferConfirmationPdfPath } from '../../data/transferConfirmations'
import './ConfirmationPdfViewer.css'

GlobalWorkerOptions.workerSrc = pdfWorkerSrc

/**
 * In-app transfer confirmation PDF viewer.
 * Renders public/confirmations/*.pdf via pdf.js — never opens the native browser PDF UI.
 */
function ConfirmationPdfViewer({ transactionId, pdfPath: pdfPathProp, onClose }) {
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const canvasRefs = useRef([])
  const pdfDocRef = useRef(null)
  const renderTokenRef = useRef(0)
  const closeGuardRef = useRef(false)

  const resolvedPath =
    pdfPathProp || getTransferConfirmationPdfPath(transactionId) || null

  const handleClose = useCallback(() => {
    if (closeGuardRef.current) return
    closeGuardRef.current = true
    onClose?.()
    // Allow a later reopen after the viewer unmounts.
    window.setTimeout(() => {
      closeGuardRef.current = false
    }, 400)
  }, [onClose])

  useEffect(() => {
    let cancelled = false
    const token = ++renderTokenRef.current

    const loadPdf = async () => {
      if (!resolvedPath) {
        setStatus('error')
        setErrorMessage('Confirmation file is not available.')
        return
      }

      setStatus('loading')
      setErrorMessage('')
      setPageCount(0)

      try {
        // Fetch as ArrayBuffer so the browser never navigates to the raw PDF URL.
        const response = await fetch(resolvedPath, { cache: 'force-cache' })
        if (!response.ok) {
          throw new Error('Confirmation file missing')
        }
        const data = await response.arrayBuffer()
        if (cancelled || token !== renderTokenRef.current) return

        const loadingTask = getDocument({ data, disableAutoFetch: true, disableStream: true })
        const pdf = await loadingTask.promise
        if (cancelled || token !== renderTokenRef.current) {
          pdf.destroy()
          return
        }

        pdfDocRef.current = pdf
        setPageCount(pdf.numPages)
        setStatus('ready')
      } catch (err) {
        if (cancelled || token !== renderTokenRef.current) return
        setStatus('error')
        setErrorMessage(err?.message || 'Unable to open confirmation')
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      renderTokenRef.current += 1
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy()
        pdfDocRef.current = null
      }
    }
  }, [resolvedPath])

  useEffect(() => {
    if (status !== 'ready' || !pdfDocRef.current || pageCount < 1) return undefined

    let cancelled = false
    const pdf = pdfDocRef.current

    const renderPages = async () => {
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        if (cancelled) return
        const canvas = canvasRefs.current[pageNumber - 1]
        if (!canvas) continue

        const page = await pdf.getPage(pageNumber)
        if (cancelled) return

        const containerWidth = canvas.parentElement?.clientWidth || 358
        const unscaled = page.getViewport({ scale: 1 })
        const scale = containerWidth / unscaled.width
        const viewport = page.getViewport({ scale })

        const outputScale = window.devicePixelRatio || 1
        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`

        const context = canvas.getContext('2d')
        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null

        await page.render({
          canvasContext: context,
          viewport,
          transform,
        }).promise
      }
    }

    renderPages()

    return () => {
      cancelled = true
    }
  }, [status, pageCount])

  return (
    <div
      className="confirmation-pdf-viewer"
      data-name="ConfirmationPdfViewer"
      role="dialog"
      aria-modal="true"
      aria-label="Transfer confirmation"
    >
      <header className="confirmation-pdf-viewer__header">
        <button
          type="button"
          className="confirmation-pdf-viewer__close"
          onClick={handleClose}
          aria-label="Close confirmation"
        >
          Close
        </button>
      </header>

      <div className="confirmation-pdf-viewer__scroll">
        {status === 'loading' && (
          <p className="confirmation-pdf-viewer__status">Opening confirmation…</p>
        )}

        {status === 'error' && (
          <p className="confirmation-pdf-viewer__status confirmation-pdf-viewer__status--error">
            {errorMessage || 'Unable to open confirmation'}
          </p>
        )}

        {status === 'ready' && (
          <div className="confirmation-pdf-viewer__pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <div className="confirmation-pdf-viewer__page" key={`page-${index + 1}`}>
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmationPdfViewer
