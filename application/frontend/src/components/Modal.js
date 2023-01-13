import React from 'react';

export default function Modal({ children, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-window">
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}