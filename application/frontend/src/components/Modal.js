import React from 'react';
import './modal.css'

export default function Modal({ children, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-window" id='bordo'>
            
            {children}
            <br></br>
            <button onClick={onClose} className='btn btn-danger'>Chiudi</button>
          </div>
        </div>
      )}
    </>
  );
}