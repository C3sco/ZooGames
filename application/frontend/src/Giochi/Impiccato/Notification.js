import React from 'react'

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>Hai già inserito questa lettera!</p>
    </div>
  )
}

export default Notification
