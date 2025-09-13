import React from 'react'

const Toast = ({text}) => {
  return (
    <div className="toast z-50">
  <div className="alert alert-info">
    <span>{text}</span>
  </div>
</div>
  )
}

export default Toast