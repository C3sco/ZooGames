import React from 'react';
import './modal.css'

export default function Modal({ children, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-window">
            
            {children}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}