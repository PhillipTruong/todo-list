import React, { useEffect } from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal = ({ isOpen, children, onClose }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  if (!isOpen) return null

  return ReactDom.createPortal((
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>
  ),
    document.getElementById('portal'))
}

export default Modal