import React from 'react'

import './styles/alert.css'

function Alert({ type, message }) {
    
    return (
    
        <div className={`__alert __alert_${type}`}>{message}</div>
    
    )

}

export default Alert